/* =========================================================
   Shared by every page: header, footer, theme switch, copy-email, fade-in.
   You don't need to edit this file, except the NAV list below to add a page.
   ========================================================= */
function href(k) { var top = document.body.dataset.page === "index"; return k === "index" ? (top ? "index.html" : "../index.html") : (top ? "pages/" : "") + k + ".html"; }

const NAV = [["about","About"],["education","Education"],["books","Books"],["research","Research"],["ministry","Ministry"],["ventures","Ventures"],["connect","Connect"]];
const NAME = "Falade Solomon Adeyemi";
const root = document.documentElement;
const SOCIAL_LINKS = [
  ["Instagram", "https://www.instagram.com/f.a_solomon", "instagram"],
  ["TikTok", "https://www.tiktok.com/@f.asolomon_cts", "tiktok"],
  ["TikTok", "https://www.tiktok.com/@faladesolomon_cts", "tiktok"],
  ["X", "https://x.com/Solomon201", "x"],
  ["YouTube", "https://www.youtube.com/results?search_query=Falade+Solomon+Adeyemi", "youtube"],
  ["Facebook", "https://www.facebook.com/search/top?q=Falade%20Solomon%20Adeyemi", "facebook"],
  ["LinkedIn", "https://www.linkedin.com/search/results/people/?keywords=Falade%20Solomon%20Adeyemi", "linkedin"],
  ["WhatsApp", "https://wa.me/2348162081197", "whatsapp"]
];
const SOCIAL_ICONS = {
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" class="icon-dot"/>',
  tiktok: '<path d="M14 4v10a4 4 0 1 1-3.5-4"/><path d="M14 4c1 2.5 2.8 4 5 4.5"/>',
  x: '<path d="M5 4l14 16M19 4L5 20"/>',
  youtube: '<rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9l5 3-5 3z" class="icon-play"/>',
  facebook: '<path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.6.4-1 1-1z" class="icon-solid"/>',
  linkedin: '<path d="M5 9v10M5 5.5v.1M10 19v-6c0-2.2 1.3-4 3.5-4S17 11 17 13v6"/>',
  whatsapp: '<path d="M20 11.7A8 8 0 0 1 8.2 18.9L4 20l1.2-4A8 8 0 1 1 20 11.7z"/><path d="M9 8.5c.4 3 3.5 6 6.5 6.5l1-1.5-2.2-1-.8 1c-1.5-.6-2.8-1.9-3.4-3.4l1-.8-1-2.2z"/>'
};
function socialIcon(name, className) {
  return '<svg class="' + className + ' ' + name + '" viewBox="0 0 24 24" aria-hidden="true">' + SOCIAL_ICONS[name] + '</svg>';
}

function chrome(page) {
  var links = NAV.map(function (n) {
    return '<a href="' + href(n[0]) + '"' + (n[0] === page ? ' aria-current="page"' : '') + '>' + n[1] + '</a>';
  }).join("");
  document.getElementById("site-header").innerHTML =
    '<header><div class="wrap bar"><a class="brand" href="' + href("index") + '">' + NAME + '</a>' +
    '<nav id="primary-nav" aria-label="Main">' + links + '</nav>' +
    '<div class="bar-actions"><button class="menu-toggle" id="menu-toggle" type="button" aria-controls="primary-nav" aria-expanded="false" aria-label="Open navigation menu">' +
    '<span class="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span></button>' +
    '<button class="icon-btn" id="theme" type="button" aria-label="Switch colour theme">\u25D0</button></div></div></header>';
  var socialLinks = SOCIAL_LINKS.map(function (social) {
    return '<a class="footer-social-link" href="' + social[1] + '" target="_blank" rel="noopener noreferrer" aria-label="' + social[0] + '">' +
      socialIcon(social[2], "footer-social-icon") + '</a>';
  }).join("");
  document.getElementById("site-footer").innerHTML =
    '<footer class="site"><div class="wrap footer-content"><div class="footer-contact"><strong>Get in touch</strong>' +
    '<a href="mailto:faladesolomona@gmail.com">faladesolomona@gmail.com</a>' +
    '<a href="https://wa.me/2348162081197" target="_blank" rel="noopener noreferrer">WhatsApp: +234 816 208 1197</a></div>' +
    '<nav class="footer-social" aria-label="Social media">' + socialLinks + '</nav>' +
    '<p class="copyright">\u00A9 ' + new Date().getFullYear() + ' ' + NAME + '. All rights reserved.</p></div></footer>';

  document.getElementById("theme").addEventListener("click", function () {
    var dark = root.getAttribute("data-theme") === "dark" || (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    var next = dark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
  var menuToggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("primary-nav");
  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    nav.classList.remove("is-open");
  }
  menuToggle.addEventListener("click", function () {
    var isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    nav.classList.toggle("is-open", !isOpen);
  });
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });
  var desktopNav = matchMedia("(min-width: 901px)");
  if (desktopNav.addEventListener) desktopNav.addEventListener("change", closeMenu);
  else desktopNav.addListener(closeMenu);
  var cur = nav.querySelector('a[aria-current="page"]');
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
document.addEventListener("click", function (e) {
  if (!e.target.closest("#copy-phone")) return;
  var phone = document.getElementById("phone").textContent.trim();
  (navigator.clipboard ? navigator.clipboard.writeText(phone) : Promise.reject()).then(function () { say("WhatsApp number copied"); }, function () { say("Press and hold the number to copy it"); });
});

/* Fade-in on scroll */
var io = new IntersectionObserver(function (es) {
  es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: .1 });
function observe() { [].forEach.call(document.querySelectorAll(".reveal:not(.in)"), function (el) { io.observe(el); }); }

if (document.body.dataset.page) { chrome(document.body.dataset.page); observe(); }
