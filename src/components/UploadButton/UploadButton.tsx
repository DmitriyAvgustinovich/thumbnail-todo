import React from "react";

import { UploadListType, UploadProps } from "antd/es/upload/interface";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";

import { useContexts } from "hooks/general/use-contexts";

import { IProject } from "types/IProject";
import { IUser } from "types/IUser";

import styles from "./UploadButton.module.scss";

interface IUploadButtonProps {
  disabled: boolean;
  existedImage?: string;
  clearExistedImageUrlCallback?: (formValues?: IUser | IProject) => void;
}

export const UploadButton = (props: IUploadButtonProps) => {
  const { disabled, existedImage, clearExistedImageUrlCallback } = props;

  const [isLoading, setIsLoading] = React.useState(false);

  const {
    imageUrlContext: { newImageUrl, setNewImageUrl, setUploadImagePath },
  } = useContexts();

  const handleClearNewImageUrl = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setNewImageUrl("");
    message.success("Image was cleared.");
  };

  const handleClearUploadImagePath = (event: React.SyntheticEvent) => {
    event.stopPropagation();

    if (clearExistedImageUrlCallback) {
      clearExistedImageUrlCallback();
    }
  };

  const getBase64 = (img: Blob, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPngImageFormat =
      file.type === "image/jpeg" || file.type === "image/png";

    const isTwoMBImageWeight = file.size / 1024 / 1024 < 2;

    if (!isJpgOrPngImageFormat) {
      message.error("You can only upload JPG/PNG file.");
    }

    if (!isTwoMBImageWeight) {
      message.error("Image should not exceed 2MB.");
    }

    return isJpgOrPngImageFormat && isTwoMBImageWeight;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setIsLoading(true);
      return;
    }

    if (info.file.status === "done" && info.file.originFileObj) {
      getBase64(info.file.originFileObj, (url) => {
        setIsLoading(false);

        setNewImageUrl(url);
        setUploadImagePath(info.file.response.filePath);

        message.success(`Image successfully uploaded.`);
      });
    }
  };

  const UploadButton = (
    <span>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <p>Upload</p>
    </span>
  );

  const uploadProps = {
    name: "file",
    action: `${import.meta.env.VITE_BASE_URL}/upload-image`,
    onChange: handleChange,
    beforeUpload: beforeUpload,
    listType: "picture-card" as UploadListType,
    showUploadList: false,
    withCredentials: true,
    disabled,
  };

  return (
    <Upload {...uploadProps}>
      {newImageUrl || existedImage ? (
        <div>
          <img
            className={styles.uploadedImage}
            src={newImageUrl || existedImage}
            alt=""
          />

          {newImageUrl && !existedImage && (
            <Button
              size="small"
              type="link"
              onClick={(event) => handleClearNewImageUrl(event)}
              disabled={disabled}
            >
              Clear new image
            </Button>
          )}

          {existedImage && (
            <Button
              size="small"
              type="link"
              onClick={(event) => handleClearUploadImagePath(event)}
              disabled={disabled}
            >
              Clear existed image
            </Button>
          )}
        </div>
      ) : (
        UploadButton
      )}
    </Upload>
  );
};
