export const FindAccountLabel = (account) => {
  if (!account?.attributes?.account_type?.data?.attributes?.Name) {
    return 'Undefined';
  }

  return account.attributes.account_type.data.attributes.Name === "Association"
    ? account.attributes.associations.data[0]?.attributes?.Name
    : account.attributes.clubs.data[0]?.attributes?.Name;
};



export const DateFromTo = (createdAt) =>{
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const currentDate = new Date(createdAt);
  const pastDate = new Date(createdAt);
  pastDate.setDate(currentDate.getDate() - 7);

  const formattedCurrentDate = currentDate.toLocaleDateString('en-US', dateOptions);
  const formattedPastDate = pastDate.toLocaleDateString('en-US', dateOptions);

  return `${formattedPastDate} - ${formattedCurrentDate}`;
}


export const getTeamNamesFromGameObj = (GAME)=>{
  return `${GAME.data.attributes.teamHome } vs ${GAME.data.attributes.teamAway}`
}

export   const groupDownloadsByAssetCategory = (data) => {
  return data.reduce((grouped, item) => {
    const assetCategoryId = item.attributes.asset.data.id;
    if (!grouped[assetCategoryId]) {
      grouped[assetCategoryId] = [];
    }
    grouped[assetCategoryId].push(item);
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
      if (!acc.Games[gameId]) {
        acc.Games[gameId] = [];
      }
      acc.Games[gameId].push(item);
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
    //console.log(item)
    return UIDS.includes(item.attributes.asset?.data?.id);
  });
};