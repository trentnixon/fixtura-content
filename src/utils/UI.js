// Function to limit the length of a string and append '...' at the end

export function limitString(string, limit) {
  if (string.length > limit) {
    return string.substring(0, limit) + "...";
  }
  return string;
}


// Function to adjust the font size based on the length of a string
export function adjustFontSize(string, limit, fontSizeForLongString, fontSizeForShortString) {
    if (string.length > limit) {
      return fontSizeForLongString;
    }
    return fontSizeForShortString;
  }
  


export const separateArticleHeaderAndBody = (article) => {
  const articleHeaders = ['#### Deep Dive:', '#### Breakdown:', '#### Quick Single:']; // Array of possible headers

  let articleHeader = ''; // Default to empty
  let articleBody = article; // Initially, consider the whole article as body

  for(let header of articleHeaders) {
    if(article.startsWith(header)) {
      articleHeader = header;
      articleBody = article.replace(header, "").trim(); // The rest of the article
      break; // Once we found and processed a header, no need to check others
    }
  }

  return {articleHeader, articleBody};
};


export const formatSponsorsInPlainText = (sponsors) => {
  let plainTextString = '\n\n\n\nThis fixture write-up was proudly brought to you by:\n';
  sponsors.forEach((sponsor) => {
    plainTextString += `\n\n- Sponsor: ${sponsor.attributes.Name}\n  - Tagline: ${sponsor.attributes.Tagline}\n  - Description: ${sponsor.attributes.Description}\n  - URL: ${sponsor.attributes.URL}\n`;
  });
  return plainTextString;
};