export const createUpdateObj = (
  category,
  type,
  bookKey = null,
  book = null,
  user = null
) => {
  const cover = book.covers ? book.covers[0] : null;
  let updateObj = {
    category: category,
    type: type,
    timestamp: new Date(),
  };
  if (category === 'book') {
    updateObj = {
      ...updateObj,
      bookData: {
        key: bookKey,
        title: book.title,
        cover: cover,
      },
    };
  }
  return updateObj;
};

export const getStoredUpdateObj = (userUpdates, bookKey) => {
  return userUpdates.filter((update) => update.bookData.key === bookKey);
};
