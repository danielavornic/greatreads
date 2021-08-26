import {
  Container,
  Heading,
  Box,
} from '@chakra-ui/layout';

import SearchInput from '../components/search-input';
import SearchResultsContainer from '../components/search-results-container';

const SearchPage = () => (
  <Container maxW={'5xl'} my='48px'>
    <Heading
      as='h1'
      textAlign='center'
      fontWeight={700}
      fontSize={{ base: '3xl', md: '4xl' }}
      lineHeight={'110%'}
      pb='30px'
    >
      Search
    </Heading>
    <Box align='center'>
      <SearchInput />
    </Box>
    <SearchResultsContainer view='table'/>
  </Container>
);

export default SearchPage;