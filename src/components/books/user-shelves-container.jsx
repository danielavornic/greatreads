import { Link } from 'react-router-dom';
import { Box, Text, UnorderedList, ListItem } from '@chakra-ui/react';

const UserShelvesContainer = ({ shelf }) => {
  const shelves = ['all', 'currentlyReading', 'wantToRead', 'read'];

  const camelCaseToSentenceCase = (text) => {
    const result = text.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <Box
      width={{ base: 'full', md: '200px' }}
      height={'fit-content'}
      me={6}
      mb={{ base: 4, md: 0 }}
      padding={4}
      border='1px'
      borderColor='gray.200'
      borderRadius='10px'
    >
      <Text fontWeight={'bold'}>Bookshelves</Text>
      <UnorderedList listStyleType={'none'} ms='0'>
        {shelves.map((s) => (
          <ListItem key={s}>
            <Link to={s}>
              <Text
                textDecoration={shelf === s ? 'underline' : 'none'}
                _hover={{ textDecoration: 'underline' }}
              >
                {camelCaseToSentenceCase(s)}
              </Text>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default UserShelvesContainer;