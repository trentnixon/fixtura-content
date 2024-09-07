import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { Divider } from "@mantine/core";
import { useEffect } from "react";

export const WeekendWrapUp = ({ selectedArticle, copyID }) => {

    useEffect(() => {}, [selectedArticle]);

  if (!selectedArticle[0]) return null;
  return (
    <div id={copyID}>
      {selectedArticle[0].map((result, i) => {
        return (
          <div key={result.team1}>
            <P my="md" lh="1.3" fw="900">
              {result.subtitle}
            </P>
            <H size="h5" lh="1.1" my="md">
              {result.team1} {result.score1} vs {result.team2} {result.score2}
            </H>

            <P my="md" lh="1.3">
              {result.highlights}
            </P>
            <Divider my="md" />
          </div>
        );
      })}
    </div>
  );
};
