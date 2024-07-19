import { Typography } from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import styles from "./MarkdownPreview.module.scss";

interface IMarkdownPreviewProps {
  markdownValue: string;
}

export const MarkdownPreview = (props: IMarkdownPreviewProps) => {
  const { markdownValue } = props;

  return (
    <>
      <Typography.Text className={styles.markdownPreviewTitle}>
        Preview
      </Typography.Text>

      <Markdown
        className={styles.markdownPreviewWrapper}
        remarkPlugins={[remarkGfm]}
      >
        {markdownValue}
      </Markdown>
    </>
  );
};
