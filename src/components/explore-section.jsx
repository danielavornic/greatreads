import {
  Container,
  Heading,
  Stack,
} from '@chakra-ui/react';

import SearchInput from './search-input';
import GenreListPreview from './genre-list-preview';

const ExploreSection = () => (
  <Container maxW={'5xl'}>
    <Stack
      textAlign={'center'}
      align={'center'}
      spacing={{ base: 8, md: 12 }}
      py={{ base: 16, md: 24 }}
    >
      <Heading
        as='h2'
        fontWeight={700}
        fontSize={{ base: '3xl', md: '4xl' }}
        lineHeight={'110%'}
        pb='16px'
      >
        Explore the extensive library
      </Heading>
      <SearchInput />
      <GenreListPreview/>
    </Stack>
  </Container>
);

export default ExploreSection;
