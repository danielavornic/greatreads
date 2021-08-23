import { Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

const CustomSpinner = () => (
  <Flex justifyContent='center'>
    <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color={'brand.400'}
      size='xl'
    />
  </Flex>
);

export default CustomSpinner;