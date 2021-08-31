import { withRouter } from 'react-router';

import {
  Container,
  Heading,
  Box
} from '@chakra-ui/layout';

import SearchInput from '../components/search-input';
import SearchResultsContainer from '../components/search-results-container';

const SearchPage = ({ match }) => (
  <Container maxW={'5xl'} my='48px'>
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
    <SearchResultsContainer />
  </Container>
);

export default withRouter(SearchPage);