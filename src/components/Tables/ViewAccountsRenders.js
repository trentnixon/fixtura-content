"use client";
import { H } from "@/components/Type/Headers";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaPaper } from "@/components/containers/paper";
import { DateFromTo } from "@/utils/actions";
import { Button, Group, Stack, Table } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import Link from "next/link";

export const RenderTable = ({ RENDERS, params }) => {
  return (
    <Stack>
      <H size="h5" align="right">
        Select a Render
      </H>
      <FixturaPaper>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>From</th>
              <th>To</th>
              <th>Select</th>
            </tr>
          </thead>

          <tbody>
            {RENDERS.map((render, i) => {
              return (
                <tr key={`option_${i}`} id={render.id} value={render.id}>
                  <td>
                    <IconCalendar />
                  </td>
                  <td>{DateFromTo(render.attributes.createdAt)[0]}</td>
                  <td>{DateFromTo(render.attributes.createdAt)[1]}</td>
                  <td>
                    <Link passHref href={`/${params.id}/${render.id}`}>
                      <Button variant="outline">View</Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </FixturaPaper>
    </Stack>
  );
};
