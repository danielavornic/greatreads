import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { selectGenre, selectIsGenreFetching } from '../redux/genres/genres.selectors';
import { fetchGenreStart } from '../redux/genres/genres.actions';

import { 
  Container,
  Grid,
  Flex,
  Box,
  Heading,
  Text
 } from '@chakra-ui/layout';
 
import CustomSpinner from '../components/common/custom-spinner';
import GenreBooksContainer from '../components/genre-books-container';
import RelatedList from '../components/related-list';

const GenrePage = ({ match, genre, fetchGenreStart, isGenreLoading }) => {
  const genreName = match.params.genreName;
  useEffect(() => {
    fetchGenreStart(genreName);
  }, [genreName]);

  return (
    <Container maxW={'5xl'} my='48px'>
      <Heading
        as='h1'
        textAlign='center'
        fontWeight={700}
        fontSize={{ base: '3xl', md: '4xl' }}
        pb={['36px', '48px']}
        textTransform='capitalize'
      >
        { genreName.replace(/_/g, ' ') }
      </Heading>
      {
        isGenreLoading
        ? <CustomSpinner />
        : genre
          ? <Grid
              templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', '60% 40%', '80% 20%']}
              gap={[ 4, 6, 10 ]}
              w={'full'}
            >
              <Box>
                <GenreBooksContainer />
              </Box>
              <Box>
                <RelatedList data='genres' />
                <RelatedList data='authors' />
              </Box>
            </Grid>
          : <Flex justifyContent='center'>
              <Text>No books found.</Text>
            </Flex>
      }
    </Container>
  )
};

const mapStateToProps = createStructuredSelector({
  genre: selectGenre,
  isGenreLoading: selectIsGenreFetching
});

const mapDispatchToProps = dispatch => ({
  fetchGenreStart: (genreName) => dispatch(fetchGenreStart(genreName))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)
  (GenrePage)
);