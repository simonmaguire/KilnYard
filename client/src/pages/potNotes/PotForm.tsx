import React, { useState } from "react";
import { updatePot, addPot, deletePot } from "../../API";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { validationSchema } from "./FormValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import GeneralSection from "./parts/formSections/GeneralSection";
import ThrowingSection from "./parts/formSections/ThrowingSection";
import TrimmingSection from "./parts/formSections/TrimmingSection";
import GlazingSection from "./parts/formSections/GlazingSection";
import ResultSection from "./parts/formSections/ResultSection";
import ButtonBar from "./parts/ButtonBar";

interface IPotFormProps {
  potInfo: IPotInfo;
  setIdAfterSave: (id: string) => void;
}

type TImages = {
  throwing: sectionImages;
  result: sectionImages;
};

type sectionImages = {
  public_Ids: string[];
  newImages: File[];
};

const PotForm: React.FC<IPotFormProps> = ({ potInfo, setIdAfterSave }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<TImages>({
    throwing: { public_Ids: potInfo.throwing_pic_ids || [], newImages: [] },
    result: { public_Ids: potInfo.result_pic_ids || [], newImages: [] },
  });

  const addImage = (
    section: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) {
      return;
    }
    let imageSection = section as keyof typeof images;

    if (images.hasOwnProperty(imageSection)) {
      setImages({
        ...images,
        [imageSection]: {
          ...images[imageSection],
          newImages: images[imageSection].newImages.concat(
            Array.from(e.target.files)
          ),
        },
      });
    }
    e.target.value = "";
  };

  const deleteImage = (section: string, imageIndex: number) => {
    let imageSection = section as keyof typeof images;
    if (!images[imageSection]) return;

    if (imageIndex < images[imageSection].public_Ids.length) {
      setImages({
        ...images,
        [imageSection]: {
          ...images[imageSection],
          public_Ids: images[imageSection].public_Ids
            .slice(0, imageIndex)
            .concat(images[imageSection].public_Ids.slice(imageIndex + 1)),
        },
      });
    } else {
      setImages({
        ...images,
        [imageSection]: {
          ...images[imageSection],
          newImages: images[imageSection].newImages
            .slice(0, imageIndex - images[imageSection].public_Ids.length)
            .concat(
              images[imageSection].newImages.slice(
                imageIndex - images[imageSection].public_Ids.length + 1
              )
            ),
        },
      });
    }
  };

  const handleDeletePot = (): void => {
    deletePot(potInfo._id).then(() => {
      navigate("/pottery");
    });
  };

  const onCreateOrSave = () => {
    setLoading(true);
    let formData = new FormData(document.querySelector("form") ?? undefined);
    formData.append("_id", potInfo._id);

    images.throwing.newImages.forEach((image) =>
      formData.append("throwing_pics", image)
    );

    images.throwing.public_Ids.forEach((id) =>
      formData.append("throwing_pic_ids", id)
    );

    images.result.newImages.forEach((image) =>
      formData.append("result_pics", image)
    );

    images.result.public_Ids.forEach((id) =>
      formData.append("result_pic_ids", id)
    );

    if (potInfo._id !== "new") {
      updatePot(formData).then(({ data: { pot } }: IPotInfo | any) => {
        setImages({
          ...images,
          throwing: { newImages: [], public_Ids: pot.throwing_pic_ids },
          result: { newImages: [], public_Ids: pot.result_pic_ids },
        });
        setLoading(false);
      });
    } else {
      addPot(formData).then(({ data: { pot } }: IPotInfo | any) => {
        setImages({
          ...images,
          throwing: { newImages: [], public_Ids: pot.throwing_pic_ids },
          result: { newImages: [], public_Ids: pot.result_pic_ids },
        });
        setIdAfterSave(pot._id);
        navigate(`/pottery/${pot._id}`);
        setLoading(false);
      });
    }
  };

  const methods = useForm<any>({
    mode: "onChange",
    defaultValues: potInfo,
    resolver: yupResolver(validationSchema),
  });

  return (
    <div id="form">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onCreateOrSave)}
          encType="multipart/form-data"
        >
          <GeneralSection />
          <ThrowingSection
            addImage={addImage}
            deleteImage={deleteImage}
            images={images.throwing}
          />
          <TrimmingSection />
          <GlazingSection />
          <ResultSection
            addImage={addImage}
            deleteImage={deleteImage}
            images={images.result}
          />
          <ButtonBar
            potId={potInfo._id}
            handleDeletePot={handleDeletePot}
            handleCancel={() => {
              navigate("/pottery");
            }}
            formIsValid={methods.formState.isValid}
            loading={loading}
          ></ButtonBar>
        </form>
      </FormProvider>
    </div>
  );
};

export default PotForm;
