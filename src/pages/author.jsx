import { useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchAuthorStart } from '../redux/authors/authors.actions';
import { selectAuthor, selectIsAuthorFetching } from '../redux/authors/authors.selectors';

import {
  Container,
  Box,
  Heading,
  Text
} from '@chakra-ui/layout';
import { 
  Grid,
  Flex,
  Image 
} from '@chakra-ui/react';
import CustomSpinner from '../components/common/custom-spinner';
import ReadMore from '../components/common/read-more';
import AuthorBooksContainer from '../components/author-books-container';

const AuthorPage = ({ match, fetchAuthorStart, author, isAuthorLoading }) => {
  const authorKey = match.params.authorKey;
  useEffect(() => {
    fetchAuthorStart(authorKey);
  }, [authorKey]);

  return (
    <Container maxW={'5xl'} my='48px'>
      {
        author
        ? author.error === 'notfound'
          ? <Text align='center'>Author not found</Text>
          : <Flex flexDirection={['column', 'column', 'row']}>
              <Box 
                w={['full', 'full', '210px']} 
                mr={[4, 6, 8]}
                mb={8}
              >
                <Image 
                  src={author.photos[0] !== -1 ? `https://covers.openlibrary.org/a/id/${author.photos[0]}-L.jpg`
                                               : 'https://openlibrary.org/images/icons/avatar_author-lg.png'} 
                  width='200px'
                  height='auto'
                  boxShadow='lg'
                />
              </Box>

              <Box w={'full'}>
                  <Heading
                    as='h1'
                    fontWeight={700}
                    fontSize={{ base: '3xl', md: '4xl' }}
                    pb='12px'
                  >
                    {author.name}
                  </Heading>

                  {
                    author.birth_date || author.death_date
                    ? <Text fontSize={{ base: 'lg', md: 'xl' }} pb='20px'>
                        { author.birth_date ? `${author.birth_date} - ` : '? - ' }
                        { author.death_date ? `${author.death_date}` : '' }
                      </Text>
                    : null
                  }

                  {
                    author.bio 
                    ? author.bio.value 
                      ? <ReadMore text={author.bio.value} />
                      : <ReadMore text={author.bio} />
                    : null
                  }
                
                <Box mt={[8, 10]}>
                  <Heading
                    as='h2'
                    fontSize={{ base: 'xl', md: '2xl' }}
                    pb='20px'
                  >
                    Books
                  </Heading>
                  <AuthorBooksContainer/>
                </Box>
              </Box>
            </Flex>
        : isAuthorLoading
          ? <CustomSpinner/>
        : <Text align='center'>Author not found</Text>
      }
    </Container>
  )
};

const mapStateToProps = createStructuredSelector({
  author: selectAuthor,
  isAuthorLoading: selectIsAuthorFetching
});

const mapDispatchToProps = dispatch => ({
  fetchAuthorStart: (authorKey) => dispatch(fetchAuthorStart(authorKey))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)
  (AuthorPage)
);