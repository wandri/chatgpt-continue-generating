const fs = require('fs');
const archiver = require('archiver');
const manifest = require("../src/manifest.json");

// Function to zip a folder
function zipFolder(source: string, out: string) {
  const archive = archiver('zip', {zlib: {level: 9}});
  const stream = fs.createWriteStream(out);

  return new Promise<void>((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', (err: any) => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
}

const sourceFolder = 'dist/chatgpt-continue-generating/browser';
const outputPath = `./chatgpt-continue-generating-${manifest.version}.zip`;

zipFolder(sourceFolder, outputPath)
  .then(() => console.log('Folder successfully zipped'))
  .catch(console.error);
