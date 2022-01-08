import { Container, Grid, Heading, Stack } from '@chakra-ui/react';
import { RiBook2Fill, RiStarFill, RiFileTextFill } from 'react-icons/ri';

import FeatureItem from './feature-item';

const FeaturesSection = () => (
  <Stack w='full' align={'center'} spacing={{ base: 8, md: 12 }}>
    <Heading
      as='h2'
      textAlign={'center'}
      fontWeight={700}
      fontSize={{ base: '3xl', md: '4xl' }}
      lineHeight={'110%'}
      mb={2}
    >
      Features
    </Heading>
    <Container maxW='5xl' align={'center'}>
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(3, 1fr)']}
        gap={[4, 4, 6]}
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

export default FeaturesSection;
