import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { fetchBookStart } from '../redux/books/books.actions';
import { selectBook, selectIsBookFetching } from '../redux/books/books.selectors';

import {
  Container,
  Box,
  Heading,
  Text
} from '@chakra-ui/layout';
import { 
  Grid,
  Image 
} from '@chakra-ui/react';
import CustomSpinner from '../components/common/custom-spinner';
import ReadMore from '../components/common/read-more';

const BookPage = ({ match, fetchBookStart, book, isBookLoading }) => {
  const bookKey = match.params.bookKey;
  useEffect(() => {
    fetchBookStart(bookKey);
  }, [bookKey]);

  return (
    <Container maxW={'5xl'} my='48px'>
      {
        book
        ? book.error === 'notfound'
          ? <Text align='center'>Book not found</Text>
          : <Grid 
              templateColumns={[ 'repeat(1, 1fr)', '200px 1fr']}
              gap={[ 4, 6, 8 ]}
              w={'full'}
            >
              <Box>
                <Image 
                  src={book.covers ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
                                   : 'https://openlibrary.org/images/icons/avatar_book.png'} 
                  width='200px'
                  height='auto'
                  boxShadow='lg'
                />
              </Box>
              
              <Box>
                <Heading
                  as='h1'
                  fontWeight={700}
                  fontSize={{ base: '3xl', md: '4xl' }}
                  pb='12px'
                >
                  {book.title}
                </Heading>
                <Heading
                  as='h2'
                  fontSize={{ base: 'lg', md: 'xl' }}
                  pb='20px'
                >
                  by
                  {
                    book.authors
                    ? book.authors.map(
                      (author, idx) => 
                      (idx === 0 || idx === book.authors.length - 1) 
                      ? <Link to={author.key}> {author.name}</Link> 
                      : <Link to={author.key}> {author.name},</Link> 
                    )
                    : ' Unknown author'
                  }
                </Heading>
                <Text pb='20px' color={'gray.600'}>
                  This edition was published in <b>{book.publish_date}</b>
                </Text>
                <ReadMore text={book.description} />
              </Box>
            </Grid>
        : isBookLoading
          ? <CustomSpinner/>
        : <Text align='center'>Book not found</Text>
      }
    </Container>
  )
};

const mapStateToProps = createStructuredSelector({
  book: selectBook,
  isBookLoading: selectIsBookFetching
})

const mapDispatchToProps = dispatch => ({
  fetchBookStart: (bookKey) => dispatch(fetchBookStart(bookKey))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)
  (BookPage)
);