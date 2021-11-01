import { Link } from 'react-router-dom';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text
} from '@chakra-ui/react';

const SignUpPage = () => (
  <Flex align={'center'} justify={'center'}>
    <Stack 
      width={'full'}
      maxW={'md'} 
      spacing={8} 
      py={{ base: 14, md: 20 }} 
      px={6} 
      mx={'auto'} 
    >
      <Heading fontSize={'4xl'} textAlign='center'>Sign up</Heading>
      <Button colorScheme='google'>Sign up with Google</Button>
      <Flex alignItems='center'>
        <hr width='100%'/>
        <Text color={'gray.500'} mx={4}>Or</Text>
        <hr width='100%'/>
      </Flex>
      <Stack spacing={4}>
      <FormControl id='username'>
          <FormLabel>Username</FormLabel>
          <Input type='text' />
        </FormControl>
        <FormControl id='email'>
          <FormLabel>Email address</FormLabel>
          <Input type='email' />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>Password</FormLabel>
          <Input type='password' />
        </FormControl>
        <FormControl id='confirm-password'>
          <FormLabel>Confirm password</FormLabel>
          <Input type='password' />
        </FormControl>
        <Button colorScheme='brand'>Sign up</Button>
      </Stack>
      <Flex fontSize={'md'} justifyContent='center'>
        <Text color={'gray.600'} mr={2}>Already a member?</Text>
        <Text color={'brand.500'} _hover={{ textDecoration: 'underline' }}> 
          <Link to='signin'>Sign in now</Link>
        </Text>
      </Flex>
    </Stack>
  </Flex>
);

export default SignUpPage;