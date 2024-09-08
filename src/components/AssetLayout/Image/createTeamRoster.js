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
import { FixturaPaper } from "@/components/containers/paper";
import { ImageGalleryForAssets } from "@/components/AssetLayout/Image/createImages";
import { RoundedSectionContainer } from "@/components/containers/containers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";

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
  hasTeamRosterRequest,
  requestInitiated,
  handleRequestClick,
  requestStatus,
  error,
}) => {
  const dayOfWeek = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const allowedDays = ["thursday", "friday", "saturday", "sunday", "monday"];
  const isButtonAccessible = allowedDays.includes(dayOfWeek);

  if(hasTeamRosterRequest && !hasRosters)
      return(
        <>We are currently processing your Team Rosters, Please check back later.</>
      )
  return (
    <>

      {!hasRosters && !requestInitiated && <InitialBox />}
      {!requestInitiated &&
        isButtonAccessible &&
        (hasRosters ? (
          <>
            <RoundedSectionContainer
              title={""}
              topContent={<RostersCreatedBox />}
              bottomContent={
                <FixturaGRIDOUTER>
                  <FixturaGRIDCOL span={12}>
                    <ImageGalleryForAssets />
                  </FixturaGRIDCOL>
                </FixturaGRIDOUTER>
              }
            />
          </>
        ) : (
          <RequestButtonBox
            handleRequestClick={handleRequestClick}
            requestStatus={requestStatus}
            error={error}
            hasRosters={hasRosters}
            requestInitiated={requestInitiated}
          />
        ))}

      {requestInitiated && <ProcessingBox />}
    </>
  );
};

const InitialBox = () => (
  <>
    <P c={"gray.8"} ta={`left`} my={"sm"}>
      Create sleek team roster graphics for every team in the club.
    </P>
    <P c={"gray.8"} ta={`left`} my={"sm"}>
      This service is only available once per week/bundle.
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
  <FixturaGroup position={"left"} my={5} py={5}>
    <IconCheck size={50} stroke={2} color={"#3ba776"} />
    <Stack justify="flex-start" spacing={0}>
      <H size={"h5"} color={"green.7"} ta={`left`}>
        Rosters created!
      </H>
    </Stack>
  </FixturaGroup>
);

const RequestButtonBox = ({ handleRequestClick, requestStatus }) => (
  <RoundedSectionContainer
    title={""}
    topContent={
      <FixturaGroup position={"Left"} my={5} py={5}>
        <H size={"h5"} ta={`left`}>
          Create Weekly Team Rosters
        </H>
      </FixturaGroup>
    }
    bottomContent={
      <RequestButtonWithConfirmation
        onConfirm={handleRequestClick}
        disabled={requestStatus !== null}
        isLoading={requestStatus === "pending"}
      />
    }
  />
);

const FooterNote = () => (
  <FixturaPaper c={0} shadow={"none"} mx={30}>
    <P c={"gray.7"} ta={"center"} my={15}>
      This feature is currently in Beta, meaning some things may not always
      appear or work as expected. Should you run into any issues, please contact
      us on Facebook for assistance.
    </P>
  </FixturaPaper>
);

export const RequestTeamRosterForRender = ({ Render, CompleteRender }) => {
  const { requestStatus, error, requestTeamRoster } = useRequestTeamRoster();
  const [requestInitiated, setRequestInitiated] = useState(false);
  const hasRosters = CompleteRender.attributes.hasTeamRosters;
  const hasTeamRosterRequest = CompleteRender.attributes.hasTeamRosterRequest;
  localStorage.removeItem(`requestInitiated-${Render}`);
  useEffect(() => {
    const storedState = localStorage.getItem(`requestInitiated-${Render}`);
    //console.log("storedState ", storedState)
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
        hasTeamRosterRequest={hasTeamRosterRequest}
        requestInitiated={requestInitiated}
        handleRequestClick={handleRequestClick}
        requestStatus={requestStatus}
        error={error}
      />
      <FooterNote />
    </>
  );
};
