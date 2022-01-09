import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  ButtonGroup,
  Button,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

import {
  selectBookStatus,
  selectBookKey,
  selectIsBookStatusLoading,
  selectBookStatusError,
} from '../../redux/books/books.selectors';
import {
  fetchBookStatusStart,
  updateBookStatusStart,
  updateBookRatingStart,
  updateIsBookLikedStart,
} from '../../redux/books/books.actions';
import { camelToSentenceCase } from '../../utils/text-manipulation';

const BookStatusBtn = ({
  bookKey,
  bookStatus,
  bookStatusError,
  isBookStatusLoading,
  fetchBookStatus,
  updateBookStatus,
  updateBookRating,
  updateIsBookLiked,
}) => {
  const [displayToast, setDisplayToast] = useState(false);
  const toast = useToast();
  const toastPosition = useBreakpointValue({
    base: 'bottom',
    md: 'bottom',
    lg: 'bottom-right',
  });

  const statuses = ['wantToRead', 'read', 'currentlyReading'];

  const handleClick = (event) => {
    const status = event.target.getAttribute('data-status');
    updateBookStatus(bookKey, status);
    setDisplayToast(true);
    if (status !== 'read') {
      updateBookRating(bookKey, 0);
      updateIsBookLiked(bookKey, true);
    }
  };

  useEffect(() => fetchBookStatus(bookKey), [fetchBookStatus, bookKey]);

  useEffect(() => {
    if (displayToast) {
      const toastStatus = bookStatusError ? 'error' : 'success';
      const toastDescription = bookStatusError
        ? 'Failed to update status'
        : bookStatus
        ? `Book marked as "${camelToSentenceCase(bookStatus)}"`
        : 'Book removed from your collection';
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
  }, [bookStatus]);

  return (
    <ButtonGroup
      isAttached
      colorScheme={'brand'}
      width={{ base: '260px', md: 'full' }}
    >
      <Button
        width={'calc(100% - 34px)'}
        textAlign={'left'}
        variant={bookStatus ? 'outline' : 'solid'}
        isLoading={isBookStatusLoading}
        data-status={bookStatus ? null : 'wantToRead'}
        onClick={handleClick}
      >
        {bookStatus ? camelToSentenceCase(bookStatus) : 'Want to read'}
      </Button>
      <Menu size='sm'>
        <MenuButton
          as={IconButton}
          icon={<TriangleDownIcon />}
          cursor={'pointer'}
          aria-label='More options'
          borderLeftRadius='0'
          borderLeft={'1px solid white'}
        ></MenuButton>
        <MenuList>
          {statuses.map((status) => (
            <MenuItem key={status} data-status={status} onClick={handleClick}>
              {camelToSentenceCase(status)}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </ButtonGroup>
  );
};

const mapStateToProps = createStructuredSelector({
  bookKey: selectBookKey,
  bookStatus: selectBookStatus,
  isBookStatusLoading: selectIsBookStatusLoading,
  bookStatusError: selectBookStatusError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBookStatus: (bookKey) => dispatch(fetchBookStatusStart(bookKey)),
  updateBookStatus: (bookKey, status) =>
    dispatch(updateBookStatusStart({ bookKey, status })),
  updateBookRating: (bookKey, rating) =>
    dispatch(updateBookRatingStart({ bookKey, rating })),
  updateIsBookLiked: (bookKey, isLiked) =>
    dispatch(updateIsBookLikedStart({ bookKey, isLiked })),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookStatusBtn);
