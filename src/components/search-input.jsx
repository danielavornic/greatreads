import {
  HStack,
  Select,
  InputGroup,
  InputRightElement,
  Input
} from '@chakra-ui/react';

import { AiOutlineSearch } from 'react-icons/ai';

const SearchInput = () => (
  <HStack maxW={'3xl'} w={'full'}>
    <Select 
      size='lg' 
      w={{base:'42%', md: '30%', lg: '20%'}}
      colorScheme={'brand'} 
      bg={'brand.50'} 
    >
      <option fontSize={{ base: 'md', md: 'lg' }} defaultValue='all'>All</option>
      <option fontSize={{ base: 'md', md: 'lg' }} value='title'>Title</option>
      <option fontSize={{ base: 'md', md: 'lg' }} value='author'>Author</option>
    </Select>

    <InputGroup size='lg'>
      <Input placeholder='Search...' />
      <InputRightElement children={<AiOutlineSearch />}/>
    </InputGroup>
  </HStack>
);

export default SearchInput;