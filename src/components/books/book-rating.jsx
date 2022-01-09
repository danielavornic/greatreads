import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useToast, useBreakpointValue } from '@chakra-ui/react';
import ReactStars from 'react-stars';

import {
  fetchBookRatingStart,
  updateBookRatingStart,
  updateBookStatusStart,
} from '../../redux/books/books.actions';
import {
  selectBookRating,
  selectBookKey,
  selectBookRatingError,
  selectBookStatus,
} from '../../redux/books/books.selectors';

const BookRating = ({
  bookKey,
  bookRating,
  bookStatus,
  bookRatingError,
  fetchBookRating,
  updateBookRating,
  updateBookStatus,
}) => {
  const [displayToast, setDisplayToast] = useState(false);
  const toast = useToast();
  const toastPosition = useBreakpointValue({
    base: 'bottom',
    md: 'bottom',
    lg: 'bottom-right',
  });

  const handleChange = (newRating) => {
    newRating *= newRating * 2 === bookRating ? 0 : 2;
    updateBookRating(bookKey, newRating);
    setDisplayToast(true);
    console.log(bookStatus);
    if (bookStatus !== 'read' && newRating !== 0)
      updateBookStatus(bookKey, 'read');
  };

  useEffect(() => fetchBookRating(bookKey), [fetchBookRating, bookKey]);

  useEffect(() => {
    if (displayToast) {
      const toastStatus = bookRatingError ? 'error' : 'success';
      const toastDescription = bookRatingError
        ? 'Failed to update rating'
        : bookRating > 0
        ? `Book rating set to ${bookRating / 2} stars`
        : 'Book rating removed';
      toast({
        description: toastDescription,
        position: toastPosition,
        status: toastStatus,
        duration: 2500,
        isClosable: true,
      });
      setDisplayToast(false);
    }
    // eslint-disable-next-line
  }, [bookRating]);

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
  bookKey: selectBookKey,
  bookRating: selectBookRating,
  bookRatingError: selectBookRatingError,
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
