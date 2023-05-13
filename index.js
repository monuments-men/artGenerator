const express = require('express');
const Jimp = require('jimp');
const { createCanvas } = require('canvas');
const app = express();
const port = 3000;

function createTransparentText(text, width, height) {
  const scale = 8; // Increase this for a higher resolution canvas
  const canvas = createCanvas(width * scale, height * scale);
  const context = canvas.getContext('2d');
  context.font = '  10px Georgia';
  context.fillStyle = 'rgba(0, 0, 0, 1.1)';
  context.fillText(text, 0, 30);
  return canvas.toBuffer();
}

// Array of text pieces and their positions

// x is left and right, y is up and down

let textPieces = [];
for(let i= 0; i< 18; i++){

    // mainstage
    textPieces[i] = { text: i + "Hello There Lisbon", x : 1210, y: 620 + 20 *( 1 + i)};
    textPieces[i+18] = { text: i + "Hello There Lisbon", x : 1310, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*2] = { text: i + "Hello There Lisbon", x : 1410, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*3] = { text: i + "Hello There Lisbon", x : 1510, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*4] = { text: i + "Hello There Lisbon", x : 1610, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*5] = { text: i + "Hello There Lisbon", x : 1710, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*6] = { text: i + "Hello There Lisbon", x : 1810, y: 620 + 20 *( 1 + i)};

    //left

    textPieces[i+18*7] = { text: i + "Hello There Lisbon", x : 440, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*8] = { text: i + "Hello There Lisbon", x : 540, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*9] = { text: i + "Hello There Lisbon", x : 640, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*10] = { text: i + "Hello There Lisbon", x : 740, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*11] = { text: i + "Hello There Lisbon", x : 840, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*12] = { text: i + "Hello There Lisbon", x : 940, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*13] = { text: i + "Hello There Lisbon", x : 1040, y: 620 + 20 *( 1 + i)};



    textPieces[i+18*14] = { text: i + "Hello There Lisbon", x : 2000, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*15] = { text: i + "Hello There Lisbon", x : 2100, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*16] = { text: i + "Hello There Lisbon", x : 2200, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*17] = { text: i + "Hello There Lisbon", x : 2300, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*18] = { text: i + "Hello There Lisbon", x : 2400, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*19] = { text: i + "Hello There Lisbon", x : 2500, y: 620 + 20 *( 1 + i)};
    textPieces[i+18*20] = { text: i + "Hello There Lisbon", x : 2600, y: 620 + 20 *( 1 + i)};


}



async function addGraffitiToImage(imagePath, outputPath) {
  const image = await Jimp.read(imagePath);
  for (const piece of textPieces) {
    const textBuffer = createTransparentText(piece.text, 500, 100); // Adjust width and height as needed
    const textImage = await Jimp.read(textBuffer);
    image.composite(textImage, piece.x, piece.y);
  }
  await image.writeAsync(outputPath);
}

app.get('/generate', (req, res) => {
  const inputPath = 'IMG_01.jpg'; // You could replace this with req.query.input or something similar
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
