const video = document.getElementById('camera');
const frame = document.getElementById('frame');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture-button');
const shareSection = document.getElementById('share-section');
const instaButton = document.getElementById('instagram-button');
const copyButton = document.getElementById('copy-hashtag');

// URLパラメータからフレーム指定（例：?frame=5）
const params = new URLSearchParams(location.search);
const frameId = params.get('frame') || '1';
frame.src = `frames/frame${frameId}.png`;

// カメラ起動
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = stream;
  } catch (err) {
    alert('カメラが利用できません: ' + err);
  }
}
startCamera();

// 撮影処理
captureButton.addEventListener('click', () => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // カメラ画像描画
  ctx.drawImage(video, 0, 0, width, height);
  // フレーム重ね
  ctx.drawImage(frame, 0, 0, width, height);

 const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const frame = document.getElementById('frame');
const captureButton = document.getElementById('capture-button');
const instagramLink = document.getElementById('instagram-link');

// QRコードの ?frame=XX を取得
const params = new URLSearchParams(window.location.search);
const frameNum = params.get("frame") || 1;
frame.src = `frames/frame${frameNum}.png`;

// カメラ起動（ボタン押下後）
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    video.srcObject = stream;
  } catch (err) {
    alert("カメラが利用できません: " + err);
  }
}

// 撮影処理
captureButton.addEventListener('click', async () => {
  await startCamera(); // iPhone向けユーザー操作後カメラ起動
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, width, height);
  ctx.drawImage(frame, 0, 0, width, height);

  // 自動ダウンロード
  const link = document.createElement('a');
  link.download = `photo_frame${frameNum}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();

  // Instagram投稿リンク（ハッシュタグ検索ページ）
  instagramLink.href = `https://www.instagram.com/explore/tags/なごや建築まつり2025/`;
});

