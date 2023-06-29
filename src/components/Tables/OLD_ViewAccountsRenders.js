"use client";
import { H } from "@/components/Type/Headers";
import { P, S } from "@/components/Type/Paragraph";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaPaper } from "@/components/containers/paper";
import { DateFromTo } from "@/utils/actions";
import {
  Button,
  Grid,
  Group,
  Select,
  Stack,
  Table,
  useMantineTheme,
} from "@mantine/core";
import { IconCalendar, IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export const RenderTable = ({ RENDERS, params }) => {
  const [sortType, setSortType] = useState("desc");

  const theme = useMantineTheme();
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
    <Stack>
      <Group position="apart">
        <H size="h5" align="left">
          Renders
        </H>
        <P>{`${RENDERS.length} Available`}</P>
      </Group>
      <Grid>
        <Grid.Col span={1}>
          <IconInfoCircle color={theme.colors.orange[5]} />
        </Grid.Col>
        <Grid.Col span={11}>
          <P>
            Scroll through the list and select a render based on the date
            provided. You have the flexibility to review, copy, and download
            assets from upcoming games, past game results, or statistics.
          </P>
        </Grid.Col>
      </Grid>

      <FixturaPaper>
        <Group position="right">
          <Select
            label=""
            placeholder="Order By"
            value={sortType}
            onChange={setSortType}
            data={[
              { value: "asc", label: "Date (oldest to newest)" },
              { value: "desc", label: "Date (newest to oldest)" },
            ]}
          />
        </Group>
        <Table>
          <thead>
            <tr>
              <th>Dates</th>
              <th>From</th>
              <th>To</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {RENDERS.sort(sortRenders).map((render, i) => {
              return (
                <tr key={`option_${i}`} id={render.id} value={render.id}>
                  <td>
                    <IconCalendar color={theme.colors.orange[7]} />
                  </td>
                  <td>{DateFromTo(render.attributes.createdAt)[0]}</td>
                  <td>{DateFromTo(render.attributes.createdAt)[1]}</td>
                  <td>
                    <Link passHref href={`/${params.id}/${render.id}`}>
                      <Button variant="outline">Review</Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </FixturaPaper>
      <FixturaBox c={4}>
        <Grid>
          <Grid.Col span={1}>
            <IconInfoCircle color={theme.colors.blue[5]} />
          </Grid.Col>
          <Grid.Col span={11}>
            <P c={"dark"}>
              To select a render, simply locate the one you are interested in
              using the date listed. Once selected, you&rsquo;ll have the
              options to review its details, copy any relevant information, or
              even download any associated assets. This applies to all upcoming
              games, previous game results, as well as any statistical assets.
            </P>
          </Grid.Col>
        </Grid>
      </FixturaBox>
    </Stack>
  );
};
