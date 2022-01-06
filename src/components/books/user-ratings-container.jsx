import { Link } from 'react-router-dom';
import { Box, Text, UnorderedList, ListItem } from '@chakra-ui/react';

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

  return (
    <Box
      width={{ base: 'full', md: '200px' }}
      height={'fit-content'}
      padding={4}
      border='1px'
      borderColor='gray.200'
      borderRadius='10px'
    >
      <Text fontWeight={'bold'}>Ratings</Text>
      <UnorderedList listStyleType={'none'} ms='0'>
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
