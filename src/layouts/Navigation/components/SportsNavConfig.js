import {
  IconListNumbers,
  IconScoreboard,
  IconCricket,
  IconUsersGroup,
  IconLadder,
} from "@tabler/icons-react";

export const sportsNavConfig = {
  cricket: [
    { icon: IconListNumbers, label: "Weekend Summary", extension: "results" },
    { icon: IconScoreboard, label: "Match Results", extension: "fixtures" },
    { icon: IconCricket, label: "Top 5 Batting", extension: "top5batting" },
    { icon: IconCricket, label: "Top 5 Bowling", extension: "top5bowling" },
    /* {
      icon: IconUsersGroup,
      label: "Team of the Week",
      extension: "teamoftheweek",
    }, */
    { icon: IconLadder, label: "Ladder", extension: "ladder" },
  ],
  afl: [
    { icon: IconListNumbers, label: "Weekend Summary", extension: "results" },
    { icon: IconScoreboard, label: "Match Results", extension: "fixtures" },
    { icon: IconCricket, label: "Top 5 Scorers", extension: "top5scorers" },
    { icon: IconLadder, label: "Ladder", extension: "ladder" },
  ],
  netball: [
    { icon: IconListNumbers, label: "Weekend Summary", extension: "results" },
    { icon: IconScoreboard, label: "Match Results", extension: "fixtures" },
    { icon: IconCricket, label: "Top 5 Scorers", extension: "top5scorers" },
    { icon: IconLadder, label: "Ladder", extension: "ladder" },
  ],
};
