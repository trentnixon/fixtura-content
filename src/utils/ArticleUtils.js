/**
 * Selects the correct article based on provided conditions.
 *
 * @param {object} articleData - The data object containing the article information.
 * @returns {string} - The selected article content.
 */
export function selectArticle(articleData) {
    console.log("articleData ", articleData)
    const { ArticleEditor, rewriteCount, ArticleJournalist,structuredOutput } = articleData;
    return structuredOutput
    // Show article if EditorsArticle is null or if rewriteCount is a number.
    if (ArticleEditor === null || typeof rewriteCount === "number" || structuredOutput === null) {
        return ArticleJournalist;
    }
    return structuredOutput
    // Otherwise, return EditorsArticle.
    return ArticleEditor;
}
