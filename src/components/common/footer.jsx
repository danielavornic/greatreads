import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaGithub, FaDribbble } from 'react-icons/fa';

const SocialButton = ({ children, label, href, title }) => (
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
    title={title}
    transition={'background 0.3s ease'}
    _hover={{
      color: 'brand.500',
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
      direction={{ base: 'column', md: 'row' }}
      spacing={4}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'center' }}
    >
      <Text>© Made by Daniela Vornic</Text>
      <Stack direction={'row'} spacing={6}>
        <SocialButton
          label={'Github'}
          href={'https://github.com/danielavornic/greatreads'}
          title={'Source code'}
        >
          <FaGithub />
        </SocialButton>
        <SocialButton
          label={'Dribbble'}
          href={'https://dribbble.com/danielavornic'}
          title={'Dribbble account'}
        >
          <FaDribbble />
        </SocialButton>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
