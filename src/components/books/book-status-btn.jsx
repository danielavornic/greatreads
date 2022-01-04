import { useEffect } from 'react';
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
} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

import {
  selectBookStatus,
  selectBookKey,
  selectIsBookStatusLoading,
} from '../../redux/books/books.selectors';
import {
  fetchBookStatusStart,
  updateBookStatusStart,
} from '../../redux/books/books.actions';
import { camelToSentenceCase } from '../../utils/text-manipulation';

const BookStatusBtn = ({
  updateBookStatus,
  bookStatus,
  fetchBookStatus,
  bookKey,
  isBookStatusLoading,
}) => {
  useEffect(() => {
    fetchBookStatus(bookKey);
  }, [fetchBookStatus, bookKey]);

  const statuses = ['wantToRead', 'read', 'currentlyReading'];

  const handleClick = (event) => {
    const status = event.target.getAttribute('data-status');
    updateBookStatus(status);
  };

  return (
    <ButtonGroup isAttached colorScheme={'brand'} width={'full'}>
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
            <MenuItem data-status={status} onClick={handleClick}>
              {camelToSentenceCase(status)}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </ButtonGroup>
  );
};

const mapStateToProps = createStructuredSelector({
  bookStatus: selectBookStatus,
  bookKey: selectBookKey,
  isBookStatusLoading: selectIsBookStatusLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBookStatus: (bookKey) => dispatch(fetchBookStatusStart(bookKey)),
  updateBookStatus: (status) => dispatch(updateBookStatusStart(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookStatusBtn);
