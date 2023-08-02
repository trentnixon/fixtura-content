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
  