import {
  Container,
  Grid,
  Heading,
  Stack,
  Box,
  VStack,
  Text
} from '@chakra-ui/react';

import {
  RiBook2Fill,
  RiStarFill,
  RiFileTextFill
} from 'react-icons/ri';

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

export default FeaturesSection;