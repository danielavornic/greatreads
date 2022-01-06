import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Icon } from '@chakra-ui/react';
import { BsSuitHeartFill } from 'react-icons/bs';

import {
  selectBookKey,
  selectIsBookLiked,
  selectBookStatus,
} from '../../redux/books/books.selectors';
import {
  fetchIsBookLikedStart,
  updateIsBookLikedStart,
  updateBookStatusStart,
} from '../../redux/books/books.actions';

const BookHeart = ({
  bookKey,
  fetchIsBookLiked,
  isBookLiked,
  updateIsBookLiked,
  bookStatus,
  updateBookStatus,
}) => {
  useEffect(() => {
    fetchIsBookLiked(bookKey);
  }, [bookKey, fetchIsBookLiked]);

  const handleClick = () => {
    updateIsBookLiked(bookKey, isBookLiked);
    if (bookStatus !== 'read') updateBookStatus(bookKey, 'read');
  };

  return (
    <Icon
      as={BsSuitHeartFill}
      mt={'8px'}
      fontSize={33}
      cursor={'pointer'}
      color={isBookLiked ? '#E53E3E' : '#A0AEC0'}
      _hover={{ color: isBookLiked ? '#A0AEC0' : '#E53E3E' }}
      onClick={handleClick}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  bookKey: selectBookKey,
  isBookLiked: selectIsBookLiked,
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
