import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ReactStars from 'react-stars';

import {
  fetchBookRatingStart,
  updateBookRatingStart,
  updateBookStatusStart,
} from '../../redux/books/books.actions';
import {
  selectBookRating,
  selectBookKey,
  selectBookStatus,
} from '../../redux/books/books.selectors';

const BookRating = ({
  bookKey,
  bookRating,
  bookStatus,
  fetchBookRating,
  updateBookRating,
  updateBookStatus,
}) => {
  useEffect(() => {
    fetchBookRating(bookKey);
  }, [fetchBookRating, bookKey]);

  const handleChange = (newRating) => {
    newRating *= newRating * 2 === bookRating ? 0 : 2;
    updateBookRating(bookKey, newRating);
    if (bookStatus !== 'read' && newRating !== 0)
      updateBookStatus(bookKey, 'read');
  };

  return (
    <ReactStars
      count={5}
      onChange={handleChange}
      size={46}
      color1={'#A0AEC0'}
      color2={'#F6E05E'}
      value={bookRating / 2}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  bookRating: selectBookRating,
  bookKey: selectBookKey,
  bookStatus: selectBookStatus,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBookRating: (bookKey) => dispatch(fetchBookRatingStart(bookKey)),
  updateBookRating: (bookKey, rating) =>
    dispatch(updateBookRatingStart({ bookKey, rating })),
  updateBookStatus: (bookKey, status) =>
    dispatch(updateBookStatusStart({ bookKey, status })),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookRating);
