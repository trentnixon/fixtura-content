export const FindAccountLabel = (account) => {
  if (!account?.attributes?.account_type?.data?.attributes?.Name) {
    return "Undefined";
  }

  return account.attributes.account_type.data.attributes.Name === "Association"
    ? account.attributes.associations.data[0]?.attributes?.Name
    : account.attributes.clubs.data[0]?.attributes?.Name;
};

export const FindAccountLogo = (account) => {
  if (!account?.attributes?.account_type?.data?.attributes?.Name) {
    return "Undefined";
  }

  if(account?.attributes?.associations?.data[0]?.attributes?.Logo.data?.attributes === undefined)
  return null
   
  return account?.attributes.account_type.data?.attributes.Name === "Association"
    ? account?.attributes.associations.data[0]?.attributes.Logo.data?.attributes.url
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
    if (item.attributes.game_meta_datum !== null) {
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

export const filterByAssetId = (data, UIDS) => {
  return data.filter((item) => {
    //console.log(item.attributes.asset?.data?.id)
    return UIDS.includes(item.attributes.asset?.data?.id);
  });
};

export const FilterResult = (OBJ) => {
  ASSETIDS = [4, 13, 21, 22, 23];
  return filterByAssetId(OBJ, ASSETIDS);
};
export const FilterUpcoming = (OBJ) => {
  ASSETIDS = [1, 2, 3, 19, 20];
  return filterByAssetId(OBJ, ASSETIDS);
};

export const FilterStatisticsDownload = (OBJ) => {
  ASSETIDS = [6,7,12,15,16,18];
  return filterByAssetId(OBJ, ASSETIDS);
};
export const FilterStatisticsWriteup = (OBJ) => {
  ASSETIDS = [24,25,26];
  return filterByAssetId(OBJ, ASSETIDS);
};
