import { Link } from 'react-router-dom';

import {
  chakra,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button
} from '@chakra-ui/react';

import { ReactComponent as Logo } from '../assets/greatreads-logo.svg';

const Header = () => {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <chakra.header
      bg={bg}
      w='full'
      px={{ base: 4, md: 8, lg: 10 }}
      py={4}
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Flex alignItems='center' justifyContent='space-between' mx='auto'>
        <Flex>
          <Link to='/'>
            <Logo />
            <VisuallyHidden>greatreads</VisuallyHidden>
          </Link>
        </Flex>
        <HStack display='flex' alignItems='center' spacing={1}>
          <HStack
            spacing={1}
            mr={1}
            color='brand.500'
            display={{ base: 'inline-flex' }}
          >
            <Link to='signin'>
              <Button variant='ghost' size='sm'>Sign in</Button>
            </Link>
          </HStack>
          <Link to='/signup'>
            <Button colorScheme='brand' size='sm'>
              Sign up
            </Button>
          </Link>
        </HStack>
      </Flex>
    </chakra.header>
  );
};

export default Header;
