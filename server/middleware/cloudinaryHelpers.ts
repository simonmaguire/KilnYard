import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { createHash } from "node:crypto";
import ImageDataSchema from "../models/ImageDataSchema";
import { IImageData } from "../types/imageData";

type MulterObjectForImageSections = {
  throwing_pics: Express.Multer.File[];
  result_pics: Express.Multer.File[];
};

const uploadImages = async (
  images: Express.Multer.File[],
  id: string,
  section: string
): Promise<string[]> => {
  let results: string[] = await Promise.all(
    images.map(async (file): Promise<string> => {
      let data: UploadApiResponse = await cloudinaryUpload(
        file,
        id,
        section
      ).then((data) => data);
      if (data) {
        const imageData: IImageData = new ImageDataSchema({
          public_id: data.public_id,
          secure_url: data.secure_url,
          tags: data.tags,
          pot_id: id,
        });
        await imageData.save();
      }
      return data.public_id;
    })
  );

  return results;
};

const uploadImagesBySection = async (
  imagesBySection: MulterObjectForImageSections,
  id: string
): Promise<{ throwingPicIds: string[]; resultPicIds: string[] }> => {
  let results: { throwingPicIds: string[]; resultPicIds: string[] } = {
    throwingPicIds: [],
    resultPicIds: [],
  };
  if (imagesBySection["throwing_pics"]) {
    await uploadImages(imagesBySection["throwing_pics"], id, "throwing").then(
      (ids) => (results["throwingPicIds"] = ids)
    );
  }
  if (imagesBySection["result_pics"]) {
    await uploadImages(imagesBySection["result_pics"], id, "results").then(
      (ids) => (results["resultPicIds"] = ids)
    );
  }

  return results;
};

const createPublicIdHash = (image: Express.Multer.File, id: string) => {
  const hash = createHash("sha1");
  hash.update(id + image.originalname + image.mimetype + String(image.size));
  let public_id_hash = hash.digest("hex");
  return public_id_hash;
};

const cloudinaryUpload = async (
  image: Express.Multer.File,
  id: string,
  section: string
): Promise<UploadApiResponse> => {
  let public_id_hash = createPublicIdHash(image, id);

  let result = await cloudinary.uploader
    .upload(image.path, {
      public_id: public_id_hash,
      overwrite: false,
      tags: `${section}, ${id}`,
    })
    .then((data) => {
      return data;
    });

  return result;
};

const deleteImage = async (public_id: string) => {
  let result = await cloudinary.uploader
    .destroy(public_id)
    .then((data) => console.log(data));
  await ImageDataSchema.deleteOne({ public_id: public_id });
};

export { uploadImages, deleteImage, createPublicIdHash, uploadImagesBySection };
