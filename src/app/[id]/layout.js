import { ContentShell } from "@/layouts/AppShell";
import { CookieCutter } from "@/utils/cookiecutter";

export default async function RootLayout({ children }) {
  return (
    <ContentShell>
      <CookieCutter>
        <main>{children}</main>
      </CookieCutter>
    </ContentShell>
  ); 
}