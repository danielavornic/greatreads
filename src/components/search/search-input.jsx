import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { HStack, InputGroup, InputRightElement, Input } from '@chakra-ui/react';
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
  const { term: urlTerm, category: urlCategory } = match.params;
  const categories = ['books', 'authors'];

  const [searchRequest, setSearchRequest] = useState({
    category: inputCategory,
    term: urlTerm ? plusToSpace(urlTerm) : '',
  });
  const { category, term } = searchRequest;

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
      history.push(`/search/${category}/${spaceToPlus(term)}`);
      if (headerInput) history.go(0);
      searchStart(category, term);
    }
  };

  useEffect(() => {
    if (urlCategory && !categories.includes(urlCategory)) history.push('/404');

    if (urlTerm) searchStart(category, term);

    // eslint-disable-next-line
  }, []);

  return (
    <HStack maxW={'3xl'} w={'full'}>
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
  searchStart: (category, term) => dispatch(searchStart({ category, term })),
});

export default withRouter(connect(null, mapDispatchToProps)(SearchInput));
