"use client";
import { useEffect, useState } from "react";
import { Badge, Stack } from "@mantine/core";
import {
  IconBulldozer,
  IconCheck,
  IconInfoHexagonFilled,
} from "@tabler/icons-react";
// API
import { useRequestTeamRoster } from "@/Hooks/useRequestTeamRoster";

//components
import { BUTTON_FUNC } from "@/components/UI/buttons";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaBox } from "@/components/containers/boxes";
import { P, S } from "@/components/Type/Paragraph";
import { H } from "@/components/Type/Headers";

const Header = () => (
  <FixturaGroup position={"apart"} my={5} py={5}>
    <Stack justify="flex-start" spacing={0}>
      <H color={"orange.7"} lh={1} size="h5">
        NEW
      </H>
      <H lh={1}>Team Rosters</H>
    </Stack>
    <Badge color="orange">Beta</Badge>
  </FixturaGroup>
);

const RequestButtonWithConfirmation = ({ onConfirm, disabled, isLoading }) => {
  const [confirmMode, setConfirmMode] = useState(false);

  const handleInitialClick = () => {
    setConfirmMode(true);
  };

  const handleConfirmClick = () => {
    onConfirm();
    setConfirmMode(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!confirmMode ? (
        <BUTTON_FUNC
          Label="Generate Team Rosters"
          onClick={handleInitialClick}
          Color="cyan"
          Icon={false}
          disabled={disabled}
        />
      ) : (
        <Stack>
          <P c={"gray.8"} ta={`center`} fw={800}>
            Attention: This action can be performed only once per bundle.
          </P>
          <P c={"gray.8"} ta={`center`}>
            Make sure that all Rosters are saved in PlayHQ before you proceed.
          </P>

          <BUTTON_FUNC
            Label="Confirm Action"
            onClick={handleConfirmClick}
            Color="green"
            Icon={<IconCheck size="1.125rem" stroke={2} />}
            disabled={disabled}
          />
        </Stack>
      )}
    </>
  );
};

const MainContent = ({
  hasRosters,
  requestInitiated,
  handleRequestClick,
  requestStatus,
  error,
}) => {
  const dayOfWeek = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const allowedDays = [
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const isButtonAccessible = allowedDays.includes(dayOfWeek);

  return (
    <>
      {!requestInitiated &&
        isButtonAccessible &&
        (hasRosters ? (
          <RostersCreatedBox />
        ) : (
          <RequestButtonBox
            handleRequestClick={handleRequestClick}
            requestStatus={requestStatus}
            error={error}
          />
        ))}
      {!hasRosters && !requestInitiated && <InitialBox />}
      {requestInitiated && <ProcessingBox />}
    </>
  );
};

const InitialBox = () => (
  <>
    <P fw={800} c={"gray.8"} ta={`left`}>
      Create sleek team roster graphics for every team in the club.
    </P>
    <P c={"gray.8"} ta={`left`}>
      This service is only available once per week/bundle. We&apos;ll notify you
      when they&apos;re ready for showcase.
    </P>
  </>
);

const ProcessingBox = () => (
  <FixturaBox baseColor={"blue"} c={0}>
    <FixturaGroup position={"center"} my={5} py={5}>
      <IconBulldozer size={60} stroke={1} color={"#3ba776"} />
      <P fw={800} c={"gray.8"} ta={`center`}>
        Now Processing!
      </P>
    </FixturaGroup>

    <P c={"gray.9"} ta={`center`}>
      Your request to generate team rosters has been successfully sent and is
      now being processed.
    </P>
    <P c={"gray.9"} ta={`center`}>
      This may take a few moments. You will be notified via email once the
      rosters are ready.
    </P>

    <FixturaGroup position={"center"} my={5} py={5}>
      <IconInfoHexagonFilled size={40} stroke={1} color={"blue"} />
      <FixturaBox w={"80%"} baseColor={"blue"} c={0}>
        <S ta={`left`} my={25}>
          Note: this action will generate a new security code for this page.
          Once this action has been completed, this tab will no longer be
          accessible. Please use the link sent to you via email, or log into the
          admin to get your new secure link.
        </S>
      </FixturaBox>
    </FixturaGroup>
  </FixturaBox>
);

const RostersCreatedBox = () => (
  <FixturaGroup position={"center"} my={5} py={5}>
    <IconCheck size={50} stroke={2} color={"#3ba776"} />
    <Stack justify="flex-start" spacing={0}>
      <H size={"h3"} color={"green.7"} ta={`left`}>
        Rosters created!
      </H>
      <P c={"gray.8"} ta={`left`}>
        Select the upcoming option under the Age group you wish to find, and
        then go to Images to find the rosters.
      </P>
    </Stack>
  </FixturaGroup>
);

const RequestButtonBox = ({ handleRequestClick, requestStatus, error }) => (
  <FixturaGroup position={"center"} my={5} py={5}>
    <Stack>
      <RequestButtonWithConfirmation
        onConfirm={handleRequestClick}
        disabled={requestStatus !== null}
        isLoading={requestStatus === "pending"}
      />
      <div>
        {error && <P c={"red.5"}>Error: {error}</P>}
        {requestStatus === "success" && <P>Request sent successfully!</P>}
      </div>
    </Stack>
  </FixturaGroup>
);

const FooterNote = () => (
  <S c={"gray.7"} ta={"left"} my={15}>
    This feature is currently in Beta, meaning some things may not always appear
    or work as expected. Should you run into any issues, please contact us on
    Facebook for assistance.
  </S>
);

export const RequestTeamRosterForRender = ({ Render, CompleteRender }) => {
  const { requestStatus, error, requestTeamRoster } = useRequestTeamRoster();
  const [requestInitiated, setRequestInitiated] = useState(false);
  const hasRosters = CompleteRender.attributes.hasTeamRosters;

  useEffect(() => {
    const storedState = localStorage.getItem(`requestInitiated-${Render}`);
    if (storedState === "true") {
      setRequestInitiated(true);
    }
  }, [Render]);

  useEffect(() => {
    if (hasRosters && requestInitiated) {
      localStorage.removeItem(`requestInitiated-${Render}`);
      setRequestInitiated(false);
    }
  }, [hasRosters, requestInitiated, Render]);

  const handleRequestClick = () => {
    localStorage.setItem(`requestInitiated-${Render}`, "true");
    setRequestInitiated(true);
    requestTeamRoster(Render);
  };

  return (
    <>
      <Header />
      <MainContent
        hasRosters={hasRosters}
        requestInitiated={requestInitiated}
        handleRequestClick={handleRequestClick}
        requestStatus={requestStatus}
        error={error}
      />
      <FooterNote />
    </>
  );
};
