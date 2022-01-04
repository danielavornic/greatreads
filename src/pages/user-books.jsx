import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { Container, Text } from '@chakra-ui/react';

import {
  selectUserBooks,
  selectAreUserBooksFetching,
} from '../redux/books/books.selectors';
import { fetchUserBooksStart } from '../redux/books/books.actions';

import UserBooksContainer from '../components/books/user-books-container';
import CustomSpinner from '../components/common/custom-spinner';

const UserBooksPage = ({
  match,
  fetchUserBooks,
  userBooks,
  areUserBooksLoading,
}) => {
  const { username, shelf } = match.params;
  useEffect(() => {
    fetchUserBooks(username, shelf);
  }, [fetchUserBooks, username, shelf]);

  return (
    <Container maxW={'5xl'}>
      {userBooks && userBooks.displayName ? (
        <UserBooksContainer />
      ) : areUserBooksLoading ? (
        <CustomSpinner />
      ) : (
        <Text textAlign={'center'}>User and/or bookshelf not found.</Text>
      )}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  userBooks: selectUserBooks,
  areUserBooksLoading: selectAreUserBooksFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserBooks: (username, shelf) =>
    dispatch(fetchUserBooksStart({ username, shelf })),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserBooksPage)
);
