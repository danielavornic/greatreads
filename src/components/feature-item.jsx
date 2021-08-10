import {
  Box,
  VStack,
  Text
} from '@chakra-ui/react';

const FeatureItem = ({icon, text}) => (
  <Box bg='white' borderRadius='6px'>
    <VStack padding='36px'>
      <Box padding='12px' bg={'brand.200'} borderRadius='50%' mb='12px'>
        {icon}
      </Box>
      <Text>{text}</Text>
    </VStack>
  </Box>
);

export default FeatureItem;