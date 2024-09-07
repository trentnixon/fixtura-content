/**
 * Selects the correct article based on provided conditions.
 *
 * @param {object} articleData - The data object containing the article information.
 * @returns {string} - The selected article content.
 */
export function selectArticle(articleData) {
  const { structuredOutput } = articleData;
  return structuredOutput;
}
