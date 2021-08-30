import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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

const Genre = ({ genre, subgenres }) => (
  <Box
    border='1px'
    borderColor='gray.200'
    borderRadius='10px'
    padding={['24px', '28px']}
  >
    <Text fontWeight='700' fontSize='lg' pb='12px' color={'brand.600'} align='center'>
      <Link to={`/genres/${genre.toLowerCase().replace(/ /g, '_')}`}>
        {genre}
      </Link>
    </Text>
    <List>
      {
        subgenres.map(
          subgenre =>
          <ListItem key={subgenre}>
            <Link to={`/genres/${subgenre.toLowerCase().replace(/ /g, '_')}`}>
              <Text color={'gray.600'} textDecor='underline'>
                {subgenre}
              </Text>
            </Link>
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