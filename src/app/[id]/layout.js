import { ContentShell } from "@/layouts/AppShell";
import { CookieCutter } from "@/utils/cookiecutter";
export default async function RootLayout({ children, params }) {

  return (
    <ContentShell params={params}>
      <CookieCutter>
        <main>{children}</main>
      </CookieCutter>
    </ContentShell>
  );
}
