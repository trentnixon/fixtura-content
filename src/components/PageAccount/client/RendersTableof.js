"use client";
import { useState } from "react";
import { RendersSelectBy } from "@/components/PageAccount/client/RendersSelectBy";
import { ICO_DOWNLOAD } from "@/components/UI/Icons";
import { FixturaPaper } from "@/components/containers/paper";
import { DateFromTo } from "@/utils/actions";
import { Center, Group, Table } from "@mantine/core";

import { P } from "@/components/Type/Paragraph";
import { BUTTON_LINK_ICON } from "@/components/UI/buttons";
import { ProcessingLoader } from "@/components/UI/Loader";

export const RendersTableof = async ({ RENDERS, params }) => {
  const [sortType, setSortType] = useState("desc");
  //console.log(RENDERS);
 
  // Function to handle sorting renders by date
  const sortRenders = (a, b) => {
    if (sortType === "desc") {
      return (
        new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
      );
    } else {
      return (
        new Date(a.attributes.createdAt) - new Date(b.attributes.createdAt)
      );
    }
  };

  return (
    <FixturaPaper c={7}>
      <Group position="right">
        <RendersSelectBy sortType={sortType} setSortType={setSortType} />
      </Group>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>
              <P c="white">From</P>
            </th>
            <th>
              <P c="white">To</P>
            </th>
            <th>
              <P c="white" ta="center">
                Review
              </P>
            </th>
          </tr>
        </thead>

        <tbody>
          {RENDERS.sort(sortRenders).map((render, i) => {
            //console.log(render.attributes.Complete);
            return (
              <tr key={`option_${i}`} id={render.id} value={render.id}>
                <td>
                  <ICO_DOWNLOAD />
                </td>
                <td>
                  <P c="white">{DateFromTo(render.attributes.createdAt)[0]}</P>
                </td>
                <td>
                  <P c="white">{DateFromTo(render.attributes.createdAt)[1]}</P>
                </td>
                <td>
                  <Center>
                    {render.attributes.Complete ? (
                      <BUTTON_LINK_ICON
                        href={`/${params.id}/${render.id}`}
                        icon={<ICO_DOWNLOAD />}
                        label="Review"
                      />
                    ) : (
                      <ProcessingLoader />
                    )}
                  </Center>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </FixturaPaper>
  );
};
