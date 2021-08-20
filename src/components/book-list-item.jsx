import { Link } from 'react-router-dom';
import {
  Heading,
  Text,
  Box,
  Grid
} from '@chakra-ui/layout';

import { Image } from '@chakra-ui/react'

const BookListItem = ({ bookKey, title, author_name, cover_i, first_publish_year}) => {
  const bookPageLink = bookKey.split('/')[2];

  return (
  <Box 
    border='1px'
    borderColor='gray.200'
    borderRadius='10px'
    padding='28px'
    width={'full'}
  >
    <Link to={`/book/${bookPageLink}`}>
      <Grid 
        templateColumns={[ 'repeat(1, 1fr)', '100px 1fr']}
        gap={[ 4, 4, 6 ]}
        w={'full'}
      >
        <Box>
          <Image 
            src={cover_i ? `http://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : 'https://openlibrary.org/images/icons/avatar_book.png'}
            alt={`Cover of "${title}"`}
            boxSize='100px'
            height='auto'
          />
        </Box>
        <Box>
          <Heading as={'h5'} fontSize={{ base: 'xl', md: '2xl' }}>
            {title}
          </Heading>
          <Text fontSize={{ base: 'lg', md: 'xl' }} mb='12px'>
            by {author_name ? author_name[0] : 'Unknown author'}
          </Text>
          <Text color='gray.500'>
            first published in {first_publish_year}
          </Text>
        </Box>
      </Grid>
    </Link>
    
  </Box>
)
  };

export default BookListItem;