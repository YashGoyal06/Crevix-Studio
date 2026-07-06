export const createTypedSignatureImage = (name, fontFamily = 'Great Vibes') => {
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 280;
  const context = canvas.getContext('2d');

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#111827';
  context.font = `96px "${fontFamily}", "Brush Script MT", cursive`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(name || 'Signed', canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL('image/png');
};

export const canvasHasSignature = (canvas) => {
  const context = canvas.getContext('2d');
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;

  for (let index = 3; index < pixels.length; index += 4) {
    if (pixels[index] !== 0) return true;
  }

  return false;
};
