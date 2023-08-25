import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";

export  const AddSponsorsToArticle = ({ hasSponsors, ArticleFormats }) => {
  if (
    hasSponsors &&
    hasSponsors.length !== 0 &&
    ArticleFormats !== "Quick Single"
  )
    return (
      <>
        <H size={"h6"}>This fixture write-up was proudly brought to you by:</H>
        {hasSponsors.map((sponsor, i) => {
          console.log(sponsor.attributes.Name);
          return (
            <div key={i}>
              <P>{sponsor.attributes.Name}</P>
              <P>{sponsor.attributes.Tagline}</P>
              <P>{sponsor.attributes.Description}</P>
              <P>{sponsor.attributes.URL}</P>
            </div>
          );
        })}
      </>
    );
};

