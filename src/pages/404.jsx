import { Link } from 'react-router-dom';
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Stack,
  Button,
} from '@chakra-ui/react';

import { ReactComponent as Illustration } from '../assets/404-illustration.svg';

const Page404 = () => (
  <Container maxW={'5xl'}>
    <Stack textAlign={'center'} align={'center'} spacing={{ base: 8, md: 10 }}>
      <Heading as='h1' fontWeight={700} fontSize={{ base: '4xl', md: '5xl' }}>
        Page not found (404)
      </Heading>
      <Text color={'gray.500'} maxW={'3xl'} fontSize={{ base: 'md', md: 'xl' }}>
        Sorry, we couldn't find what you requested or the page no longer exists.
        <br />
        Perhaps you can return to homepage and see if you can find what you are
        looking for.
      </Text>
      <Stack spacing={6} direction={'row'}>
        <Link to='/'>
          <Button
            px={6}
            colorScheme={'brand'}
            bg={'brand.500'}
            _hover={{ bg: 'brand.600' }}
            size='lg'
          >
            Back to home
          </Button>
        </Link>
      </Stack>
      <Flex w={'full'} justifyContent={'center'}>
        <Box mt={12} w={[400, 500, 600]}>
          <Illustration />
        </Box>
      </Flex>
    </Stack>
  </Container>
);

export default Page404;
