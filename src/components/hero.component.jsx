import {
  Flex,
  Box,
  Container,
  Heading,
  Text,
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
        py={{ base: 14, md: 20 }}>
        <Heading
          fontWeight={700}
          fontSize={{ base: '2rem', lg: '3rem' }}
          lineHeight={'110%'}
        >
          Track books you've read.
          <br/>
          Tell your friends what's great.
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'} fontSize={{base: 'md', md: 'lg', lg: 'xl'}}>
          greatreads is is a social network for sharing your taste in literature. 
          <br/>
          Use it as a diary to record your opinion about books as you read them, or just to keep track of books you’ve read in the past. 
        </Text>
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
          <Box mt={12} w={[400, 500, 600]}>
            <Illustration/>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}