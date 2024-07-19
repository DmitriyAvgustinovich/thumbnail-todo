import React from "react";

import { BarsOutlined, CopyOutlined } from "@ant-design/icons";
import {
  Button,
  Empty,
  Input,
  Popover,
  Tooltip,
  Typography,
  message,
} from "antd";

import { taskDescriptionFieldMarkdownLabels } from "constants/task/task-description-field-markdown-labels";

import { useGetSearchedDataByKey } from "hooks/general/use-get-searched-data-by-key";

import styles from "./MarkdownBlocks.module.scss";

interface IMarkdownListElement {
  key: string;
  searchKey: string;
  label: React.ReactNode;
}

export const MarkdownBlocks = () => {
  const [searchMarkdownElementValue, setSearchMarkdownElementValue] =
    React.useState("");

  const handleCopyMarkdownText = (markdownText: string) => {
    navigator.clipboard.writeText(markdownText);
    message.success(`${markdownText} copied to clipboard`);
  };

  const markdownListElements = [
    {
      key: "1",
      searchKey: taskDescriptionFieldMarkdownLabels.bold,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(taskDescriptionFieldMarkdownLabels.bold)
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.bold}
        </Button>
      ),
    },
    {
      key: "2",
      searchKey: taskDescriptionFieldMarkdownLabels.italic,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(taskDescriptionFieldMarkdownLabels.italic)
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.italic}
        </Button>
      ),
    },
    {
      key: "3",
      searchKey: taskDescriptionFieldMarkdownLabels.strikethrough,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(
              taskDescriptionFieldMarkdownLabels.strikethrough
            )
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.strikethrough}
        </Button>
      ),
    },
    {
      key: "4",
      searchKey: taskDescriptionFieldMarkdownLabels.inlineCode,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(
              taskDescriptionFieldMarkdownLabels.inlineCode
            )
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.inlineCode}
        </Button>
      ),
    },
    {
      key: "5",
      searchKey: taskDescriptionFieldMarkdownLabels.link,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(taskDescriptionFieldMarkdownLabels.link)
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.link}
        </Button>
      ),
    },
    {
      key: "6",
      searchKey: taskDescriptionFieldMarkdownLabels.headingOne,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(
              taskDescriptionFieldMarkdownLabels.headingOne
            )
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.headingOne}
        </Button>
      ),
    },
    {
      key: "7",
      searchKey: taskDescriptionFieldMarkdownLabels.headingTwo,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(
              taskDescriptionFieldMarkdownLabels.headingTwo
            )
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.headingTwo}
        </Button>
      ),
    },
    {
      key: "8",
      searchKey: taskDescriptionFieldMarkdownLabels.headingThree,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(
              taskDescriptionFieldMarkdownLabels.headingThree
            )
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.headingThree}
        </Button>
      ),
    },
    {
      key: "9",
      searchKey: taskDescriptionFieldMarkdownLabels.headingFour,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(
              taskDescriptionFieldMarkdownLabels.headingFour
            )
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.headingFour}
        </Button>
      ),
    },
    {
      key: "10",
      searchKey: taskDescriptionFieldMarkdownLabels.headingFive,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(
              taskDescriptionFieldMarkdownLabels.headingFive
            )
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.headingFive}
        </Button>
      ),
    },
    {
      key: "11",
      searchKey: taskDescriptionFieldMarkdownLabels.headingSix,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(
              taskDescriptionFieldMarkdownLabels.headingSix
            )
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.headingSix}
        </Button>
      ),
    },
    {
      key: "12",
      searchKey: taskDescriptionFieldMarkdownLabels.numericList,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(
              taskDescriptionFieldMarkdownLabels.numericList
            )
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.numericList}
        </Button>
      ),
    },
    {
      key: "13",
      searchKey: taskDescriptionFieldMarkdownLabels.bulletedList,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(
              taskDescriptionFieldMarkdownLabels.bulletedList
            )
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.bulletedList}
        </Button>
      ),
    },
    {
      key: "14",
      searchKey: taskDescriptionFieldMarkdownLabels.quote,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(taskDescriptionFieldMarkdownLabels.quote)
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.quote}
        </Button>
      ),
    },
    {
      key: "15",
      searchKey: taskDescriptionFieldMarkdownLabels.codeBlock,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(taskDescriptionFieldMarkdownLabels.codeBlock)
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.codeBlock}
        </Button>
      ),
    },
    {
      key: "16",
      searchKey: taskDescriptionFieldMarkdownLabels.divider,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(taskDescriptionFieldMarkdownLabels.divider)
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.divider}
        </Button>
      ),
    },
    {
      key: "17",
      searchKey: taskDescriptionFieldMarkdownLabels.image,
      label: (
        <Button
          onClick={() =>
            handleCopyMarkdownText(taskDescriptionFieldMarkdownLabels.image)
          }
          icon={<CopyOutlined />}
          block
        >
          {taskDescriptionFieldMarkdownLabels.image}
        </Button>
      ),
    },
  ];

  const { searchedData } = useGetSearchedDataByKey<IMarkdownListElement>({
    data: markdownListElements,
    searchValue: searchMarkdownElementValue,
    searchKey: "searchKey",
  });

  const onChangeSearchMarkdownValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchMarkdownElementValue(event.target.value);
  };

  const popoverContent = (
    <div className={styles.markdownBlocksListWrapper}>
      {!searchedData.length && (
        <Empty description="No markdown list elements." />
      )}

      {searchedData.map((markdownElement) => (
        <Tooltip key={markdownElement.key} title="Copy">
          {markdownElement.label}
        </Tooltip>
      ))}
    </div>
  );

  const popoverTitle = (
    <>
      <Typography.Text>Markdown list elements</Typography.Text>
      <Input
        className={styles.markdownBlocksSearchInput}
        value={searchMarkdownElementValue}
        placeholder="Search markdown list element..."
        onChange={onChangeSearchMarkdownValue}
        allowClear
      />
    </>
  );

  return (
    <Popover content={popoverContent} title={popoverTitle} placement="leftTop">
      <Button type="primary" icon={<BarsOutlined />} />
    </Popover>
  );
};
