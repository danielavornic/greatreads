import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { searchStart, clearSearchQuery, clearSearchResults } from '../redux/library/library.actions';

import {
  HStack,
  Select,
  InputGroup,
  InputRightElement,
  Input
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

import { selectSearchQuery, selectSearchResults } from '../redux/library/library.selectors';

const SearchInput = ({ searchStart, searchQuery, searchResults, storeValue, clearSearchResults, clearSearchQuery, history }) => {
  const [ searchRequest, setSearchRequest ] = useState({
    category: (storeValue && searchQuery) ? searchQuery.category : 'all',
    query: (storeValue && searchQuery) ? searchQuery.query : ''
  });

  const clearSearchData = () => {
    if (searchResults) clearSearchResults();
    if (searchQuery) clearSearchQuery();
    setSearchRequest({...searchRequest});
  }
 
  useEffect(() => {
    if (!storeValue) clearSearchData();

    window.addEventListener('beforeunload', () => clearSearchData());

    return () => {
      if (storeValue) clearSearchData();
    }
  }, [])

  const { category, query } = searchRequest;

  const handleChange = event => {
    const { value, name } = event.target;
    setSearchRequest({ ...searchRequest, [ name ]: value });
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleSubmit();
      event.currentTarget.blur();
    }
  }

  const handleSubmit = () => {
    if (searchResults) clearSearchResults();
    if (query !== '') {
      searchStart(category, query);
      history.push('/search');
    }
  }

  return (
    <HStack maxW={'3xl'} w={'full'}>
      <Select
        name='category'
        size='lg'
        w={{ base: '42%', md: '30%', lg: '20%' }}
        colorScheme={'brand'}
        bg={'brand.50'}
        defaultValue={category}
        onChange={handleChange}
      >
        <option fontSize={{ base: 'md', md: 'lg' }} value='all'>All</option>
        <option fontSize={{ base: 'md', md: 'lg' }} value='title'>Title</option>
        <option fontSize={{ base: 'md', md: 'lg' }} value='author'>Author</option>
      </Select>

      <InputGroup size='lg'>
        <Input
          name='query'
          type='search'
          placeholder='Search...'
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          defaultValue={query}
        />
        <InputRightElement
          children={<AiOutlineSearch />}
          cursor='pointer'
          onClick={handleSubmit}
        />
      </InputGroup>
    </HStack>
  )
};

const mapStateToProps = createStructuredSelector({
  searchQuery: selectSearchQuery,
  searchResults: selectSearchResults
});

const mapDispatchToProps = dispatch => ({
  searchStart: (category, query) => dispatch(searchStart({ category, query })),
  clearSearchResults: () => dispatch(clearSearchResults()),
  clearSearchQuery: () => dispatch(clearSearchQuery())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)
  (SearchInput)
);