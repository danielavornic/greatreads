import { Link } from 'react-router-dom';
import { chakra, Flex, VisuallyHidden, HStack, Button } from '@chakra-ui/react';

import { ReactComponent as Logo } from '../../assets/greatreads-logo.svg';

const Header = () => (
  <chakra.header
    bg='rgba(255, 255, 255, 0.9)'
    w='full'
    px={{ base: 4, md: 8, lg: 10 }}
    py={4}
    borderBottom='1px'
    borderColor='gray.200'
    position='fixed'
    zIndex='100'
    backdropFilter='saturate(190%) blur(5px)'
    boxShadow='xs'
  >
    <Flex alignItems='center' justifyContent='space-between' mx='auto'>
      <Link to='/'>
        <Logo />
        <VisuallyHidden>greatreads</VisuallyHidden>
      </Link>
      <HStack>
        <Link to='/signin'>
          <Button variant='ghost' size='sm'>
            Sign in
          </Button>
        </Link>
        <Link to='/signup'>
          <Button colorScheme='brand' size='sm'>
            Sign up
          </Button>
        </Link>
      </HStack>
    </Flex>
  </chakra.header>
);

export default Header;
