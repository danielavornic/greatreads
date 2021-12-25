import { createSelector } from 'reselect';

const selectAuthors = (state) => state.authors;

export const selectAuthor = createSelector(
  [selectAuthors],
  (authors) => authors.author
);

export const selectIsAuthorFetching = createSelector(
  [selectAuthors],
  (authors) => authors.isAuthorFetching
);

export const selectAuthorWorks = createSelector(
  [selectAuthors],
  (authors) => authors.author.works
);
