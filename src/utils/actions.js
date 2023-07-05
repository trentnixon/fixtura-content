export const FindAccountLabel = (account) => {
  if (!account?.attributes?.account_type?.data?.attributes?.Name) {
    return "Undefined";
  }

  return account.attributes.account_type.data.attributes.Name === "Association"
    ? account.attributes.associations.data[0]?.attributes?.Name
    : account.attributes.clubs.data[0]?.attributes?.Name;
};

export const FindAccountLogo = (account) => {
  const ACCOUNTTYPE = account?.attributes?.account_type?.data?.attributes?.Name;
  if (!ACCOUNTTYPE) {
    return "Undefined";
  }

  return ACCOUNTTYPE === "Association"
    ? account?.attributes.associations.data[0]?.attributes.Logo.data?.attributes
        .url
    : account?.attributes.clubs.data[0]?.attributes.Logo.data?.attributes.url;
};

export const DateFromTo = (createdAt) => {
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const currentDate = new Date(createdAt);
  const pastDate = new Date(createdAt);
  pastDate.setDate(currentDate.getDate() - 7);

  const formattedCurrentDate = currentDate.toLocaleDateString(
    "en-US",
    dateOptions
  );
  const formattedPastDate = pastDate.toLocaleDateString("en-US", dateOptions);

  return [formattedPastDate, formattedCurrentDate];
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

export const ComplieRenderData = (DATA) => {
  return {
    CREATEDAT: DATA.createdAt,
    FROM: DateFromTo(DATA.createdAt)[0],
    TO: DateFromTo(DATA.createdAt)[1],
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
