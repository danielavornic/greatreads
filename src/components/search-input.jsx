import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useBeforeunload } from 'react-beforeunload';

import { searchStart, clearSearchQuery, clearSearchResults } from '../redux/library/library.actions';

import {
  HStack,
  Select,
  InputGroup,
  InputRightElement,
  Input
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

import { selectSearchQuery} from '../redux/library/library.selectors';

const SearchInput = ({ searchStart, searchQuery, storeValue, clearSearchQuery, history, location }) => {
  const urlCategory = location.pathname.split('/')[2];
  const urlQuery = location.pathname.split('/')[3];
  
  const [ searchRequest, setSearchRequest ] = useState({
    category: (storeValue && urlCategory) ? urlCategory : 'all',
    query: (storeValue && urlQuery) ? urlQuery : ''
  });
  const { category, query } = searchRequest;
  useEffect(() => setSearchRequest({ ...searchRequest }), [searchQuery]);

  const clearQuery = () => {
    if (searchQuery && !urlQuery) clearSearchQuery();
  }

  useEffect(() => {
    if (searchQuery && (urlQuery !== searchQuery.query || urlCategory !== searchQuery.category)) 
      searchStart(urlCategory, urlQuery);
    else if (!storeValue && searchQuery) 
      clearQuery();

    return () => clearQuery();
  }, []);

  useBeforeunload(() => clearQuery());

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
    if (query !== '') {
      searchStart(category, query);
      history.push(`/search/${category}/${query}`);
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
  searchQuery: selectSearchQuery
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