// mainからの要求
window.addEventListener("message", (event) => {
  if (event.data.message === "getParam") {
    sendParams();
  }
});

// popupからのパラメータ変更通知
chrome.runtime.onMessage.addListener((request, sender) => {
  sendParams();
  return true;
});

// パラメータを取得しmainに送る
function sendParams() {
  chrome.storage.local.get(
    ["videoWidth", "videoHeight", "canvasWidth", "canvasHeight"],
    (obj) => {
      window.postMessage({ params: obj }, "*");
    }
  );
}
