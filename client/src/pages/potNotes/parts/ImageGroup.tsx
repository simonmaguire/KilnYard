import React from "react";
import { Form } from "react-bootstrap";
import { BsPlusCircle, BsX } from "react-icons/bs";
import { IconContext } from "react-icons";
import { Cloudinary } from "@cloudinary/url-gen";

type Tprops = {
  addImage: (section: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImage: (section: string, imageIndex: number) => void;
  images: sectionImages;
  section: string;
};

type sectionImages = {
  public_Ids: string[];
  newImages: File[];
};

type TImageInputProps = {
  section: string;
  images: sectionImages;
  addImage: (section: string, e: React.ChangeEvent<HTMLInputElement>) => void;
};

type TImageRowProps = {
  section: string;
  imageURLs: string[];
  deleteImage: (section: string, imageIndex: number) => void;
};

const ImageInput = ({ section, images, addImage }: TImageInputProps) => {
  return (
    <div>
      {images.newImages?.length + images.public_Ids?.length < 5 && (
        <label htmlFor={`${section}-file-input`}>
          <BsPlusCircle
            className={
              images.newImages?.length + images.public_Ids?.length == 0
                ? "add-file-center"
                : "add-file-bottom"
            }
          />
        </label>
      )}
      <input
        className="hidden"
        id={`${section}-file-input`}
        type="file"
        name={`${section}_pics`}
        accept="image/*"
        onChange={(e) => addImage(section, e)}
      />
    </div>
  );
};

const ImageRow = ({ section, imageURLs, deleteImage }: TImageRowProps) => {
  return (
    <div className="image-row">
      {imageURLs.map((imageSrc, k) => (
        <div key={k} className="image-card">
          <img src={imageSrc} className="input-image" alt={`${section}-pot`} />
          <BsX
            onClick={() => deleteImage(section, k)}
            className="delete-image-icon"
          />
        </div>
      ))}
    </div>
  );
};

const ImageGroup = ({ addImage, deleteImage, images, section }: Tprops) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME || "",
    },
  });

  const imageURLs: string[] = [];
  if (images.public_Ids && images.public_Ids.length > 0) {
    images.public_Ids.forEach((id) => {
      imageURLs.push(cld.image(id).toURL());
    });
  }

  if (images.newImages && images.newImages.length > 0)
    images.newImages.forEach((image) =>
      imageURLs.push(URL.createObjectURL(image))
    );

  return (
    <Form.Group className="form-group">
      <IconContext.Provider value={{ size: "1.8em" }}>
        <Form.Label>
          {section.charAt(0).toUpperCase() + section.slice(1)} Pictures
        </Form.Label>
        <div className="img-group">
          <ImageRow
            section={section}
            imageURLs={imageURLs}
            deleteImage={deleteImage}
          />
          <ImageInput section={section} images={images} addImage={addImage} />
        </div>
      </IconContext.Provider>
    </Form.Group>
  );
};

export default ImageGroup;
