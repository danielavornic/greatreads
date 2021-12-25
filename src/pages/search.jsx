import { withRouter } from 'react-router';

import { Container, Heading, Box } from '@chakra-ui/layout';

import SearchInput from '../components/search/search-input';
import SearchResults from '../components/search/search-results';

const SearchPage = ({ match }) => (
  <Container maxW={'5xl'}>
    <Heading
      as='h1'
      textAlign='center'
      fontWeight={700}
      fontSize={{ base: '3xl', md: '4xl' }}
      textTransform='capitalize'
      pb={['28px', '36px']}
    >
      Search {match.params.category}
    </Heading>
    <Box align='center'>
      <SearchInput inputCategory={match.params.category} />
    </Box>
    {match.params.facet || match.params.term ? <SearchResults /> : null}
  </Container>
);

export default withRouter(SearchPage);
