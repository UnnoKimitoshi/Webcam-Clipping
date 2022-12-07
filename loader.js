// ページにjsを埋め込む
window.addEventListener("load", () => {
  const head = document.querySelector("head");
  const script = document.createElement("script");
  script.setAttribute("type", "module");
  script.setAttribute("src", chrome.runtime.getURL("main.js"));
  head.insertBefore(script, head.lastChild);
});
