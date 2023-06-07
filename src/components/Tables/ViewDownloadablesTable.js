"use client";
import { Button, ScrollArea, Table } from "@mantine/core";

export default async function ViewDownloadablesTable({ DATA }) {
  console.log(DATA);
  return (
    <>
      <ScrollArea h={250} type="always" offsetScrollbars scrollbarSize={2}>
        <Table>
          <thead>
            <tr>
              <th>Assets</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(DATA).map((Download, i) => {
              console.log(DATA[Download]);
              return (
                <tr key={DATA[Download].id}>
                  <td>
                    {DATA[Download].attributes.asset.data.attributes.Name}
                  </td>
                  <td>
                    <Button>View</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
