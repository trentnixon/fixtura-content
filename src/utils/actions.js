export const FindAccountLabel = (account) => {
  if (!FindAccountType(account)) {
    return "Undefined";
  } 

  return FindAccountType(account) === "Association"
    ? account.attributes.associations.data[0]?.attributes?.Name
    : account.attributes.clubs.data[0]?.attributes?.Name;
};

export const FindAccountLogo = (account) => {
  const ACCOUNTTYPE = FindAccountType(account);
  if (!ACCOUNTTYPE) {
    return "Undefined";
  }

  return ACCOUNTTYPE === "Association"
    ? account?.attributes.associations.data[0]?.attributes.Logo.data?.attributes
        .url
    : account?.attributes.clubs.data[0]?.attributes.Logo.data?.attributes.url;
};

export const FindAccountType = (account) => {
  return account?.attributes?.account_type?.data?.attributes?.Name;
};

export const FindAccountWriteupID = (account) => {
  const AccountType = FindAccountType(account);
  //console.log(AccountType);
  return FindAccountType(account) === "Association"
    ? 0
    : account.attributes.clubs.data[0]?.id;
};

export const isSponsorsActive = (accountBasic) => {
  //console.log("isSponsorsActive");
  const includeSponsors = accountBasic?.attributes?.subscription_tier?.data?.attributes?.includeSponsors;
  //console.log(includeSponsors);
  const sponsorsData = accountBasic?.attributes?.sponsors?.data;
  //console.log(sponsorsData);

  if (includeSponsors) {
    // Filter out sponsors whose isArticle is set to false
    const activeSponsors = sponsorsData.filter((sponsor) => sponsor.attributes.isArticle === true);
    return activeSponsors;
  } else {
    return [];
  }
};

export const DateFromTo = (createdAt) => {
  const dateOptions = {
    weekday: "short", // displays abbreviated day of the week
    month: "short",
    day: "numeric",
  };

  const currentDate = new Date(createdAt);
  const pastSaturday = new Date(createdAt);
  const nextSunday = new Date(createdAt);

  // Adjusting the dates to get previous Saturday and next Sunday
  pastSaturday.setDate(
    currentDate.getDate() -
      ((currentDate.getDay() === 0 ? 7 : currentDate.getDay()) + 1)
  );
  nextSunday.setDate(pastSaturday.getDate() + 7); // Next Sunday is exactly 7 days from the past Saturday

  const formattedCurrentDate = currentDate.toLocaleDateString(
    "en-AU",
    dateOptions
  );
  const formattedPastSaturday = pastSaturday.toLocaleDateString(
    "en-AU",
    dateOptions
  );
  const formattedNextSunday = nextSunday.toLocaleDateString(
    "en-AU",
    dateOptions
  );

  return [formattedPastSaturday, formattedNextSunday, formattedCurrentDate];
};

export function formatStrapiCreatedOnDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export const getTeamNamesFromGameObj = (GAME) => {
  return `${GAME.data.attributes.teamHome} vs ${GAME.data.attributes.teamAway}`;
};

export const groupDownloadsByAssetCategory = (data) => {
  return data.reduce((grouped, item) => {
    const assetCategoryId = item.attributes.asset.data.id;
    const assetType =
      item.attributes.asset.data.attributes.asset_type.data.attributes.Name;

    if (!grouped[assetCategoryId]) {
      grouped[assetCategoryId] = {};
    }
    if (!grouped[assetCategoryId][assetType]) {
      grouped[assetCategoryId][assetType] = [];
    }
    grouped[assetCategoryId][assetType].push(item);
    return grouped;
  }, {});
};

export const groupByCategoryAndGameId = (data) => {
  return data.reduce((acc, item) => {
    if (
      item.attributes.game_meta_datum !== null &&
      item.attributes.game_meta_datum.data !== null
    ) {
      // Add to 'Games' category
      if (!acc.Games) {
        acc.Games = {};
      }
      const gameId = item.attributes.game_meta_datum.data.id;
      const assetType =
        item.attributes.asset.data.attributes.asset_type.data.attributes.Name;

      if (!acc.Games[gameId]) {
        acc.Games[gameId] = {};
      }
      if (!acc.Games[gameId][assetType]) {
        acc.Games[gameId][assetType] = [];
      }
      acc.Games[gameId][assetType].push(item);
    } else {
      // Add to 'Other' category
      if (!acc.Other) {
        acc.Other = [];
      }
      acc.Other.push(item);
    }
    return acc;
  }, {});
};

