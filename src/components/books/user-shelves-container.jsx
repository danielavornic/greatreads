import { useState } from 'react';

import { Link } from 'react-router-dom';
import {
  Box,
  Text,
  UnorderedList,
  ListItem,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import { camelToSentenceCase } from '../../utils/text-manipulation';

const UserShelvesContainer = ({ username, shelf }) => {
  const shelves = ['all', 'currentlyReading', 'wantToRead', 'read'];

  const [display, setDisplay] = useState('block');

  return (
    <Box
      width={{ base: 'full', md: '200px' }}
      height={'fit-content'}
      mb={{ base: 2, md: 0 }}
      padding={4}
      border='1px'
      borderColor='gray.200'
      borderRadius='10px'
    >
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text fontWeight={'bold'}>Bookshelves</Text>
        <IconButton
          icon={display === 'block' ? <ChevronUpIcon /> : <ChevronDownIcon />}
          size={'sm'}
          display={{ base: 'block', md: 'none' }}
          aria-label={'Show/Hide bookshelves'}
          bg={'brand.50'}
          onClick={() => setDisplay(display === 'block' ? 'none' : 'block')}
        ></IconButton>
      </Flex>
      <UnorderedList listStyleType={'none'} ms='0' mt={3} display={display}>
        {shelves.map((s) => (
          <ListItem key={s}>
            <Link to={`/users/${username}/books/${s}`}>
              <Text
                textDecoration={shelf === s ? 'underline' : 'none'}
                _hover={{ textDecoration: 'underline' }}
              >
                {camelToSentenceCase(s)}
              </Text>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default UserShelvesContainer;
