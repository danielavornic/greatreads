import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';

import { Container, Text } from '@chakra-ui/layout';

import {
  selectAuthor,
  selectIsAuthorFetching,
} from '../redux/authors/authors.selectors';
import { fetchAuthorStart } from '../redux/authors/authors.actions';

import AuthorContainer from '../components/author/author-container';
import CustomSpinner from '../components/common/custom-spinner';

const AuthorPage = ({ match, fetchAuthorStart, author, isAuthorLoading }) => {
  const authorKey = match.params.authorKey;
  useEffect(() => {
    fetchAuthorStart(authorKey);
  }, [authorKey, fetchAuthorStart]);

  return (
    <Container maxW={'5xl'}>
      {author ? (
        author.error === 'notfound' ? (
          <Text align='center'>Author not found</Text>
        ) : (
          <AuthorContainer />
        )
      ) : isAuthorLoading ? (
        <CustomSpinner />
      ) : (
        <Text align='center'>Author not found</Text>
      )}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  author: selectAuthor,
  isAuthorLoading: selectIsAuthorFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAuthorStart: (authorKey) => dispatch(fetchAuthorStart(authorKey)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthorPage)
);
