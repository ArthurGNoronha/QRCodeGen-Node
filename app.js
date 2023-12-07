const fs = require('fs');
const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');

async function generateQRCodeWithLogo() {
  // Dados para o qr code
  const data = 'https://drive.google.com/file/d/1Wh-q1rzBgQoG7rWwknm3TYO207G6ePcu/view?usp=sharing';

  // Opções de geração do qr code
  const options = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.92,
    margin: 1,
  };

  // Gener QR code
  const qrCode = await QRCode.toDataURL(data, options);
  console.log('QR code gerado com sucesso:', qrCode);

  // Adicionar o logo
  const logo = await loadImage('Icone.png');
  console.log('Logo adicionada com sucesso');

  // Criar o canvas
  const canvas = createCanvas(300, 300);
  const ctx = canvas.getContext('2d');

  // Fazer o Qr Code no canvas
  const qrImage = await loadImage(qrCode);
  ctx.drawImage(qrImage, 0, 0, canvas.width, canvas.height);
  console.log('QR code feito no canvas com sucesso');

  // Centralizar a logo no centro
  const logoSize = 60;
  const x = (canvas.width - logoSize) / 2;
  const y = (canvas.height - logoSize) / 2;

  // Desenhar a logo no código QR
  ctx.drawImage(logo, x, y, logoSize, logoSize);
  console.log('Logo desenhada no canvas com sucesso');

  // Salvar o QrCode final
  const outputFile = 'qrcode.png';
  const stream = canvas.createPNGStream();
  const out = fs.createWriteStream(outputFile);

  stream.pipe(out);
  out.on('finish', () => {
    console.log(`QR code com a logo salvo em: ${outputFile}`);
    console.log('Código executado com sucesso');
  });
}

generateQRCodeWithLogo();