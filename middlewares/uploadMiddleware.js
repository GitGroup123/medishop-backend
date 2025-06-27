import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const fieldFolderMap = {
      mainImage: 'uploads/products/main',
      gallery: 'uploads/products/gallery',
      variationImages: 'uploads/products/variations',
      default: 'uploads/categories'
    };

    const folder = fieldFolderMap[file.fieldname] || fieldFolderMap.default;
    fs.mkdirSync(folder, { recursive: true });
    console.log("📦 Uploading file from field:", file.fieldname);
    cb(null, folder);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // eg. 1687281023.png
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
}

export const upload = multer({ storage, fileFilter });

export const productImageUpload = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
  { name: 'variationImages', maxCount: 20 }
]);