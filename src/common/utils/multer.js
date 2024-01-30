import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();
const diskStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}(-${path.extname(file.originalname)}`
    );
  }
});
export const diskUpload = multer({
  storage: diskStore,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
});
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
});

export default upload;
