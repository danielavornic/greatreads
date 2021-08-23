import { useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchBookStart, clearBook } from '../redux/library/library.actions';
import { selectBook, selectIsBookFetching } from '../redux/library/library.selectors';

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
import CustomSpinner from '../components/custom-spinner';
import ReadMoreReact from 'read-more-react';

const BookPage = ({ match, fetchBookStart, book, isBookLoading, clearBook }) => {
  useEffect(() => {
    fetchBookStart(match.params.bookKey);

    return () => clearBook();
  }, []);

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
                  src={book.covers ? `http://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
                                   : 'https://openlibrary.org/images/icons/avatar_book.png'} 
                  width='200px'
                  height='auto'
                  boxShadow='xl'
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
                  {
                    book.authors
                    ? book.authors.map(
                      (author, idx) => 
                      (idx === 0) 
                      ? `by ${author.name}` 
                      : (idx < book.authors.length - 1) 
                        ? ` ${author.name},` 
                      : ` ${author.name}`
                    )
                    : book.by_statement
                      ? `${book.by_statement}`
                    : 'by Unknown author'
                  }
                </Heading>
                <Text pb='20px' color={'gray.600'}>
                  This edition was published in <b>{book.publish_date}</b>
                </Text>
                <ReadMoreReact 
                  text={book.description}
                  readMoreText='…more'
                  min={200}
                  ideal={300}
                  max={400}
                />
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
  fetchBookStart: (bookKey) => dispatch(fetchBookStart(bookKey)),
  clearBook: () => dispatch(clearBook())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)
  (BookPage)
);