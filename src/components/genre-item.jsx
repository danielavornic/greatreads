import { Link } from 'react-router-dom';

import {
  Box,
  VStack,
  Text
} from '@chakra-ui/react';

const GenreItem = ({ name, children }) => {
  const genrePath = (name !== 'More') ? name.toLowerCase() : '';

  return (
    <Link to={`/genres/${genrePath}`}>
      <Box
        border='1px'
        borderColor='gray.200'
        borderRadius='10px'
      >
        <VStack padding='28px'>
          {children}
          <Text pt={2}>{name}</Text>
        </VStack>
      </Box>
    </Link>
  )
};

export default GenreItem;