// COMPLIE ACCOUNT DATA

export const CompileAccountData = (DATA) => {
  return {
    LABEL: FindAccountLabel(DATA),
    LOGO: FindAccountLogo(DATA),
  };
};

// COMPLIE RENDER DATA

// Function to get game date
function getGameDate(data, findMostRecent = true) {
  // Filter out entries with missing game_meta_datum dates
  const filteredData = data.filter(
    (item) =>
      item.attributes.game_meta_datum &&
      item.attributes.game_meta_datum.data &&
      item.attributes.game_meta_datum.data.attributes &&
      item.attributes.game_meta_datum.data.attributes.date
  );

  // If filteredData is empty, return null
  if (!filteredData.length) {
    return null;
  }

  // Use reduce() to find the desired date
  const desiredGame = filteredData.reduce((desired, current) => {
    // Convert date strings to Date objects
    const desiredDate = new Date(
      desired.attributes.game_meta_datum.data.attributes.date
    );
    const currentDate = new Date(
      current.attributes.game_meta_datum.data.attributes.date
    );

    // Compare dates based on the findMostRecent flag
    if (findMostRecent) {
      return desiredDate > currentDate ? desired : current;
    } else {
      return desiredDate < currentDate ? desired : current;
    }
  });

  // Return the date of the desired game
  return desiredGame.attributes.game_meta_datum.data.attributes.date;
}

export const ComplieRenderData = (DATA) => {
  //console.log('ComplieRenderData ',DATA.game_results_in_renders.data)
  //console.log(getGameDate(DATA.game_results_in_renders.data, true));
  //console.log(getGameDate(DATA.upcoming_games_in_renders.data, false));
  return {
    CREATEDAT: DATA.createdAt,
    FROM: getGameDate(DATA.game_results_in_renders.data, true),
    TO: getGameDate(DATA.upcoming_games_in_renders.data, false),
  };
};

// Complie ASSET DATA
const ASSET_IDS = {
  Results: [4, 13, 21, 22, 23],
  Upcoming: [1, 2, 3, 19, 20],
  StatisticsDownload: [6, 7, 12, 15, 16, 18],
  StatisticsWriteup: [24, 25, 26],
};

export const filterByAssetId = (data, category) => {
  return data.filter((item) => {
    //console.log(item.attributes.asset?.data?.id)
    return ASSET_IDS[category].includes(item.attributes.asset?.data?.id);
  });
};

const calculateStats = (writeups, downloads) => {
  const resultsWriteups = filterByAssetId(writeups, "Results");
  const upcomingWriteups = filterByAssetId(writeups, "Upcoming");
  const statisticsWriteups = filterByAssetId(writeups, "StatisticsWriteup");

  const resultsDownloads = filterByAssetId(downloads, "Results");
  const upcomingDownloads = filterByAssetId(downloads, "Upcoming");
  const statisticsDownloads = filterByAssetId(downloads, "StatisticsDownload");

  return {
    INT: {
      Total: writeups.length + downloads.length,
      TotalWriteups: writeups.length,
      TotalDownloads: downloads.length,
      Results: {
        w: resultsWriteups.length,
        dl: resultsDownloads.length,
      },
      Upcoming: {
        w: upcomingWriteups.length,
        dl: upcomingDownloads.length,
      },
      Statitics: {
        w: statisticsWriteups.length,
        dl: statisticsDownloads.length,
      },
    },
    Results: {
      w: groupByCategoryAndGameId(resultsWriteups),
      dl: groupDownloadsByAssetCategory(resultsDownloads),
    },
    Upcoming: {
      w: groupByCategoryAndGameId(upcomingWriteups),
      dl: groupDownloadsByAssetCategory(upcomingDownloads),
    },
    Statitics: {
      w: groupByCategoryAndGameId(statisticsWriteups),
      dl: groupDownloadsByAssetCategory(statisticsDownloads),
    },
  };
};

export const CompileData = (DATA) => {
  const gtp_3_reports = DATA.gtp_3_reports.data;
  const downloads = DATA.downloads.data;
  return calculateStats(gtp_3_reports, downloads);
};

// GET FULL COMPLIED DATA
export const GetTheLot = (account, render) => {
  return {
    account: CompileAccountData(account),
    render: ComplieRenderData(render),
    assets: CompileData(render),
  };
};



export const sortRenders = (a, b) => {
  return (
    new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
  );
};