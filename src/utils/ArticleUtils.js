/**
 * Selects the correct article based on provided conditions.
 * 
 * @param {object} articleData - The data object containing the article information.
 * @returns {string} - The selected article content.
 */
export function selectArticle(articleData) {
    const { ArticleEditor, rewriteCount, ArticleJournalist } = articleData;

    // Show article if EditorsArticle is null or if rewriteCount is a number.
    if (ArticleEditor === null || typeof rewriteCount === "number") {
        return ArticleJournalist;
    }
    // Otherwise, return EditorsArticle.
    return ArticleEditor;
}
