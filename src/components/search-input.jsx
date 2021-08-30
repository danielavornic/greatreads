import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { searchStart, clearSearchResults } from '../redux/books/books.actions';

import {
  HStack,
  Select,
  InputGroup,
  InputRightElement,
  Input
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchInput = ({ inputCategory, searchStart, clearSearchResults, match, history }) => {
  const urlCategory = match.params.category;
  const urlTerm = match.params.term;
  const urlFacet = match.params.facet;

  const categories = ['books', 'genres', 'authors'];
  const facets = ['all', 'title', 'author', 'genre'];
  
  const [ searchRequest, setSearchRequest ] = useState({
    category: urlCategory ? urlCategory : 'books',
    term: urlTerm ? urlTerm : '',
    facet: urlFacet ? urlFacet : 'all'
  });
  const { category, facet, term } = searchRequest;

  useEffect(() => {
    setSearchRequest({ ...searchRequest });
  }, [match]);

  useEffect(() => {
    if (urlCategory && !categories.includes(urlCategory)) {
      history.push(`/search/books/${term}`);
      window.location.reload();
    }
    if (urlFacet && !facets.includes(urlFacet)) {
      history.push(`/search/${category}/${term}/all`);
      window.location.reload();
    } 
    
    if (urlTerm) {
      searchStart(category, term, facet);
    } else {
      clearSearchResults();
    }
  }, []);

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
    if (term !== '') {
      clearSearchResults();
      searchStart(category, term, facet);
      history.push(`/search/${category}/${term}/${facet}`);
    }
  }

  return (
    <HStack maxW={'3xl'} w={'full'}>
      {
        inputCategory === 'books'
        ? <Select
            name='facet'
            size='lg'
            w={{ base: '42%', md: '30%', lg: '20%' }}
            colorScheme={'brand'}
            bg={'brand.50'}
            defaultValue={facet}
            onChange={handleChange}
          >
            <option fontSize={{ base: 'md', md: 'lg' }} value='all'>All</option>
            <option fontSize={{ base: 'md', md: 'lg' }} value='title'>Title</option>
            <option fontSize={{ base: 'md', md: 'lg' }} value='author'>Author</option>
            <option fontSize={{ base: 'md', md: 'lg' }} value='subject'>Genre</option>
          </Select>
          : null
      }

      <InputGroup size='lg'>
        <Input
          name='term'
          type='search'
          placeholder={`Search ${category}...`}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          defaultValue={term}
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

const mapDispatchToProps = dispatch => ({
  searchStart: (category, term, facet) => dispatch(searchStart({ category, term, facet })),
  clearSearchResults: () => dispatch(clearSearchResults())
});

export default withRouter(
  connect(null, mapDispatchToProps)
  (SearchInput)
);