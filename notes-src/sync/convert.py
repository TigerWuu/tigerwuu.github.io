"""Convert a flat Notion Markdown export into a Quartz content folder.

Usage: python3 convert.py <export-folder> <quartz-content-folder>

The export folder is either a "Markdown & CSV" export from Notion (unzipped) or the
output of notion-sync.mjs, which writes the same layout plus a _meta.json with dates.
"""
import json, os, re, sys, shutil, urllib.parse, collections

src, dst = sys.argv[1], sys.argv[2]
meta_path = os.path.join(src, '_meta.json')
meta = json.load(open(meta_path, encoding='utf-8')) if os.path.exists(meta_path) else {}
MAX_IMAGE_SIDE = 1400
ID = re.compile(r' ([0-9a-f]{32})\.md$')
files = [f for f in os.listdir(src) if f.endswith('.md')]
nid = {f: ID.search(f).group(1) for f in files}
fname = {nid[f]: f for f in files}
text = {nid[f]: open(os.path.join(src, f), encoding='utf-8').read() for f in files}

TYPO = {'Mathemetics': 'Mathematics', 'Ternimal': 'Terminal', 'Imitaion Learning': 'Imitation Learning',
        'Accererated': 'Accelerated'}
def fix(s):
    for a, b in TYPO.items(): s = s.replace(a, b)
    return s

def h1(t):
    m = re.match(r'#\s+(.+)', t)
    return m.group(1).strip() if m else ''

LINK = re.compile(r'\[((?:[^\]]|\n)*?)\]\(([^\s\]]+?\.(?:md|png|jpe?g|gif|pdf|webp|svg|mp4|csv)|[^)\s]+)\)', re.I)
children = collections.defaultdict(list)
for i, t in text.items():
    for m in LINK.finditer(t):
        p = urllib.parse.unquote(m.group(2))
        mm = re.search(r'([0-9a-f]{32})\.md$', p)
        if mm and mm.group(1) in text and mm.group(1) not in children[i]:
            children[i].append(mm.group(1))
root = meta.get('root') or next(i for i, f in fname.items() if f.startswith('Robotics-Techniques Notes'))

# group root children by the heading they appear under
group = {}
cur = 'Notes'
for line in text[root].split('\n'):
    if line.startswith('# ') and line[2:].strip() != h1(text[root]): cur = line[2:].strip()
    for m in LINK.finditer(line):
        mm = re.search(r'([0-9a-f]{32})\.md', urllib.parse.unquote(m.group(2)))
        if mm: group.setdefault(mm.group(1), cur)

def slug(s):
    s = re.sub(r'[\\/:*?"<>|#^\[\]]', '', s).strip()
    return re.sub(r'\s+', ' ', s)

base = {i: fix(slug(ID.sub('', fname[i]))) for i in text}
# disambiguate duplicate names
cnt = collections.Counter(b.lower() for b in base.values())
# folder tree: each page goes under the first page (breadth-first from the root) that links to it,
# so links back up the tree or across branches don't create cycles
tree = collections.defaultdict(list)
queue, placed = [root], {root}
while queue:
    i = queue.pop(0)
    for c in children[i]:
        if c not in placed:
            placed.add(c)
            tree[i].append(c)
            queue.append(c)
path = {}
def place(i, folder, parent_title):
    name = base[i]
    if cnt[name.lower()] > 1 and parent_title: name = f'{name} ({parent_title})'
    if tree[i]:
        path[i] = f'{folder}/{name}/index'
        for c in tree[i]: place(c, f'{folder}/{name}', name)
    else:
        path[i] = f'{folder}/{name}'
for c in tree[root]:
    place(c, group.get(c, 'Notes'), None)
path[root] = 'index'
for i in text:
    path.setdefault(i, f'Notes/{base[i]}')

# canonical concepts for Background knowledge items; existing notes are linked, others become stubs
CONCEPTS = [
    (r'\bMPC\b|model predictive', 'MPC'), (r'\bVAE\b|variational auto|CVAE', 'Variational Autoencoder (VAE)'),
    (r'\bPPO\b', 'PPO'), (r'flow matching', 'Flow Matching'), (r'DDPM|DDIM|diffusion model|diffusion policy|Diffusion transformer|DiT\b', 'Diffusion model'),
    (r'imitation learning|behavioral cloning|Dagger', 'Imitation Learning'), (r'lie group', 'Lie group & Lie algebra'),
    (r'domain randomization', 'Domain Randomization'), (r'curriculum learning', 'Curriculum Learning'),
    (r'transformer|action chunk', 'Transformer'), (r'ResNet', 'ResNet'), (r'SigLIP|CLIP\b|PaliGemma|vision-language|DINOv2', 'Vision-Language Model'),
    (r'QP problem|IPOPT|CasADi|optimal control', 'Optimization'), (r'dynamics equation|Euler-Lagrange|manipulator dynamics|jacobian', 'Rigid body dynamics'),
    (r'inverse reinforcement|SAC\b|DDPG|DQN|RLPD|actor-critic|reinforcement learning', 'Reinforcement Learning'),
    (r'contrastive learning|SwAV', 'Contrastive Learning'), (r'mixture-of-experts|MoE\b', 'Mixture of Experts'),
    (r'retargeting|GMR\b|SMPL', 'Motion Retargeting'), (r'backpropagation through time|BPTT', 'Backpropagation Through Time'),
    (r'Generative adve|GAN\b', 'Generative Adversarial Network (GAN)'), (r'PointNet|point cloud', 'PointNet'),
    (r'\bt-SNE\b', 'PCA'), (r'UTD|update-to-data', 'Update-to-Data Ratio'), (r'Octo\b', 'Octo'),
]
by_base = {}
for i in sorted(text, key=lambda i: not path[i].startswith('Techniques')): by_base.setdefault(base[i].lower(), i)
def target(concept):
    for k, i in by_base.items():
        if k == concept.lower() or k.startswith(concept.lower() + ' ('): return path[i]
    if concept == 'Octo':
        return next(path[i] for i in text if base[i].startswith('(2024)Octo'))
    return f'Concepts/{concept}'
