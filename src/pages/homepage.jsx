import {Link} from 'react-router-dom';

import {
  Container,
  Flex,
  Grid,
  Box,
  Heading,
  Text,
  Stack,
  VStack,
  Button,
} from '@chakra-ui/react';
import {RiBook2Fill, RiStarFill, RiFileTextFill} from 'react-icons/ri';
import {Divider} from '@chakra-ui/layout';

import SearchInput from '../components/search/search-input';
import {ReactComponent as Illustration} from '../assets/hero-illustration.svg';

const Hero = () => (
  <Container maxW={'5xl'}>
    <Stack
      textAlign={'center'}
      align={'center'}
      spacing={{base: 8, md: 10}}
      py={{base: 14, md: 20}}
    >
      <Heading as='h1' fontWeight={700} fontSize={{base: '4xl', md: '5xl'}}>
        Track books you've read.
        <br />
        Tell your friends what's great.
      </Heading>
      <Text color={'gray.500'} maxW={'3xl'} fontSize={{base: 'md', md: 'xl'}}>
        greatreads is is a social network for sharing your taste in literature.
        <br />
        Use it as a diary to record your opinion about books as you read them,
        or just to keep track of books you’ve read in the past.
      </Text>
      <Stack spacing={6} direction={'row'}>
        <Link to='signup'>
          <Button
            px={6}
            colorScheme={'brand'}
            bg={'brand.500'}
            _hover={{bg: 'brand.600'}}
            size='lg'
          >
            Get started
          </Button>
        </Link>
        <Link to='signin'>
          <Button px={6} size='lg'>
            Sign in
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

const FeatureItem = ({children, text}) => (
  <Box bg={'brand.25'} borderRadius='6px'>
    <VStack padding='36px'>
      <Box padding='12px' bg={'brand.200'} borderRadius='50%' mb='12px'>
        {children}
      </Box>
      <Text color={'gray.800'} fontSize={{base: 'md', md: 'lg'}}>
        {text}
      </Text>
    </VStack>
  </Box>
);

const FeaturesSection = () => (
  <Stack
    w='full'
    align={'center'}
    spacing={{base: 8, md: 12}}
    py={{base: 16, md: 24}}
  >
    <Heading
      as='h2'
      textAlign={'center'}
      fontWeight={700}
      fontSize={{base: '3xl', md: '4xl'}}
      lineHeight={'110%'}
    >
      Features
    </Heading>
    <Container maxW='5xl' mt={2} align={'center'}>
      <SearchInput inputCategory='books' />
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(3, 1fr)']}
        gap={[4, 4, 6]}
        w={'full'}
        mt={[6, 8, 10]}
      >
        <FeatureItem text='Keep track of every book you’ve ever read (or just start from the day you join)'>
          <RiBook2Fill color='white' size='24px' />
        </FeatureItem>
        <FeatureItem text='Rate each book on a five-star scale (with halves) to record and share your reaction'>
          <RiStarFill color='white' size='24px' />
        </FeatureItem>
        <FeatureItem text='Write and share reviews, and follow friends and other members to read theirs'>
          <RiFileTextFill color='white' size='24px' />
        </FeatureItem>
      </Grid>
    </Container>
  </Stack>
);

const HomePage = () => (
  <div>
    <Hero />
    <Divider />
    <FeaturesSection />
  </div>
);

export default HomePage;
