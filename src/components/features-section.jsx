import {
  Container,
  Grid,
  Heading,
  Stack,
} from '@chakra-ui/react';

import {
  RiBook2Fill,
  RiStarFill,
  RiFileTextFill
} from 'react-icons/ri';

import FeatureItem from './feature-item';

const FeaturesSection = () => (
  <Stack
    w='full'
    bg={'brand.25'}
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
        <FeatureItem 
          icon={<RiBook2Fill color='white' size='24px'/>} 
          text='Keep track of every book you’ve ever read (or just start from the day you join)'
        />
        <FeatureItem 
          icon={<RiStarFill color='white' size='24px'/>} 
          text='Rate each book on a five-star scale (with halves) to record and share your reaction'
        />
        <FeatureItem 
          icon={<RiFileTextFill color='white' size='24px'/>} 
          text='Write and share reviews, and follow friends and other members to read theirs'
        />
      </Grid>
    </Container>
  </Stack>
);

export default FeaturesSection;