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
  const { username, shelf, rating } = match.params;

  useEffect(() => {
    const ratings = ['½', '1', '1½', '2', '2½', '3', '3½', '4', '4½', '5'];
    const ratingArg = rating ? ratings.indexOf(rating) + 1 : null;
    fetchUserBooks(username, shelf, ratingArg);
  }, [fetchUserBooks, username, shelf, rating]);

  return (
    <Container maxW={'5xl'}>
      {userBooks ? (
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
  fetchUserBooks: (username, shelf, rating = null) =>
    dispatch(fetchUserBooksStart({ username, shelf, rating })),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserBooksPage)
);
