import { FixturaContainer } from "@/components/containers/containers";
/* import SectionMatchWriteups from "@/components/sections/server/SectionMatchWriteups";
import SectionVideos from "@/components/sections/server/SectionVideos";
import SectionImages from "@/components/sections/server/SectionImages"; */
import SectionTop5 from "@/components/sections/server/SectionTop5";

export default async function Opage({ params }) {
  console.log("Page.js - Upage");
  return (
    <FixturaContainer>
      <SectionTop5 params={params}  Type={`statistics`} GroupBy={decodeURIComponent(params.key)}/>
    </FixturaContainer>
  );  
}     