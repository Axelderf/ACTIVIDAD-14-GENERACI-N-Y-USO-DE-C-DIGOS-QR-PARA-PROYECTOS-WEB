// Utilidad: validación básica de URL
function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

const formEl = document.getElementById('qrForm');
const urlInputEl = document.getElementById('urlInput');
const sizeRangeEl = document.getElementById('sizeRange');
const sizeValueEl = document.getElementById('sizeValue');
const marginRangeEl = document.getElementById('marginRange');
const marginValueEl = document.getElementById('marginValue');
const ecLevelEl = document.getElementById('ecLevel');
const dotStyleEl = document.getElementById('dotStyle');
const fgColorEl = document.getElementById('fgColor');
const bgColorEl = document.getElementById('bgColor');
const generateBtnEl = document.getElementById('generateBtn');
const clearBtnEl = document.getElementById('clearBtn');
const formatSelectEl = document.getElementById('formatSelect');
const downloadBtnEl = document.getElementById('downloadBtn');
const qrPreviewEl = document.getElementById('qrPreview');

// Estado del QR
let qrCode = null;

function ensureQrInstance() {
  if (!qrCode) {
    qrCode = new QRCodeStyling({
      width: parseInt(sizeRangeEl.value, 10),
      height: parseInt(sizeRangeEl.value, 10),
      data: 'https://ejemplo.com',
      margin: parseInt(marginRangeEl.value, 10),
      type: 'svg',  
      image: undefined,
      qrOptions: {
        errorCorrectionLevel: ecLevelEl.value,
      },
      dotsOptions: {
        color: fgColorEl.value,
        type: dotStyleEl.value,
      },
      backgroundOptions: {
        color: bgColorEl.value,
      },
    });
    qrPreviewEl.innerHTML = '';
    qrCode.append(qrPreviewEl);
  }
}

function updateSizeOutput() {
  sizeValueEl.textContent = `${sizeRangeEl.value} px`;
}

function updateMarginOutput() {
  marginValueEl.textContent = `${marginRangeEl.value}`;
}

sizeRangeEl.addEventListener('input', () => {
  updateSizeOutput();
});

marginRangeEl.addEventListener('input', () => {
  updateMarginOutput();
});

function generateOrUpdateQr() {
  const value = urlInputEl.value.trim();
  if (!isValidHttpUrl(value)) {
    urlInputEl.setCustomValidity('Ingresa una URL válida que comience con http(s)://');
    urlInputEl.reportValidity();
    return;
  }
  urlInputEl.setCustomValidity('');
  ensureQrInstance();
  const size = Math.min(300, parseInt(sizeRangeEl.value, 10));
  const margin = parseInt(marginRangeEl.value, 10);
  qrCode.update({
    width: size,
    height: size,
    data: value,
    margin,
    qrOptions: { errorCorrectionLevel: ecLevelEl.value },
    dotsOptions: { color: fgColorEl.value, type: dotStyleEl.value },
    backgroundOptions: { color: bgColorEl.value },
  });
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  generateOrUpdateQr();
});

generateBtnEl.addEventListener('click', (e) => {
  e.preventDefault();
  generateOrUpdateQr();
});

clearBtnEl.addEventListener('click', () => {
  formEl.reset();
  updateSizeOutput();
  updateMarginOutput();
  qrPreviewEl.innerHTML = '';
  qrCode = null;
});

// Actualiza preview al cambiar opciones (si hay QR creado)
const liveControls = [sizeRangeEl, marginRangeEl, ecLevelEl, dotStyleEl, fgColorEl, bgColorEl];
liveControls.forEach((el) => {
  el.addEventListener('input', () => {
    if (qrCode && isValidHttpUrl(urlInputEl.value.trim())) {
      generateOrUpdateQr();
    }
  });
});

downloadBtnEl.addEventListener('click', async () => {
  if (!qrCode) {
    generateOrUpdateQr();
  }
  if (!qrCode) return;
  const format = formatSelectEl.value; // 'png' | 'jpeg' | 'webp' | 'svg'
  await qrCode.download({ name: 'mi-qr', extension: format });
});

// Inicializar outputs
updateSizeOutput();
updateMarginOutput();


