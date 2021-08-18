import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAreSearchResultsFetching, selectSearchResults } from '../redux/library/library.selectors';
import { clearSearchResults, clearSearchQuery } from '../redux/library/library.actions';

import {
  Container,
  VStack,
  Heading,
  Text,
  Box,
  Flex
} from '@chakra-ui/layout';

import { Spinner } from '@chakra-ui/spinner';

import SearchInput from '../components/search-input';
import BookListItem from '../components/book-list-item';

const SearchPage = ({ searchResults, clearSearchResults, clearSearchQuery, areSearchResultsFetching }) => {
  useEffect(() => {
    if (searchResults) {
      clearSearchResults();
      clearSearchQuery();
    }
  }, []);

  return (
    <Container maxW={'5xl'}>
      <Heading
        as='h1'
        textAlign='center'
        fontWeight={700}
        fontSize={{ base: '3xl', md: '4xl' }}
        lineHeight={'110%'}
        pb='30px'
        pt={{ base: 8, md: 12 }}
      >
        Search
      </Heading>
      <Box align='center'>
        <SearchInput storeValue />
      </Box>

      <VStack align='left'>
        {
          searchResults 
          ? <Text pt={{ base: 8, md: 12 }} pb='20px'>{searchResults.numFound} results</Text> 
          : null
        }
        
        <VStack spacing='36px' pb='48px'>
          {
            searchResults
              ? searchResults.docs.slice(0, 10).map(
                  ({ key, ...otherBookProps }) => <BookListItem key={key} {...otherBookProps}/>
                )
              : null
          }
        </VStack>

        {
          areSearchResultsFetching
          ? <Flex justifyContent='center'>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color={'brand.400'}
                size="xl"
              />
            </Flex>
          : null
        }
      </VStack>
    </Container>
  )
};

const mapStateToProps = createStructuredSelector({
  searchResults: selectSearchResults,
  areSearchResultsFetching: selectAreSearchResultsFetching
});

const mapDispatchToProps = dispatch => ({
  clearSearchResults: () => dispatch(clearSearchResults()),
  clearSearchQuery: () => dispatch(clearSearchQuery())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);