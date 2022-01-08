import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { HStack, InputGroup, InputRightElement, Input } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

import { searchStart } from '../../redux/search/search.actions';
import { spaceToPlus, plusToSpace } from '../../utils/text-manipulation';

const SearchInput = ({ searchStart, history, match }) => {
  const { term: urlTerm, category: urlCategory } = match.params;
  const categories = ['books', 'authors'];

  const [searchRequest, setSearchRequest] = useState({
    category: urlCategory ? urlCategory : 'books',
    term: urlTerm ? plusToSpace(urlTerm) : '',
  });
  const { category, term } = searchRequest;
  const [inputTerm, setInputTerm] = useState(term);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setSearchRequest({ ...searchRequest, [name]: value });
    setInputTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleSubmit();
      event.currentTarget.blur();
    }
  };

  const handleSubmit = () => {
    if (term !== '') history.push(`/search/${category}/${spaceToPlus(term)}`);
  };

  useEffect(() => {
    if (urlCategory && !categories.includes(urlCategory)) history.push('/404');

    if (urlTerm) {
      searchStart(urlCategory, term);
      setSearchRequest({ ...searchRequest, category: urlCategory });
    } else {
      setSearchRequest({ ...searchRequest, category: 'books' });
      setInputTerm('');
    }
    // eslint-disable-next-line
  }, [urlTerm, urlCategory]);

  return (
    <HStack maxW={'3xl'} w={'full'}>
      <InputGroup size={'sm'} borderRadius={'md'}>
        <Input
          name='term'
          type='search'
          placeholder={`Search...`}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={inputTerm}
        />
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
  searchStart: (category, term) => dispatch(searchStart({ category, term })),
});

export default withRouter(connect(null, mapDispatchToProps)(SearchInput));
