import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  HStack,
  Select,
  InputGroup,
  InputRightElement,
  Input,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

import { searchStart } from '../../redux/search/search.actions';
import { spaceToPlus, plusToSpace } from '../../utils/text-manipulation';

const SearchInput = ({
  inputCategory,
  headerInput,
  searchStart,
  match,
  history,
}) => {
  const {
    term: urlTerm,
    facet: urlFacet,
    category: urlCategory,
  } = match.params;
  const categories = ['books', 'authors'];
  const facets = ['all', 'title', 'author'];

  const [searchRequest, setSearchRequest] = useState({
    category: inputCategory,
    term: urlTerm ? plusToSpace(urlTerm) : '',
    facet: urlFacet ? urlFacet : 'all',
  });
  const { category, facet, term } = searchRequest;

  const [headerInputTerm, setHeaderInputTerm] = useState(term);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setSearchRequest({ ...searchRequest, [name]: value });
    setHeaderInputTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleSubmit();
      event.currentTarget.blur();
    }
  };

  const handleSubmit = () => {
    if (term !== '') {
      const pathFacet = category === 'books' ? `/${facet}` : '';
      history.push(`/search/${category}/${spaceToPlus(term)}${pathFacet}`);
      if (headerInput) history.go(0);
      searchStart(category, term, facet);
    }
  };

  useEffect(() => {
    if (
      (urlCategory && !categories.includes(urlCategory)) ||
      (urlFacet && !facets.includes(urlFacet))
    )
      history.push('/404');

    if (urlTerm) searchStart(category, term, facet);

    // eslint-disable-next-line
  }, []);

  return (
    <HStack maxW={'3xl'} w={'full'}>
      {inputCategory === 'books' && !headerInput ? (
        <Select
          name='facet'
          size='lg'
          w={{ base: '42%', md: '30%', lg: '20%' }}
          colorScheme={'brand'}
          bg={'brand.50'}
          defaultValue={facet}
          onChange={handleChange}
        >
          <option fontSize={{ base: 'md', md: 'lg' }} value='all'>
            All
          </option>
          <option fontSize={{ base: 'md', md: 'lg' }} value='title'>
            Title
          </option>
          <option fontSize={{ base: 'md', md: 'lg' }} value='author'>
            Author
          </option>
        </Select>
      ) : null}
      <InputGroup size={headerInput ? 'sm' : 'lg'}>
        {headerInput ? (
          <Input
            name='term'
            type='search'
            placeholder={`Search ${category}...`}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={headerInputTerm}
            onBlur={() => setHeaderInputTerm('')}
          />
        ) : (
          <Input
            name='term'
            type='search'
            placeholder={`Search ${category}...`}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            defaultValue={plusToSpace(term)}
          />
        )}
        <InputRightElement
          children={<AiOutlineSearch />}
          cursor='pointer'
          onClick={handleSubmit}
        />
      </InputGroup>
    </HStack>
  );
};

const mapDispatchToProps = (dispatch) => ({
  searchStart: (category, term, facet) =>
    dispatch(searchStart({ category, term, facet })),
});

export default withRouter(connect(null, mapDispatchToProps)(SearchInput));
