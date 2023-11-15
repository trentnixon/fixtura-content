import { P, S } from "@/components/Type/Paragraph";
import { FixturaPaper } from "@/components/containers/paper";
import { Select, Space, rem } from "@mantine/core";

export function SelectArticleType({ setVersion, version, ArticleSet }) {
  // Transform ArticleSet into options for the Select component
  const options = ArticleSet.map((type, index) => ({
    value: String(index), // value must be a string
    label: type.asset.ArticleFormats,
  }));

  return (
    <Select
      data={options}
      value={String(version)}
      onChange={(value) => setVersion(Number(value))}
      // You can add additional styling here if needed
    />
  );
}
