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

const UserRatingsContainer = ({ username, rating }) => {
  const ratings = ['5', '4½', '4', '3½', '3', '2½', '2', '1½', '1', '½'];
  const ratingsNum = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const stars = [
    '★★★★★',
    '★★★★½',
    '★★★★',
    '★★★½',
    '★★★',
    '★★½',
    '★★',
    '★½',
    '★',
    '½',
  ];

  const [display, setDisplay] = useState('block');

  return (
    <Box
      width={{ base: 'full', md: '200px' }}
      height={'fit-content'}
      padding={4}
      border='1px'
      borderColor='gray.200'
      borderRadius='10px'
    >
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text fontWeight={'bold'}>Ratings</Text>
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
        {ratings.map((r, i) => (
          <ListItem key={r}>
            <Link to={`/users/${username}/books/read/${r}`}>
              <Text
                textDecoration={rating === ratingsNum[i] ? 'underline' : 'none'}
                _hover={{ textDecoration: 'underline' }}
              >
                {stars[i]}
              </Text>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default UserRatingsContainer;