stubs = set()

def convert(i):
    t = text[i]
    title = fix(h1(t)) or base[i]
    t = re.sub(r'\A#\s+.+\n?', '', t)
    def rep(m):
        label, href = m.group(1), urllib.parse.unquote(m.group(2))
        label = re.sub(r'\s*\n\s*', ' ', label).strip()
        mm = re.search(r'([0-9a-f]{32})\.md$', href)
        if mm and mm.group(1) in path:
            return f'[[{path[mm.group(1)]}|{fix(label)}]]'
        if href.lower().endswith('.pdf'):
            # lecture PDFs stay private: course material, and too large for GitHub Pages
            return f'{label}（PDF 講義未公開）'
        if not re.match(r'[a-z]+://', href) and os.path.exists(os.path.join(src, href)):
            embed = '!' if t[m.start()-1:m.start()] == '!' else ''
            return f'[[assets/{href}|{label}]]' if not embed else f'[[assets/{href}]]'
        return m.group(0)
    t = LINK.sub(rep, t)
    t = re.sub(r'!\[\[assets/', '![[assets/', t)
    # Background knowledge → wikilinks
    def bk(m):
        out = []
        for line in m.group(1).split('\n'):
            mm = re.match(r'^(-\s+)(.+)$', line)
            if mm:
                hits = []
                for pat, c in CONCEPTS:
                    if re.search(pat, mm.group(2), re.I) and c not in hits: hits.append(c)
                if hits:
                    links = []
                    for c in hits:
                        p = target(c)
                        if p.startswith('Concepts/'): stubs.add(c)
                        links.append(f'[[{p}|{c}]]')
                    line = f'{line}  → ' + ', '.join(links)
            out.append(line)
        return '# Background knowledge\n' + '\n'.join(out)
    t = re.sub(r'^# Background knowledge\n(.*?)(?=^# |\Z)', bk, t, flags=re.S | re.M)
    kind = 'paper' if re.match(r'\(\d{4}|\([A-Z]+\d{4}', base[i]) or '# Background knowledge' in t else ('topic' if tree[i] else 'concept')
    dates = ''.join(f'{k}: {meta["pages"][i][k]}\n' for k in ('created', 'modified') if meta.get('pages', {}).get(i, {}).get(k))
    fm = f'---\ntitle: "{title.replace(chr(34), "")}"\ntags: [{kind}]\n{dates}---\n'
    return fm + t

if os.path.exists(dst): shutil.rmtree(dst)
for i in text:
    out = os.path.join(dst, path[i] + '.md')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    body = convert(i)
    if i == root:
        body = body.replace('title: "Robotics-Techniques Notes"', 'title: "Robotics Techniques Notes"')
    open(out, 'w', encoding='utf-8').write(body)
for c in stubs:
    out = os.path.join(dst, 'Concepts', c + '.md')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(f'---\ntitle: "{c}"\ntags: [concept, stub]\n---\n（待補充）這個概念被以下論文用到，見下方反向連結。\n')
os.makedirs(os.path.join(dst, 'assets'), exist_ok=True)
try:
    from PIL import Image
except ImportError:
    Image = None
for f in os.listdir(src):
    if f.endswith(('.md', '.json', '.pdf')) or not os.path.isfile(os.path.join(src, f)):
        continue
    out = os.path.join(dst, 'assets', f)
    shutil.copy(os.path.join(src, f), out)
    if Image and f.lower().endswith(('.png', '.jpg', '.jpeg')):
        # keep the published site small: shrink large screenshots and photos
        try:
            im = Image.open(out)
            if max(im.size) > MAX_IMAGE_SIDE:
                im.thumbnail((MAX_IMAGE_SIDE, MAX_IMAGE_SIDE))
            if f.lower().endswith('.png'):
                im.save(out, optimize=True)
            else:
                im.convert('RGB').save(out, quality=80, optimize=True)
        except OSError as e:
            print(f'kept {f} as is: {e}')
print('notes', len(text), 'stubs', sorted(stubs))
