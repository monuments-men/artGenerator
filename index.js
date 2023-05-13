const express = require('express');
const Jimp = require('jimp');
const { createCanvas } = require('canvas');
const app = express();
const port = 3000;

function createTransparentText(text, width, height) {
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');
  context.font = '45px Arial';
  context.fillStyle = 'rgba(0, 0, 0, 2.1)';
  context.fillText(text, 0, 30);
  return canvas.toBuffer();
}

// Array of text pieces and their positions
const textPieces = [
  { text: 'HELLO THERE GENERAL KENOBI', x: 1300, y: 1300 },
  // ... Add other text pieces here
];

async function addGraffitiToImage(imagePath, outputPath) {
  const image = await Jimp.read(imagePath);
  for (const piece of textPieces) {
    const textBuffer = createTransparentText(piece.text, 600, 600); // Adjust width and height as needed
    const textImage = await Jimp.read(textBuffer);
    image.composite(textImage, piece.x, piece.y);
  }
  await image.writeAsync(outputPath);
}

app.get('/generate', (req, res) => {
  const inputPath = 'IMG_0183.jpg'; // You could replace this with req.query.input or something similar
  const outputPath = 'output.png'; // Same for this

  addGraffitiToImage(inputPath, outputPath)
    .then(() => {
      res.sendFile(outputPath, { root: __dirname }); // Send the modified image file as the response
    })
    .catch(err => {
      res.status(500).send(err.message); // Send an error message if something goes wrong
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
