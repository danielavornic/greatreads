export const statuses = ['wantToRead', 'read', 'currentlyReading'];

export const isBookStored = (bookArr, bookKey) => {
  if (bookArr && bookArr.length > 0)
    return bookArr.some((book) => book.bookKey === bookKey);
  return false;
};

export const getStoredBookObj = (userBooks, bookKey) => {
  return userBooks.all.filter((book) => book.bookKey === bookKey)[0];
};

export const createNewBookObj = (book, bookKey) => {
  const cover = book.covers ? book.covers[0] : null;
  const newBookObj = {
    bookKey: bookKey,
    title: book.title,
    cover: cover,
  };
  return newBookObj;
};
