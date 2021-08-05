import {
  Flex,
  Box,
  Container,
  Heading,
  Stack,
  Button
} from '@chakra-ui/react';

import { ReactComponent as Illustration } from '../assets/hero-illustration.svg';

export default function Hero() {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }}
          lineHeight={'110%'}
        >
          Track books you've read.
          <br/>
          Tell your friends what's great.
        </Heading>
        <Stack spacing={6} direction={'row'}>
          <Button
            px={6}
            colorScheme={'brand'}
            bg={'brand.500'}
            _hover={{ bg: 'brand.600' }}
            size='lg'
          >
            Get started
          </Button>
          <Button px={6} size='lg'>
            Learn more
          </Button>
        </Stack>
        <Flex w={'full'} justifyContent={'center'}>
          <Box mt={12} w={[400, 500, 600, 700]}>
            <Illustration/>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}