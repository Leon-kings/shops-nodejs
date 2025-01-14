import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';

  const upload = multer({ dest: 'uploads/' });
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// const uploadFile = async (file, res) => {
//   try {
//     // const response = await cloudinary.v2.uploader.upload(file.path);
  
//     const response = await cloudinary.uploader.upload(upload)
//     .then(result => console.log(result))
//     .catch(error => console.error(error));
//     return response;
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// };
const uploadFile = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default uploadFile;
