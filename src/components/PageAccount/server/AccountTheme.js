import { H } from "@/components/Type/Headers";
import { FixturaPaper } from "@/components/containers/paper";
import { P } from "@/components/Type/Paragraph";
import { getThemeFromAccount } from "@/api/theme";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaStack } from "@/components/containers/stack";
import { SectionHeaderWithSubHeader } from "@/layouts/Headings/SectionHeaderWithSubHeader";
import { FixturaComponent } from "@/components/containers/containers";

export default async function AccountTheming({ params }) {
  const AccountTheme = await getThemeFromAccount(params.id);
  return (
    <FixturaComponent>
      <SectionHeaderWithSubHeader Main="THEMES" Sub={`THEMES`} />

      <FixturaPaper>
        <P>
          Tailor the look and feel of your Fixtura account according to your
          preferences. Choose a template, select a theme, and decide whether or
          not to include audio in your selections.
        </P>
        <FixturaGroup position="apart" align="flex-start" grow>
          <FixturaStack>
            <H size="h6">Template</H>
            {AccountTheme.temp.data === null ? (
              "no template"
            ) : (
              <FixturaBox>{AccountTheme.temp.data.attributes.Name}</FixturaBox>
            )}
          </FixturaStack>
          <FixturaStack>
            <H size="h6">Theme</H>
            {AccountTheme.theme.data === null ? (
              "no theme"
            ) : (
              <FixturaBox>{AccountTheme.theme.data.attributes.Name}</FixturaBox>
            )}
          </FixturaStack>
          <FixturaStack>
            <H size="h6">Audio</H>
            {AccountTheme.audio.data === null ? (
              "no audio_option"
            ) : (
              <FixturaBox>{AccountTheme.audio.data.attributes.Name}</FixturaBox>
            )}
          </FixturaStack>
        </FixturaGroup>
      </FixturaPaper>
    </FixturaComponent>
  );
}
