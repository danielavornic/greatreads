import { useState } from 'react';

import { Link } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  Stack,
  Button,
  Heading,
  Text
} from '@chakra-ui/react';

const SignInPage = () => {
  const [ userCredentials, setUserCredentials ] = useState({
    email: '',
    password: ''
  });
  const { email, password } = userCredentials;

  const [ passwordErrors, setPasswordErrors ] = useState([]);
  const [ emailErrors, setEmailErrors ] = useState([]);

  const validateEmail = () => {
    setEmailErrors([]);

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email))
      setEmailErrors([ ...emailErrors, 'Please enter a valid email adress.' ]);
    
    if (email === '') 
      setEmailErrors([ ...emailErrors, 'This field is required.' ]);
  };

  const validatePassword = () => {
    setPasswordErrors([]);

    const nums = /[0-9]/;
    if (!nums.test(password)) 
      setPasswordErrors([ ...passwordErrors, 'Your password must contain at least one number.' ]);
    
    if (password.length < 6)
      setPasswordErrors([ ...passwordErrors, 'Your password must be least 6 characters long.' ]);
    
    if (password === '') 
      setPasswordErrors([ ...passwordErrors, 'This field is required.' ])
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    validateEmail();
    validatePassword();
  };

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack 
        width={'full'}
        maxW={'md'} 
        spacing={8} 
        py={{ base: 14, md: 20 }} 
        px={6} 
        mx={'auto'} 
      >
        <Heading fontSize={'4xl'} textAlign={'center'}>Sign in</Heading>

        <Button colorScheme='google'>Continue with Google</Button>

        <Flex alignItems={'center'}>
          <hr width='100%'/>
          <Text color={'gray.500'} mx={4}>Or</Text>
          <hr width='100%'/>
        </Flex>

        <form>
          <Stack spacing={4}>
            <FormControl id='email' isInvalid={emailErrors.length} isRequired>
              <FormLabel>Email address</FormLabel>
              <Input 
                name='email'
                type='email' 
                placeholder='Email adress'
                onChange={handleChange}
              />
              <FormErrorMessage>
                {emailErrors[emailErrors.length - 1]}
              </FormErrorMessage>
            </FormControl>
            <FormControl id='password' isInvalid={passwordErrors.length} isRequired>
              <FormLabel>Password</FormLabel>
              <Input 
                name='password'
                type='password' 
                placeholder='Password'
                onChange={handleChange}
              />
              <FormErrorMessage>
                {passwordErrors[passwordErrors.length - 1]}
              </FormErrorMessage>
            </FormControl>
            <Button 
              type='submit'
              onClick={handleSubmit}
              colorScheme='brand'
            >
              Sign in
            </Button>
          </Stack>
        </form>

        <Flex fontSize={'md'} justifyContent='center'>
          <Text color={'gray.600'} mr={2}>Not a member?</Text>
          <Text 
            color={'brand.500'} 
            _hover={{ textDecoration: 'underline' }}
          > 
            <Link to='signup'>Sign up now</Link>
          </Text>
        </Flex>
      </Stack>
    </Flex>
  )
};

export default SignInPage;