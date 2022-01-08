import { withRouter } from 'react-router';

import { Container, Heading } from '@chakra-ui/layout';

import { plusToSpace } from '../utils/text-manipulation';

import SearchFilter from '../components/search/search-filter';
import SearchResults from '../components/search/search-results';

const SearchPage = ({ match }) => (
  <Container maxW={'5xl'}>
    <Heading
      as='h1'
      textAlign='center'
      fontWeight={700}
      fontSize={{ base: '3xl', md: '4xl' }}
      pb={{ base: 6, md: 8 }}
    >
      Matches found for "{plusToSpace(match.params.term)}"
    </Heading>
    <SearchFilter />
    <SearchResults />
  </Container>
);

export default withRouter(SearchPage);
