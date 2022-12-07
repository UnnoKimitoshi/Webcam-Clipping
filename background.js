// 初インストール時に初期値を設定
chrome.runtime.onInstalled.addListener(() => {
  registData("videoWidth", "960");
  registData("videoHeight", "570");
  registData("canvasWidth", "960");
  registData("canvasHeight", "570");
});

// chromeのlocalStorageに{key: intialValue}で登録
function registData(key, initialValue) {
  chrome.storage.local.get([key], (obj) => {
    let value = obj[key];
    if (!value) {
      value = initialValue;
      chrome.storage.local.set({ [key]: value }, () => {});
    }
  });
}
