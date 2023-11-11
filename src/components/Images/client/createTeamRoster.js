"use client";

import { useState } from "react";
import { BUTTON_FUNC } from "@/components/UI/buttons";
import { FixturaGroup } from "@/components/containers/Group";
import { useRequestTeamRoster } from "@/Hooks/useRequestTeamRoster";
import { FixturaBox } from "@/components/containers/boxes";
import { P, S } from "@/components/Type/Paragraph";
import { H } from "@/components/Type/Headers";
import { Badge, Stack, Modal, Button } from "@mantine/core";
import { IconCheck, IconDownload } from "@tabler/icons-react";
import { FixturaPaper } from "@/components/containers/paper";

const RequestButtonWithConfirmation = ({ onConfirm, disabled, isLoading }) => {
  const [confirmMode, setConfirmMode] = useState(false);

  const handleInitialClick = () => {
    setConfirmMode(true);
  };

  const handleConfirmClick = () => {
    onConfirm();
    setConfirmMode(false); // Assuming we want to reset after confirmation
  };

  if (isLoading) {
    // Assuming you want to show some loading state
    return <div>Loading...</div>;
  }

  return (
    <>
      {!confirmMode ? (
        <BUTTON_FUNC
          Label="Generate Team Rosters"
          onClick={handleInitialClick}
          Color="cyan" // Set the color you want for the button
          Icon={false} // Set the icon if needed
          disabled={disabled}
        />
      ) : (
        <Stack>
          <P>
            You can only do this once for this bundle. Confirm to generate the
            team rosters.
          </P>
          <BUTTON_FUNC
            Label="Confirm"
            onClick={handleConfirmClick}
            Color="green" // Set the color for the confirmation button
            Icon={<IconCheck size="1.125rem" stroke={2} />} // Set the icon for the confirmation button
            disabled={disabled}
          />
        </Stack>
      )}
    </>
  );
};

export const RequestTeamRosterForRender = ({ Render, CompleteRender }) => {
  const { requestStatus, error, requestTeamRoster } = useRequestTeamRoster();

  const handleRequestClick = () => {
    requestTeamRoster(Render.id);
  };

  const hasRosters = CompleteRender.attributes.hasTeamRosters;

  // Determine the current day of the week
  const dayOfWeek = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const allowedDays = ["thursday", "friday", "saturday","sunday"];
  const isButtonAccessible = allowedDays.includes(dayOfWeek);

  console.log("isButtonAccessible", isButtonAccessible);
  return (
    <>
      <FixturaGroup position={"apart"} my={5} py={5}>
        <Stack justify="flex-start" spacing={0}>
          <H color={"orange.7"} lh={1} size="h5">
            NEW
          </H>
          <H lh={1}>Create Team Rosters</H>
        </Stack>
        <Badge color="orange">Beta</Badge>
      </FixturaGroup>
      <FixturaPaper my={15}>
        {!hasRosters && (
          <FixturaBox baseColor={"green"} c={0}>
            <P fw={800} c={"gray.8"} ta={`center`}>
            Instantly create sleek team roster graphics for every team in the club.

            </P>
            <P c={"gray.8"} ta={`center`}>
            Instantly create sleek team roster graphics for every team in the club.

            </P>
            <P c={"gray.8"} ta={`center`}>
            This service is only available once per week\/bundle. We&#39;ll notify you when they&#39;re ready for showcase.

            </P>
          </FixturaBox>
        )}

        {isButtonAccessible ? (
          hasRosters ? (
            <FixturaGroup position={"center"} my={5} py={5}>
              <IconCheck size={50} stroke={2} color={"#3ba776"} />
              <Stack justify="flex-start" spacing={0}>
                <H size={"h3"} color={"green.7"} ta={`left`}>
                  Rosters created!
                </H>
                <P c={"gray.8"} ta={`left`}>
                  Select the upcoming option under the Age group you wish to
                  find, and then go to Images to find the rosters.
                </P>
              </Stack>
            </FixturaGroup>
          ) : (
            <FixturaGroup position={"center"} my={5} py={5}>
              <Stack>
                <RequestButtonWithConfirmation
                  onConfirm={handleRequestClick}
                  disabled={requestStatus !== null}
                  isLoading={requestStatus === "pending"}
                />
                <div>
                  {error && <P c={"red.5"}>Error: {error}</P>}
                  {requestStatus === "success" && (
                    <P>Request sent successfully!</P>
                  )}
                </div>
              </Stack>
            </FixturaGroup>
          )
        ) : (
          <>
            <P c={"gray.7"} ta={`center`} my={15}>
              Hang tight! The Player Roster feature is only available on these
              selected days.
            </P>

            {allowedDays.map((day, i) => {
              return (
                <P
                  key={i}
                  tt="uppercase"
                  c={"gray.7"}
                  ta={`center`}
                  fw={800}
                  my={10}
                >
                  {day}
                </P>
              );
            })}
            <P c={"gray.7"} ta={`center`} my={15}>
              We look forward to seeing your teams in the spotlight soon!
            </P>
          </>
        )}
      </FixturaPaper>
      <S c={"gray.7"} ta={"left"} my={15}>
        This feature is currently in Beta, meaning some things may not always
        appear or work as expected. Should you run into any issues, please
        contact us on Facebook for assistance.
      </S>
    </>
  );
};
