import { Link } from 'react-router-dom';

import {
  Container,
  Flex,
  Grid,
  Box,
  Heading,
  Text,
  Stack,
  VStack,
  Button
} from '@chakra-ui/react';
import {
  RiBook2Fill,
  RiStarFill,
  RiFileTextFill
} from 'react-icons/ri';
import { Divider } from '@chakra-ui/layout';

import SearchInput from '../components/search-input';

import { ReactComponent as Illustration } from '../assets/hero-illustration.svg';
import { ReactComponent as RomanceGenre } from '../assets/genre-icons/romance.svg';
import { ReactComponent as ArtGenre } from '../assets/genre-icons/art.svg';
import { ReactComponent as HistoryGenre } from '../assets/genre-icons/history.svg';
import { ReactComponent as FantasyGenre } from '../assets/genre-icons/fantasy.svg';
import { ReactComponent as DetectiveGenre } from '../assets/genre-icons/detective.svg';
import { ReactComponent as MoreGenres } from '../assets/genre-icons/more.svg';

const Hero = () => (
  <Container maxW={'5xl'}>
    <Stack
      textAlign={'center'}
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 14, md: 20 }}
    >
      <Heading
        as='h1'
        fontWeight={700}
        fontSize={{ base: '4xl', md: '5xl' }}
      >
        Track books you've read.
        <br />
        Tell your friends what's great.
      </Heading>
      <Text color={'gray.500'} maxW={'3xl'} fontSize={{ base: 'md', md: 'xl' }}>
        greatreads is is a social network for sharing your taste in literature.
        <br />
        Use it as a diary to record your opinion about books as you read them,
        or just to keep track of books you’ve read in the past.
      </Text>
      <Stack spacing={6} direction={'row'}>
        <Link to='signin'>
          <Button
            px={6}
            colorScheme={'brand'}
            bg={'brand.500'}
            _hover={{ bg: 'brand.600' }}
            size='lg'
          >
            Get started
          </Button>
        </Link>
        <Link to='about'>
          <Button px={6} size='lg'>
            Learn more
          </Button>
        </Link>
      </Stack>
      <Flex w={'full'} justifyContent={'center'}>
        <Box mt={12} w={[ 400, 500, 600 ]}>
          <Illustration />
        </Box>
      </Flex>
    </Stack>
  </Container>
);

const ExploreSection = () => (
  <Container maxW={'5xl'}>
    <Stack
      textAlign={'center'}
      align={'center'}
      spacing={{ base: 8, md: 12 }}
      py={{ base: 16, md: 24 }}
    >
      <Heading
        as='h2'
        fontWeight={700}
        fontSize={{ base: '3xl', md: '4xl' }}
        lineHeight={'110%'}
        pb='16px'
      >
        Explore the extensive library
      </Heading>
      <SearchInput inputCategory='books'/>
      <GenreListPreview />
    </Stack>
  </Container>
);

const GenreItem = ({ name, children, color }) => {
  const genrePath = (name !== 'More') ? name.toLowerCase() : '';

  return (
    <Link to={`/genres/${genrePath}`}>
      <Box
        border='1px'
        borderColor='gray.200'
        borderRadius='10px'
        _hover={{
          borderColor: color
        }}
      >
        <VStack padding='28px'>
          {children}
          <Text pt={2}>{name}</Text>
        </VStack>
      </Box>
    </Link>
  )
};

const GenreListPreview = () => (
  <Grid
    templateColumns={[ 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(6, 1fr)' ]}
    gap={[ 4, 4, 6, 6 ]}
    w={'full'}
  >
    <GenreItem name='Romance' color='#FF8080'>
      <RomanceGenre height='56px' />
    </GenreItem>
    <GenreItem name='Art' color='#4FD1C5'>
      <ArtGenre height='56px' />
    </GenreItem>
    <GenreItem name='History' color='#F6AD55'>
      <HistoryGenre height='56px' />
    </GenreItem>
    <GenreItem name='Fantasy' color='#F6E05E'>
      <FantasyGenre height='56px' />
    </GenreItem>
    <GenreItem name='Detective' color='#63B3ED'>
      <DetectiveGenre height='56px' />
    </GenreItem>
    <GenreItem name='More' color='#9F7AEA'>
      <MoreGenres height='56px' />
    </GenreItem>
  </Grid>
);

const FeatureItem = ({ children, text }) => (
  <Box bg={'brand.25'} borderRadius='6px'>
    <VStack padding='36px'>
      <Box padding='12px' bg={'brand.200'} borderRadius='50%' mb='12px'>
        {children}
      </Box>
      <Text color={'gray.800'} fontSize={{ base: 'md', md: 'lg' }}>{text}</Text>
    </VStack>
  </Box>
);

const FeaturesSection = () => (
  <Stack
    w='full'
    align={'center'}
    spacing={{ base: 8, md: 12 }}
    py={{ base: 16, md: 24 }}
  >
    <Heading
      as='h2'
      textAlign={'center'}
      fontWeight={700}
      fontSize={{ base: '3xl', md: '4xl' }}
      lineHeight={'110%'}
      pb='16px'
    >
      Features
    </Heading>
    <Container maxW='5xl'>
      <Grid
        templateColumns={[ 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(3, 1fr)' ]}
        gap={[ 4, 4, 6 ]}
        w={'full'}
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
    <ExploreSection />
    <Divider />
    <FeaturesSection />
  </div>
)

export default HomePage;