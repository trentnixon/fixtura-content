"use client";
import {  Table } from "@mantine/core";
import { getTeamNamesFromGameObj } from "@/utils/actions";
import { P, S } from "@/components/Type/Paragraph";
import { H } from "@/components/Type/Headers";
import { FixturaBox } from "@/components/containers/boxes";
import { BUTTON_LINK } from "@/components/UI/buttons";

export default async function ViewGamesTable({ DATA, assetType,PATH,folder='u' }) {

 
  if(DATA === undefined)
    return(<>No Games found</>)
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
                DATA[gameId][assetType.toLowerCase()][0].attributes.game_meta_datum
              );

            return (
                <tr key={gameId}>
                  <td>
                    <P>{TeamNames}</P>
                  </td>
                  <td>
                    <P>{DATA[gameId][assetType.toLowerCase()].length}</P>
                  </td>
                  <td>
                    <BUTTON_LINK
                      Label="Read"
                      href={`${PATH.id}/${PATH.render}/${folder}/m/${DATA[gameId][assetType.toLowerCase()][0].attributes.game_meta_datum.data.id}`}
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
