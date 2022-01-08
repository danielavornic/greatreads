import { withRouter } from 'react-router';

import { Container, Heading } from '@chakra-ui/layout';

import SearchResults from '../components/search/search-results';

const SearchPage = ({ match }) => (
  <Container maxW={'5xl'}>
    <Heading
      as='h1'
      textAlign='center'
      fontWeight={700}
      fontSize={{ base: '3xl', md: '4xl' }}
      pb={{ base: 3, md: 6 }}
    >
      {`Matches found for "${match.params.term}`}
    </Heading>
    <SearchResults />
  </Container>
);

export default withRouter(SearchPage);
