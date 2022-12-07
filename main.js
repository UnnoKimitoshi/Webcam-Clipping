let videoWidth, videoHeight;

// 元々のgetUserMedia()を持っておく
const getUserMedia = navigator.mediaDevices.getUserMedia.bind(
  navigator.mediaDevices
);
// contentにパラメーターを要求
window.postMessage({ message: "getParam" }, "*");

// contentからの返信に対応
window.addEventListener("message", (event) => {
  if (event.data.params) {
    videoWidth = event.data.params.videoWidth;
    videoHeight = event.data.params.videoHeight;
    canvas.width = event.data.params.canvasWidth;
    canvas.height = event.data.params.canvasHeight;
  }
  // 取得してから描画
  draw();
});

const video = document.createElement("video");
video.autoplay = true;
// 出力用canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

function draw() {
  // getUserMedia()の上書きをして、カメラのstreamではなくcanvasのstreamを取得
  navigator.mediaDevices.getUserMedia = async function (constraints) {
    // 音声のみが取得された場合は保持しているgetUserMediaを返す
    if (constraints.audio || !constraints.video) {
      return getUserMedia(constraints);
    }
    // canvasのstream情報を取得
    const stream = await getCapCanvasStream();
    return stream;
  };
  async function getCapCanvasStream() {
    // 所持しているgetUserMediaでカメラの映像を取得
    getUserMedia({
      video: {
        width: videoWidth,
        height: videoHeight,
      },
      audio: false,
    }).then(function (stream) {
      // 非表示のvideoのエレメントにwebカメラの映像を表示させる
      video.srcObject = stream;
    });

    // videoの要素の映像を非表示のcanvasに描画
    drawCanvas();

    // canvasのstreamを取得
    const stream = canvas.captureStream(10);
    return stream;
  }

  function drawCanvas() {
    const dx = (videoWidth - canvas.width) / 2;
    const dy = (videoHeight - canvas.height) / 2;
    ctx.drawImage(
      video,
      dx,
      dy,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    requestAnimationFrame(drawCanvas);
  }
}
