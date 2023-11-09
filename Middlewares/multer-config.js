import multer, { diskStorage } from "multer";
import path, { join, dirname, extname } from "path";
import { fileURLToPath } from "url";

export default function (image,size) {
    return multer({
        //configuration du stockage
        storage: diskStorage({
            //config l'emplacement du stockage
            destination: (req, file, callback) => {
                const __dirname = dirname(fileURLToPath(import.meta.url)); //recuperer le chemin du dossier courant
                callback(null, join(__dirname, "../public/images")); //indiquer l'emplacement de stockage
            },
            //configurer le nom avec lequel le fichier va etre enregistrer
            filename: (req, file, callback) => {
                const name = path.parse(file.originalname.split(" ").join("_")).name
                const extension = extname(file.originalname);
                callback(null, name + Date.now() + extension);
            },
        }),
        //taille max des images 10Mo
            limits: size,
    }).single(image); //le fichier est envoyé dans le body avec nom/clé 'pic'
}