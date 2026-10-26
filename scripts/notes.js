// Keep notes.html#<note> in sync with the note open in the Quartz iframe,
// so every note has a link that can be shared, e.g. notes.html#Concepts/PPO
var frame = document.getElementById("notes-frame");
var base = new URL("notes/", location.href).pathname;

function noteFromHash() {
  return "notes/" + decodeURIComponent(location.hash.slice(1));
}

if (location.hash) frame.src = noteFromHash();
window.addEventListener("hashchange", function () {
  frame.src = noteFromHash();
});

// the Quartz pages post {type: "quartz-nav", path, title} every time a note opens
window.addEventListener("message", function (e) {
  if (e.origin !== location.origin || !e.data || e.data.type !== "quartz-nav") return;
  var p = decodeURIComponent(e.data.path);
  if (p.indexOf(base) !== 0) return;
  var slug = p.slice(base.length).replace(/index(\.html)?$/, "").replace(/\.html$/, "");
  history.replaceState(null, "", slug ? "#" + slug : location.pathname);
  if (e.data.title) document.title = e.data.title + " · Wuu's World";
});
