"use client";
import {  Table } from "@mantine/core";
import { getTeamNamesFromGameObj } from "@/utils/actions";
import { P, S } from "@/components/Type/Paragraph";
import { H } from "@/components/Type/Headers";
import { FixturaBox } from "@/components/containers/boxes";
import { BUTTON_LINK } from "@/components/UI/buttons";

export default async function ViewGamesTable({ DATA, params,assetType,path='u' }) {

  //console.log(DATA)
  return (
    <>
      <H size="h6" align="right">
        MATCHES
      </H>
      <S ta="right" fw={400}>
        {Object.keys(DATA).length} Matches available in this render
      </S>
      <FixturaBox>
        <Table>
          <thead>
            <tr> 
              <th>Match</th>
              <th>Articles</th> 
              <th></th> 
            </tr>
          </thead>
          <tbody>
            {Object.keys(DATA).map((gameId) => {
              const TeamNames = getTeamNamesFromGameObj( 
                DATA[gameId][assetType][0].attributes.game_meta_datum
              );
              return (
                <tr key={gameId}>
                  <td>
                    <P>{TeamNames}</P>
                  </td>
                  <td>
                    <P>{DATA[gameId][assetType].length}</P>
                  </td>
                  <td>
                    <BUTTON_LINK
                      Label="Read"
                      href={`${params.id}/${params.render}/${path}/m/${DATA[gameId][assetType][0].attributes.game_meta_datum.data.id}`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </FixturaBox>
    </>
  );
}
