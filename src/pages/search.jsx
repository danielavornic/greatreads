import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSearchQuery, selectSearchResults } from '../redux/library/library.selectors';
import { clearSearchResults, clearSearchQuery } from '../redux/library/library.actions';

import {
  Container,
  Heading,
  Box
} from '@chakra-ui/layout';

import SearchInput from '../components/search-input';

const SearchPage = ({ searchResults, clearSearchResults, clearSearchQuery, searchQuery }) => {
  useEffect(() => {
    clearSearchResults();
    clearSearchQuery()
  }, [searchQuery]);

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
        <SearchInput />
      </Box>

      <div>
        {
          searchResults
          ? searchResults.slice(0, 10).map(result => <div key={result.key}>{result.title}</div>)
          : null
        }
      </div>
    </Container>
  )
};

const mapStateToProps = createStructuredSelector({
  searchResults: selectSearchResults,
  searchQuery: selectSearchQuery
});

const mapDispatchToProps = dispatch => ({
  clearSearchResults: () => dispatch(clearSearchResults()),
  clearSearchQuery: () => dispatch(clearSearchQuery())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);