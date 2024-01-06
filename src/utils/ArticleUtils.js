/**
 * Selects the correct article based on provided conditions.
 * 
 * @param {object} articleData - The data object containing the article information.
 * @returns {string} - The selected article content.
 */
export function selectArticle(articleData) {
    const { EditorsArticle, rewriteCount, article } = articleData.attributes;

    // Show article if EditorsArticle is null or if rewriteCount is a number.
    if (EditorsArticle === null || typeof rewriteCount === "number") {
        return article;
    }
    // Otherwise, return EditorsArticle.
    return EditorsArticle;
}
