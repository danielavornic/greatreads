import { Link } from 'react-router-dom';

import {
  Heading,
  Text,
  Box,
  Grid
} from '@chakra-ui/layout';
import { Image, Tooltip } from '@chakra-ui/react';

const CoverView = ({ bookKey, bookCoverUrl, title }) => (
  <Box
    border='1px'
    borderColor='gray.200'
    padding='10px'
    borderRadius='10px'
  >
    <Link to={`/books/${bookKey}`}>
      <Tooltip label={title}>
        <Image 
          src={bookCoverUrl}
          alt={`Cover of "${title}"`}
          width={['100px', '120px']}
          height='auto'
          boxShadow='lg'
        />
      </Tooltip>
    </Link>
  </Box>
);

const TableView = ({ bookKey, bookCoverUrl, title, author_name, author_key, first_publish_year }) => (
  <Box 
    border='1px'
    borderColor='gray.200'
    borderRadius='10px'
    padding={['24px', '28px']}
    width={'full'}
  >
    <Grid 
      templateColumns={[ '80px 1fr', '100px 1fr']}
      gap={[ 4, 4, 6 ]}
      w={'full'}
    >
      <Box>
        <Link to={`/books/${bookKey}`}>
          <Image 
            src={bookCoverUrl}
            alt={`Cover of "${title}"`}
            width={['80px', '100px']}
            height='auto'
          />
        </Link>
      </Box>
      <Box>
        <Link to={`/books/${bookKey}`}>
          <Heading 
            as={'h5'} 
            fontSize={{ base: 'xl', md: '2xl' }}
            mb='4px'
          >
            {title}
          </Heading>
        </Link>
        <Heading 
          as={'h6'} 
          fontWeight='400' 
          fontSize={{ base: 'lg', md: 'xl' }} 
          mb='12px'
        >
          by 
          {
            author_name 
            ? author_name.map(
                (name, idx) => 
                (idx < author_name.length - 1) 
                ? <Link to={`/authors/${author_key[idx]}`}> {name},</Link>
                : <Link to={`/authors/${author_key[idx]}`}> {name}</Link>
              ) 
            : ' Unknown author'
          }
        </Heading>
        <Text color='gray.500'>
          first published in {first_publish_year}
        </Text>
      </Box>
    </Grid>
  </Box>
);

const BookListItem = ({ view, cover_i, ...otherBookProps }) => {
  const bookCoverUrl = cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` 
                               : 'https://openlibrary.org/images/icons/avatar_book.png';

  return (
    view === 'table'
    ? <TableView bookCoverUrl={bookCoverUrl} {...otherBookProps} />
    : <CoverView bookCoverUrl={bookCoverUrl} {...otherBookProps} />
  )
};

export default BookListItem;