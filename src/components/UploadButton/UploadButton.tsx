import React from "react";

import { UploadListType, UploadProps } from "antd/es/upload/interface";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";

import { useGetImageUrl } from "hooks/general/use-get-image-url";

import styles from "./UploadButton.module.scss";

export const UploadButton = () => {
  const { imageUrl, setImageUrl, setUploadImagePath } = useGetImageUrl();

  const [loading, setLoading] = React.useState(false);

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
      setLoading(true);
      return;
    }

    if (info.file.status === "done" && info.file.originFileObj) {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);

        setImageUrl(url);
        setUploadImagePath(info.file.response.filePath);

        message.success(`Image ${info.file.name} successfully uploaded.`);
      });
    }
  };

  const UploadButton = (
    <span>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <p>Upload Image</p>
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
  };

  return (
    <Upload {...uploadProps}>
      {imageUrl ? (
        <img className={styles.uploadedImage} src={imageUrl} alt="" />
      ) : (
        UploadButton
      )}
    </Upload>
  );
};
