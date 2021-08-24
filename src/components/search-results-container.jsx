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
import { Button } from '@chakra-ui/react';
import Pagination from '@choc-ui/paginator';

import BookListItem from './book-list-item';
import CustomSpinner from './custom-spinner';

const SearchResultsContainer = ({ searchResults, clearSearchResults, areSearchResultsLoading, match }) => {
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

  const urlQuery = match.params.query;
  const clearResults = () => {
    if (searchResults && !urlQuery) clearSearchResults();
  }

  useEffect(() => { return () => clearResults() }, []);
  useBeforeunload(() => clearResults());

  useEffect(() => {
    if (searchResults) {
      setData(searchResults.docs);
      setCurrent(1);
    }
  }, [searchResults]);

  return (
    <Stack width={'full'} my='48px'>
      {
        searchResults && urlQuery
        ? searchResults.numFound > 0
          ? <Stack width='100%' maxW={'full'}>
              <Text mb='8px'>
                Page {current} of {searchResults.numFound} results
              </Text>

              <VStack 
                spacing={['28px', '36px']} 
                width={'full'} 
                align='center'
              >
                { 
                  results.map(
                    ({ key, cover_edition_key, edition_key, ...otherBookProps }) => {
                      const bookKey = cover_edition_key ? cover_edition_key : edition_key;
                      return <BookListItem key={key} bookKey={bookKey} {...otherBookProps} />
                    }
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
          : <Flex justifyContent='center'>
              <Text>No results found.</Text>
            </Flex>
        : areSearchResultsLoading
          ? <CustomSpinner/>
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