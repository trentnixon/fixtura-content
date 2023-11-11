"use client";

import { useEffect, useState } from "react";
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
  const [requestInitiated, setRequestInitiated] = useState(false);

  useEffect(() => {
    // Check local storage for the request state
    const storedState = localStorage.getItem(`requestInitiated-${Render}`);
    if (storedState === "true") {
      setRequestInitiated(true);
    }
  }, [Render]);

  const handleRequestClick = () => {
    localStorage.setItem(`requestInitiated-${Render}`, "true");
    setRequestInitiated(true);
    requestTeamRoster(Render);
  };

  const hasRosters = CompleteRender.attributes.hasTeamRosters;
  const dayOfWeek = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const allowedDays = ["thursday", "friday", "saturday", "sunday"];
  const isButtonAccessible = allowedDays.includes(dayOfWeek);

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
        {!hasRosters && !requestInitiated && (
          <FixturaBox baseColor={"green"} c={0}>
            <P fw={800} c={"gray.8"} ta={`center`}>
              Instantly create sleek team roster graphics for every team in the
              club.
            </P>
            <P c={"gray.8"} ta={`center`}>
              This service is only available once per week/bundle. We&apos;ll
              notify you when they&apos;re ready for showcase.
            </P>
          </FixturaBox>
        )}
        {requestInitiated && (
          <FixturaBox baseColor={"blue"} c={0}>
            <P fw={800} c={"gray.8"} ta={`center`}>
              Now Processing!
            </P>
            <P c={"gray.9"} ta={`center`}>
              Your request to generate team rosters has been successfully sent
              and is now being processed.
            </P>
            <P c={"gray.9"} ta={`center`}>
              This may take a few moments. You will be notified via email once the rosters
              are ready.
            </P>
          </FixturaBox>
        )}

        {!requestInitiated &&
          isButtonAccessible &&
          (hasRosters ? (
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
          ))}
      </FixturaPaper>

      <S c={"gray.7"} ta={"left"} my={15}>
        This feature is currently in Beta, meaning some things may not always
        appear or work as expected. Should you run into any issues, please
        contact us on Facebook for assistance.
      </S>
    </>
  );
};
