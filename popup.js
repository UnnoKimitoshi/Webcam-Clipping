const button = document.getElementById("save");
const params = document.querySelectorAll("input");
const keys = ["videoWidth", "videoHeight", "canvasWidth", "canvasHeight"];

//　storageからparamsを取得しテキストボックスに入れる
chrome.storage.local.get(keys, (obj) => {
  for (let i = 0; i < params.length; i++) {
    params[i].value = obj[keys[i]];
  }
});

// ボタンが押されたら各値をstorageに格納、contentにパラメータ変更を通知
button.addEventListener("click", () => {
  //storageに格納
  for (let i = 0; i < params.length; i++) {
    chrome.storage.local.set({ [keys[i]]: params[i].value }, () => {});
  }
  // contentにパラメータ変更を通知
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { message: "setParams" }, () => {});
  });
});
