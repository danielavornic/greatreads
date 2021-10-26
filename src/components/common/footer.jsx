import { Link } from 'react-router-dom';

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';

import { FaGithub, FaDribbble } from 'react-icons/fa';

import { ReactComponent as Logo } from '../../assets/greatreads-logo.svg';

const SocialButton = ({ children, label, href }) => (
  <chakra.button
    bg={'blackAlpha.100'}
    rounded={'full'}
    w={8}
    h={8}
    cursor={'pointer'}
    as={'a'}
    href={href}
    target='_blank'
    display={'inline-flex'}
    alignItems={'center'}
    justifyContent={'center'}
    transition={'background 0.3s ease'}
    _hover={{
      bg: 'blackAlpha.200',
    }}
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </chakra.button>
);

const Footer = () => (
  <Box bg={'gray.50'} color={'gray.700'}>
    <Container
      as={Stack}
      maxW={'6xl'}
      py={4}
      spacing={4}
      justify={'center'}
      align={'center'}
      pt='24px'
    >
      <Logo />
      <Stack direction={'row'} spacing={6}>
        <Link to='/'>
          <Text _hover={{ textDecoration: 'underline' }}>Home</Text>
        </Link>
        <Link to='/books'>
          <Text _hover={{ textDecoration: 'underline' }}>Books</Text>
        </Link>
        <Link to='/genres'>
          <Text _hover={{ textDecoration: 'underline' }}>Genres</Text>
        </Link>
        <Link to='/authors'>
          <Text _hover={{ textDecoration: 'underline' }}>Authors</Text>
        </Link>
      </Stack>
    </Container>

    <Box
      borderTopWidth={1}
      borderStyle={'solid'}
      borderColor={'gray.200'}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© Made by Daniela Vornic</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Github'} href={'https://github.com/danielavornic'}>
            <FaGithub />
          </SocialButton>
          <SocialButton label={'Dribbble'} href={'https://dribbble.com/danielavornic'}>
            <FaDribbble />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  </Box>
);

export default Footer;