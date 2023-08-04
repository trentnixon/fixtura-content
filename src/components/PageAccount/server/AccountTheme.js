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
      <SectionHeaderWithSubHeader Main="THEMES" Sub={`Selected Design`} />
      <FixturaPaper>
        <FixturaStack>
          <FixturaGroup grow={true} w={"100%"}>
            <H size="h6">Template : </H>
            {AccountTheme.temp.data === null ? (
              "no template"
            ) : (
              <P fz={'sm'}>{AccountTheme.temp.data.attributes.Name}</P>
            )}
          </FixturaGroup>
          <FixturaGroup grow={true} w={"100%"}>
            <H size="h6">Theme : </H>
            {AccountTheme.theme.data === null ? (
              "no theme"
            ) : (
              <P fz={'sm'}>{AccountTheme.theme.data.attributes.Name}</P>
            )}
          </FixturaGroup>
          <FixturaGroup grow={true} w={"100%"}>
            <H size="h6">Audio : </H>
            {AccountTheme.audio.data === null ? (
              "no audio_option"
            ) : (
              <P fz={'sm'}>{AccountTheme.audio.data.attributes.Name}</P>
            )}
          </FixturaGroup>
        </FixturaStack>
      </FixturaPaper>
    </FixturaComponent>
  );
}
