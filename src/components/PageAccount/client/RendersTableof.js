"use client";
import { useState } from "react";
import { ICO_DOWNLOAD } from "@/components/UI/Icons";
import { FixturaPaper } from "@/components/containers/paper";
import { DateFromTo } from "@/utils/actions";
import { ActionIcon, Table, useMantineTheme } from "@mantine/core";

import { P } from "@/components/Type/Paragraph";
import { BUTTON_LINK_ICON } from "@/components/UI/buttons";
import { ProcessingLoader } from "@/components/UI/Loader";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconArticle,
  IconCalendarStats,
  IconDownload,
  IconIdBadge2,
  IconScoreboard,
} from "@tabler/icons-react";
import FixturaTooltip from "@/components/UI/ToolTip";

export const RendersTableof = async (props) => {
  const { OBJ } = props;
  const [sortType, setSortType] = useState("desc");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const theme = useMantineTheme();

  console.log(OBJ)
  return (
    <>
      <FixturaPaper c={0}>
        <Table>
          <thead>
            <tr>
              <th>
                <FixturaTooltip label="From">
                  <IconIdBadge2 size="1.5rem" color={theme.colors.cyan[5]} />
                </FixturaTooltip>
              </th>

              <th>
                <FixturaTooltip label="From">
                  <IconCalendarStats
                    size="1.5rem"
                    color={theme.colors.cyan[5]}
                  />
                </FixturaTooltip>
              </th>
              {!isMobile && (
                <>
                  <th>
                    <FixturaTooltip label="Games Included">
                      <IconScoreboard
                        size="1.5rem"
                        color={theme.colors.cyan[5]}
                      />
                    </FixturaTooltip>
                  </th>
                  <th>
                    <FixturaTooltip label="Articles">
                      <IconArticle size="1.5rem" color={theme.colors.cyan[5]} />
                    </FixturaTooltip>
                  </th>
                </>
              )}
              <th>
                <FixturaTooltip label="Media Downloads">
                  <IconDownload size="1.5rem" color={theme.colors.cyan[5]} />
                </FixturaTooltip>
              </th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {OBJ.RENDERS.map(async (render, i) => {
              return (
                <tr key={`option_${i}`} id={render.id} value={render.id}>
                  <td>
                    <P c="gray.9">
                      {DateFromTo(render.attributes.createdAt)[0]}
                    </P>
                  </td>
                  <td>
                    <P c="gray.9">
                      {DateFromTo(render.attributes.createdAt)[1]}
                    </P>
                  </td>
                  {!isMobile && (
                    <>
                      <td>
                        <P c="gray.9">{render.count?.GameCount.Total}</P>
                      </td>
                      <td>
                        <P c="gray.9">{render.count?.aiReports}</P>
                      </td>
                    </>
                  )}
                  <td>
                    <P c="gray.9">{render.count?.downloads}</P>
                  </td>

                  <td align="right">
                    {render.attributes.Complete ? (
                      isMobile ? (
                        <ActionIcon
                          component="a"
                          size="xl"
                          radius="md"
                          variant="outline"
                          href={`/${OBJ.params.id}/${OBJ.Sport}/${render.id}`}
                          sx={(theme) => ({
                            borderColor: theme.colors.cyan[6],
                            color: theme.colors.cyan[6],
                            cursor: "pointer",
                            "&:hover": {
                              background: theme.fn.linearGradient(
                                45,
                                theme.colors.blue[5],
                                theme.colors.cyan[5]
                              ),
                              color: theme.colors.gray[0],
                              borderColor: theme.colors.blue[6],
                            },
                          })}
                        >
                          <ICO_DOWNLOAD />
                        </ActionIcon>
                      ) : (
                        <BUTTON_LINK_ICON
                          href={`/${OBJ.params.id}/${OBJ.Sport}/${render.id}`}
                          icon={<ICO_DOWNLOAD />}
                          label="Review"
                        />
                      )
                    ) : (
                      <ProcessingLoader />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </FixturaPaper>
    </>
  );
};