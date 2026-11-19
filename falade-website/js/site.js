/* =========================================================
   Shared by every page: header, footer, theme switch, copy-email, fade-in.
   You don't need to edit this file, except the NAV list below to add a page.
   ========================================================= */
function href(k) { var top = document.body.dataset.page === "index"; return k === "index" ? (top ? "index.html" : "../index.html") : (top ? "pages/" : "") + k + ".html"; }

const NAV = [["about","About"],["education","Education"],["books","Books"],["research","Research"],["ministry","Ministry"],["ventures","Ventures"],["connect","Connect"]];
const NAME = "Falade Solomon Adeyemi";
const root = document.documentElement;

function chrome(page) {
  var links = NAV.map(function (n) {
    return '<a href="' + href(n[0]) + '"' + (n[0] === page ? ' aria-current="page"' : '') + '>' + n[1] + '</a>';
  }).join("");
  document.getElementById("site-header").innerHTML =
    '<header><div class="wrap bar"><a class="brand" href="' + href("index") + '">' + NAME + '</a>' +
    '<nav aria-label="Main">' + links + '</nav>' +
    '<button class="icon-btn" id="theme" type="button" aria-label="Switch colour theme">\u25D0</button></div></header>';
  document.getElementById("site-footer").innerHTML =
    '<footer class="site"><div class="wrap">\u00A9 ' + new Date().getFullYear() + ' ' + NAME + '. All rights reserved.</div></footer>';

  document.getElementById("theme").addEventListener("click", function () {
    var dark = root.getAttribute("data-theme") === "dark" || (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    var next = dark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
  var cur = document.querySelector('nav a[aria-current="page"]'), nav = document.querySelector("nav");
  if (cur && nav) nav.scrollLeft = Math.max(0, cur.offsetLeft - 24);
}

/* Copy-email button (Connect page) */
var toastTimer;
function say(msg) {
  var t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); t.setAttribute("aria-live", "polite"); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
}
document.addEventListener("click", function (e) {
  if (!e.target.closest("#copy")) return;
  var mail = document.getElementById("mail").textContent;
  (navigator.clipboard ? navigator.clipboard.writeText(mail) : Promise.reject()).then(function () { say("Email copied"); }, function () { say("Press and hold the email to copy it"); });
});

/* Fade-in on scroll */
var io = new IntersectionObserver(function (es) {
  es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: .1 });
function observe() { [].forEach.call(document.querySelectorAll(".reveal:not(.in)"), function (el) { io.observe(el); }); }

if (document.body.dataset.page) { chrome(document.body.dataset.page); observe(); }
