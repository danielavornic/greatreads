export const spaceToPlus = (word) => decodeURI(word).replace(/ /g, '+');

export const plusToSpace = (word) => word.replace(/\+/g, ' ');

export const camelToSentenceCase = (text) => {
  return text.replace(/^[a-z]|[A-Z]/g, function (v, i) {
    return i === 0 ? v.toUpperCase() : ' ' + v.toLowerCase();
  });
};
