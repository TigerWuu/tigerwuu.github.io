# Notes site

`notes.html` shows the Robotics notes inside the main site's Bootstrap page.
The notes themselves are a [Quartz](https://quartz.jzhao.xyz/) site in `notes/`, built from Notion.

## How it updates

The **Notes site** workflow (`.github/workflows/notes.yml`) runs every day at 02:00 Taiwan time,
and whenever you press **Run workflow** on the Actions tab. It:

1. pulls every page under *Robotics-Techniques Notes* from Notion (`sync/notion-sync.mjs`),
2. turns them into Quartz Markdown (`sync/convert.py`): wiki links, folders, "Background knowledge" items linked to concept pages, smaller images,
3. builds the site with Quartz (`build.sh`) into `notes/`,
4. commits `notes/` and `notes-src/content/` if anything changed. GitHub Pages then publishes it.

Lecture PDFs are not published: they are left as plain text on the page.

## One-time setup

1. Create a Notion integration at <https://www.notion.so/profile/integrations> (type: Internal) and copy its secret.
2. In Notion, open *Robotics-Techniques Notes* → `···` → **Connections** → add the integration.
3. In GitHub: repository **Settings → Secrets and variables → Actions → New repository secret**, name `NOTION_TOKEN`, value the integration secret.
4. **Actions → Notes site → Run workflow** to sync right away.

Without the secret, the workflow still rebuilds the site from the notes already in `content/`.

## Files

| Path | What it is |
| --- | --- |
| `content/` | Quartz Markdown generated from Notion. Edit in Notion, not here: the next sync overwrites it. |
| `quartz/` | Our changes on top of Quartz: config, layout, main-site nav bar and banner, colours |
| `sync/` | Notion download and conversion scripts |
| `build.sh` | Fetches Quartz (pinned version), applies `quartz/`, builds into `../notes` |

## Building locally

```bash
bash notes-src/build.sh          # needs Node 22 and git
python3 -m http.server           # then open http://localhost:8000/notes.html
```
