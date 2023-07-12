//import { FixturaPageHeader } from "@/layouts/Headings/PageHeader";
import { HeroText } from "@/layouts/Headings/server/Heros";
//import Header_RenderDates from "@/layouts/Headings/server/Header_RenderDates";

export default async function RootLayout({ children, params }) {
  return (
    <>
      <HeroText params={params} />
      {children} 
    </>
  );
}

/*   <Header_RenderDates params={params} />
      <FixturaPageHeader params={params} />*/
