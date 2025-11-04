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

  // 画像保存（自動ダウンロード）
  const photo = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `nagoya_build_photo${frameId}.png`;
  link.href = photo;
  link.click();

  // UI切り替え
  captureButton.style.display = 'none';
  shareSection.style.display = 'block';
});

// Instagram誘導
instaButton.addEventListener('click', () => {
  // ハッシュタグ検索ページへ遷移
  window.location.href = 'https://www.instagram.com/explore/tags/なごや建築まつり2025/';
});

// ハッシュタグコピー
copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText('#なごや建築まつり2025').then(() => {
    copyButton.textContent = 'コピーしました ✅';
    setTimeout(() => {
      copyButton.textContent = '#なごや建築まつり2025 をコピー';
    }, 2000);
  });
});
