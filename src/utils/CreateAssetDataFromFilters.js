export const createAssetDataFromFilters = (
  downloads,
  ai_articles,
  useCompositionID,
  grouping_category
) => {
  // Filter both downloads and ai_articles by CompositionID and grouping_category
  const filteredDownloads = downloads.filter(
    (item) =>
      item.attributes.asset.data.attributes.CompositionID ===
        useCompositionID &&
      item.attributes.grouping_category === grouping_category
  );

  //console.log("ai_articles ", ai_articles[0].attributes.asset.data.attributes.CompositionID,useCompositionID )
  const filteredAiArticles = ai_articles.filter(
    (item) =>
      item.attributes.asset.data.attributes.CompositionID ===
        useCompositionID &&
      item.attributes.grouping_category === grouping_category
  );

  const groupedByAssetLinkID = {};

  const initializeAssetTypes = (obj, assetLinkID) => {
    if (!obj[assetLinkID]) {
      obj[assetLinkID] = {
        videos: [],
        graphics: [],
        articles: [],
      };
    }
  };

  const simplifyDownloadObject = (download) => ({
    id: download.id,
    Name: download.attributes.Name,
    grouping_category: download.attributes.grouping_category,
    isAccurate: download.attributes.isAccurate,
    hasBeenProcessed: download.attributes.hasBeenProcessed,
    forceRerender: download.attributes.forceRerender,
    errorHandler: download.attributes.errorHandler,
    hasError: download.attributes.hasError,
    downloads: download.attributes.downloads, // Assuming you want to keep the array of objects structure
    numDownloads: download.attributes.numDownloads,
  });
  const simplifyArticleObject = (article) => ({
    id: article.id,
    Name: article.attributes.Name,
    grouping_category: article.attributes.grouping_category,
    ArticleJournalist: article.attributes.ArticleJournalist,
    ArticleEditor: article.attributes.ArticleEditor,
    hasCompleted: article.attributes.hasCompleted,
    forceRerender: article.attributes.forceRerender,
    hasError: article.attributes.hasError,
    errorHandler: article.attributes.errorHandler,
    structuredOutput: article.attributes.structuredOutput,
  });

  // Process downloads
  filteredDownloads.forEach((download) => {
    const assetLinkID = download.attributes.assetLinkID;
    const assetTypeName =
      download.attributes.asset_category.data.attributes.Identifier;

    initializeAssetTypes(groupedByAssetLinkID, assetLinkID);

    if (assetTypeName === "VIDEO") {
      groupedByAssetLinkID[assetLinkID].videos.push(
        simplifyDownloadObject(download)
      );
    } else if (assetTypeName === "IMAGE") {
      groupedByAssetLinkID[assetLinkID].graphics.push(
        simplifyDownloadObject(download)
      );
    }
  });

  // Assuming a similar simplification process for articles, if needed

  // Process ai_articles
  filteredAiArticles.forEach((article) => {
    const assetLinkID = article.attributes.assetLinkID;
    initializeAssetTypes(groupedByAssetLinkID, assetLinkID);

    groupedByAssetLinkID[assetLinkID].articles.push(
      simplifyArticleObject(article)
    );
  });

  return Object.keys(groupedByAssetLinkID).map((assetLinkID) => ({
    assetLinkID,
    ...groupedByAssetLinkID[assetLinkID],
  }));
};
