const multer = require("multer");
const { diskStorage } = require("multer");
const path = require("path");
const { join, dirname, extname } = path;

module.exports = function (image, size) {
  return multer({
    // Configuration du stockage
    storage: diskStorage({
      // Configurer l'emplacement du stockage
      destination: (req, file, callback) => {
        const __dirname = dirname(__filename); // Use __filename instead of import.meta.url
        callback(null, join(__dirname, "../public/images"));
      },
      // Configurer le nom avec lequel le fichier va être enregistré
      filename: (req, file, callback) => {
        const name = path
          .parse(file.originalname.split(" ").join("_"))
          .name;
        const extension = extname(file.originalname);
        callback(null, name + Date.now() + extension);
      },
    }),
    // Taille max des images 10Mo
    limits: size,
  }).single(image);
};
