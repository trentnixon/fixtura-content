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
        Type={`upcoming`}
        Path={`upcoming_games_in_renders`}
      /> 
      <SectionVideos
        params={params} 
        Title={`Upcoming Videos`}
        Type={`upcoming`}
        Path={`upcoming_games_in_renders`}
      />
      <SectionImages
        params={params}
        Title={`Upcoming Images`}
        Type={`upcoming`}
      />
    </FixturaContainer>
  );
}