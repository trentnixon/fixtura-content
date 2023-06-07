"use client";
import { Button, ScrollArea, Table } from "@mantine/core";
import { getTeamNamesFromGameObj } from "@/utils/actions";
import Link from "next/link";
export default async function ViewGamesTable({ DATA, params }) {
  console.log(params);
  return (
    <ScrollArea h={500} type="always" offsetScrollbars scrollbarSize={2}>
      <Table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Assets</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(DATA).map((gameId) => {
            const TeamNames = getTeamNamesFromGameObj(
              DATA[gameId][0].attributes.game_meta_datum
            );
            return (
              <tr key={gameId}>
                <td>{TeamNames}</td>
                <td>{DATA[gameId].length}</td>
                <td>
                  <Link href={`${params.id}/${params.render}/u/m/${DATA[gameId][0].attributes.game_meta_datum.data.id}`} passHref>
                    <Button>Visit</Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
