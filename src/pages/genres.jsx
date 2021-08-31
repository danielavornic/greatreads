import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { selectGenresData } from '../redux/genres/genres.selectors';

import { 
  Container,
  Grid,
  Box
} from '@chakra-ui/layout';
import {
  Heading,
  Text,
  List,
  ListItem
} from '@chakra-ui/react';

import SearchInput from '../components/search-input';

const Genre = ({ genre, subgenres }) => (
  <Box
    border='1px'
    borderColor='gray.200'
    borderRadius='10px'
    padding={['24px', '28px']}
  >
    <Text 
      fontWeight='700' 
      fontSize='lg' 
      align='center'
      textTransform='uppercase'
      pb='12px' 
    >
      <Link to={`/genres/${genre.toLowerCase().replace(/ /g, '_')}`}>
        {genre}
      </Link>
    </Text>
    <List>
      {
        subgenres.map(
          subgenre =>
          <ListItem key={subgenre}>
            <Text color={'brand.600'} textDecor='underline'>
              <Link to={`/genres/${subgenre.toLowerCase().replace(/ /g, '_')}`}>
                {subgenre}
              </Link>
            </Text>
          </ListItem>
        )
      }
    </List>
  </Box>
);

const GenresPage = ({ genres }) => (
  <Container maxW={'5xl'} my='48px'>
    <Heading
      as='h1'
      fontWeight={700}
      fontSize={{ base: '3xl', md: '4xl' }}
      align='center'
      pb='36px'
    >
      Genres
    </Heading>
    <Box align='center' mb={['28px', '36px']}>
      <SearchInput inputCategory='genres' />
    </Box>
    <Grid
      templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
      gap={[ 4, 4, 6 ]}
      w={'full'}
    >
      {
        genres.map(
          ({ genre, subgenres }) => <Genre key={genre} genre={genre} subgenres={subgenres} />
        )
      }
    </Grid>
  </Container>
);

const mapStateToProps = createStructuredSelector({
  genres: selectGenresData
});

export default connect(mapStateToProps)(GenresPage);