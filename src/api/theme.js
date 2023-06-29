import { getAccountFields } from "@/api/accounts";
import { fetcher } from "@/utils/fetcher";

export async function getTheme(ACC) {
  /* console.log(
    "ACC",
    ACC.theme.data.id,
    ACC.template.data.id,
    ACC.audio_option.data.id
  ); */

  const [temp, theme, audio] = await Promise.all([
    fetcher({ PATH: `templates/${ACC.template.data.id}` }),
    fetcher({ PATH: `themes/${ACC.theme.data.id}` }),
    fetcher({ PATH: `audio-options/${ACC.audio_option.data.id}` }),
  ]);

  return { temp, theme, audio };
}

export async function getThemeFromAccount(ID) {
  // getAccountFields
  const ACC = await getAccountFields(ID, ["theme", "template", "audio_option"]);
  //console.log("getThemeFromAccount ", ACC.attributes);

  return await getTheme(ACC.attributes);
}