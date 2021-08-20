import React, { useEffect, forwardRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useBeforeunload } from 'react-beforeunload';

import { selectAreSearchResultsFetching, selectSearchResults } from '../redux/library/library.selectors';
import { clearSearchResults } from '../redux/library/library.actions';

import {
  VStack,
  Stack,
  Text,
  Flex
} from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Button } from '@chakra-ui/react';
import Pagination from '@choc-ui/paginator';

import BookListItem from './book-list-item';

const SearchResultsContainer = ({ searchResults, clearSearchResults, areSearchResultsLoading, location }) => {
  const [ data, setData ] = React.useState([]);
  const [ current, setCurrent ] = React.useState(1);
  const pageSize = 10;
  const offset = (current - 1) * pageSize;
  const results = data ? data.slice(offset, offset + pageSize) : [];

  const Prev = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>Prev</Button>
  ));
  const Next = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>Next</Button>
  ));

  const itemRender = (_, type) => {
    if (type === 'prev') return Prev;
    if (type === 'next') return Next;
  };

  const urlSearchQuery = location.pathname.split('/')[3];
  const clearResults = () => {
    if (searchResults && !urlSearchQuery) clearSearchResults();
  }

  useEffect(() => { 
    return () => clearResults() 
  }, []);
  useBeforeunload(() => clearResults());

  useEffect(() => {
    if (searchResults) {
      setData(searchResults.docs);
      setCurrent(1);
    }
  }, [searchResults]);

  return (
    <Stack width={'full'}>
      {
        searchResults && searchResults.numFound > 0 && urlSearchQuery
          ? <Stack width='100%' maxW={'full'}>
              <Text pt={{ base: 8, md: 12 }} pb='20px'>
                Page {current} of {searchResults.numFound} results
              </Text>

              <VStack spacing='36px' pb='48px' width={'full'} align='center'>
                { 
                  results.map(
                    ({ key, ...otherBookProps }) => 
                    <BookListItem key={key} bookKey={key} {...otherBookProps} />
                  ) 
                }
                {
                  data && data.length > pageSize
                    ? <Pagination
                        current={current}
                        onChange={(page) => {
                          setCurrent(page);
                          window.scrollTo(0, 0);
                        }}
                        pageSize={pageSize}
                        total={data.length}
                        itemRender={itemRender}
                        paginationProps={{
                          display: 'flex'
                        }}
                      />
                    : null
                }
              </VStack>
            </Stack>
          : null
      }

      {
        searchResults && searchResults.numFound === 0 && urlSearchQuery
          ? <Flex justifyContent='center' mt='48px'>
              <Text>No results found.</Text>
            </Flex>
          : null
      }

      {
        areSearchResultsLoading
          ? <Flex justifyContent='center' mt='48px'>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color={'brand.400'}
                size='xl'
              />
            </Flex>
          : null
      }
    </Stack>
  )
};

const mapStateToProps = createStructuredSelector({
  searchResults: selectSearchResults,
  areSearchResultsLoading: selectAreSearchResultsFetching
});

const mapDispatchToProps = dispatch => ({
  clearSearchResults: () => dispatch(clearSearchResults())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)
  (SearchResultsContainer)
);