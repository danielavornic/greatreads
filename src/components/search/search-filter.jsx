import { Link } from 'react-router-dom';

import { Flex, HStack, Text } from '@chakra-ui/react';
import { useRouteMatch } from 'react-router-dom';

const SearchFilter = () => {
  const { category, term } = useRouteMatch().params;
  const categories = ['books', 'authors'];

  return (
    <Flex justifyContent={'center'} width={'full'}>
      <HStack
        bg={'brand.50'}
        borderRadius={4}
        width={'fit-content'}
        px={8}
        py={3}
        spacing={4}
      >
        <Text>Show results for:</Text>
        {categories.map((c) => (
          <Link key={c} to={`/search/${c}/${term}`}>
            <Text
              textDecoration={category === c ? 'underline' : 'none'}
              _hover={{ textDecoration: 'underline' }}
            >
              {c}
            </Text>
          </Link>
        ))}
      </HStack>
    </Flex>
  );
};

export default SearchFilter;
