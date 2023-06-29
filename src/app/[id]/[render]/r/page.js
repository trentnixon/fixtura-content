import { FixturaContainer } from "@/components/containers/containers";
import SectionMatchWriteups from "@/components/sections/server/SectionMatchWriteups";
import SectionVideos from "@/components/sections/server/SectionVideos";
import SectionImages from "@/components/sections/server/SectionImages";

export default async function Upage({ params }) {
  console.log("Page.js - Upage");
  return (
    <FixturaContainer>
      <SectionMatchWriteups
        params={params}
        Title={`Upcoming Writeups`}
        Type={`results`}
      />
      <SectionVideos
        params={params}
        Title={`Results Videos`}
        Type={`results`}
      />

      <SectionImages
        params={params}
        Title={`Upcoming Images`} 
        Type={`results`}
      />
    </FixturaContainer>
  );
}