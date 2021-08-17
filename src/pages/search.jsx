import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAreSearchResultsFetching, selectSearchResults } from '../redux/library/library.selectors';
import { clearSearchResults } from '../redux/library/library.actions';

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

const SearchPage = ({ searchResults, clearSearchResults, areSearchResultsFetching }) => {
  useEffect(() => {
    if (searchResults) clearSearchResults();
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
        <Text pt={{ base: 8, md: 12 }} pb='20px'>
          {searchResults ? `${searchResults.numFound} hits` : ''}
        </Text>

        {
          searchResults
            ? searchResults.docs
              .slice(0, 10)
              .map(
                result => 
                <div key={result.key}>{result.title}</div>
              )
            : null
        }
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
  clearSearchResults: () => dispatch(clearSearchResults())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);