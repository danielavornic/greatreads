import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Icon, useToast, useBreakpointValue } from '@chakra-ui/react';
import { BsSuitHeartFill } from 'react-icons/bs';

import {
  selectBookKey,
  selectIsBookLiked,
  selectBookStatus,
  selectBookLikeError,
} from '../../redux/books/books.selectors';
import {
  fetchIsBookLikedStart,
  updateIsBookLikedStart,
  updateBookStatusStart,
} from '../../redux/books/books.actions';

const BookHeart = ({
  bookKey,
  isBookLiked,
  bookLikeError,
  bookStatus,
  fetchIsBookLiked,
  updateIsBookLiked,
  updateBookStatus,
}) => {
  const [displayToast, setDisplayToast] = useState(false);
  const toast = useToast();
  const toastPosition = useBreakpointValue({
    base: 'bottom',
    md: 'bottom',
    lg: 'bottom-right',
  });

  const handleClick = () => {
    updateIsBookLiked(bookKey, isBookLiked);
    setDisplayToast(true);
    if (bookStatus !== 'read') updateBookStatus(bookKey, 'read');
  };

  useEffect(() => fetchIsBookLiked(bookKey), [bookKey, fetchIsBookLiked]);

  useEffect(() => {
    if (displayToast) {
      const toastStatus = bookLikeError ? 'error' : 'success';
      const toastDescription = bookLikeError
        ? 'Failed to (un)like book'
        : isBookLiked
        ? `Book marked as "liked"`
        : 'Book like removed';
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
  }, [isBookLiked]);

  return (
    <Icon
      as={BsSuitHeartFill}
      mt={'8px'}
      fontSize={33}
      cursor={'pointer'}
      color={isBookLiked ? '#E53E3E' : '#A0AEC0'}
      onClick={handleClick}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  bookKey: selectBookKey,
  isBookLiked: selectIsBookLiked,
  bookLikeError: selectBookLikeError,
  bookStatus: selectBookStatus,
});

const mapDispatchToProps = (dispatch) => ({
  fetchIsBookLiked: (bookKey) => dispatch(fetchIsBookLikedStart(bookKey)),
  updateIsBookLiked: (bookKey, isLiked) =>
    dispatch(updateIsBookLikedStart({ bookKey, isLiked })),
  updateBookStatus: (bookKey, status) =>
    dispatch(updateBookStatusStart({ bookKey, status })),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookHeart);
