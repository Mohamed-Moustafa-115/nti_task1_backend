import { Request } from "express";
import multer from "multer";
import ApiErrors from "../utils/apiErrors";
import { ImageFieldsInterface } from "../interfaces/uploadFieldsInterface";

const uploadOptions = (): multer.Multer => {
  const multerStorage: multer.StorageEngine = multer.memoryStorage();

  const multerFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiErrors('File is not an image', 400));
    }
  };

  return multer({ storage: multerStorage, fileFilter: multerFilter });
};

export const uploadSingleImage = (fieldName: string) => uploadOptions().single(fieldName);

export const uploadMultiImages = (fields: ImageFieldsInterface[]) => uploadOptions().fields(fields);
