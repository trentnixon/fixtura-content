// Removed unused import of useState
"use client";

import { BUTTON_ICON_FUNC } from "@/components/UI/buttons";
import { FixturaGroup } from "@/components/containers/Group";
import { IconDownload } from "@tabler/icons-react";
import { useRequestTeamRoster } from '@/Hooks/useRequestTeamRoster';

export const RequestTeamRosterForRender = ({ Render }) => {
    const { requestStatus, error, requestTeamRoster } = useRequestTeamRoster();

    const handleRequestClick = () => {
        requestTeamRoster(Render.id);
    };

    return (
        <FixturaGroup position={"right"} my={5} py={5}>
            <BUTTON_ICON_FUNC
                size={"md"}
                label="Request Team Roster" // Updated label to reflect actual action
                onClick={handleRequestClick}
                Icon={<IconDownload size="1.125rem" stroke={2} />}
                loading={requestStatus === 'pending'}
                disabled={requestStatus !== null} // Disabled after any requestStatus is set
            />
            {error && <div>Error: {error}. Try again later.</div>}
            {requestStatus === 'success' && <div>Request sent successfully!</div>}
        </FixturaGroup>
    );
};
