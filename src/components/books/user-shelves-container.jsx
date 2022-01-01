import { Box, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const UserShelvesContainer = ({ shelf }) => (
  <Box width={'240px'}>
    <Text fontWeight={'bold'}>Bookshelves</Text>
    <UnorderedList listStyleType={'none'} ms='0'>
      <ListItem textDecoration={shelf === 'all' ? 'underline' : 'none'}>
        <Link to='all'>All</Link>
      </ListItem>
      <ListItem textDecoration={shelf === 'wantToRead' ? 'underline' : 'none'}>
        <Link to='wantToRead'>Want to read</Link>
      </ListItem>
      <ListItem
        textDecoration={shelf === 'currentlyReading' ? 'underline' : 'none'}
      >
        <Link to='currentlyReading'>Currently Reading</Link>
      </ListItem>
      <ListItem textDecoration={shelf === 'read' ? 'underline' : 'none'}>
        <Link to='read'>Read</Link>
      </ListItem>
    </UnorderedList>
  </Box>
);

export default UserShelvesContainer;
