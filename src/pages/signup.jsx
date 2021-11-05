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
  Text,
} from '@chakra-ui/react';

import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from '../utils/auth-validation';

const SignUpPage = () => {
  const [ userCredentials, setUserCredentials ] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { name, email, password, passwordConfirm } = userCredentials;

  const [ nameErrors, setNameErrors ] = useState([]);
  const [ emailErrors, setEmailErrors ] = useState([]);
  const [ passwordErrors, setPasswordErrors ] = useState([]);
  const [ passwordConfirmErrors, setPasswordConfirmErrors ] = useState([]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setNameErrors(validateName(name));
    setEmailErrors(validateEmail(email));
    setPasswordErrors(validatePassword(password));
    setPasswordConfirmErrors(
      validatePasswordConfirm(password, passwordConfirm)
    );
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
        <Heading fontSize={'4xl'} textAlign='center'>
          Sign up
        </Heading>

        <Button colorScheme='google'>Sign up with Google</Button>

        <Flex alignItems='center'>
          <hr width='100%' />
          <Text color={'gray.500'} mx={4}>
            Or
          </Text>
          <hr width='100%' />
        </Flex>

        <form>
          <Stack spacing={4}>
            <FormControl id='name' isInvalid={nameErrors.length} isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name='name'
                type='text'
                placeholder='Name'
                onChange={handleChange}
              />
              <FormErrorMessage>{nameErrors[0]}</FormErrorMessage>
            </FormControl>
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

            <FormControl
              id='password'
              isInvalid={passwordErrors.length}
              isRequired
            >
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
            <FormControl
              id='passwordConfirm'
              isInvalid={passwordConfirmErrors.length}
              isRequired
            >
              <FormLabel>Confirm password</FormLabel>
              <Input
                name='passwordConfirm'
                type='password'
                placeholder='Confirm Password'
                onChange={handleChange}
              />
              <FormErrorMessage>
                {passwordConfirmErrors[passwordConfirmErrors.length - 1]}
              </FormErrorMessage>
            </FormControl>

            <Button type='submit' onClick={handleSubmit} colorScheme='brand'>
              Sign up
            </Button>
          </Stack>
        </form>

        <Flex fontSize={'md'} justifyContent='center'>
          <Text color={'gray.600'} mr={2}>
            Already a member?
          </Text>
          <Text color={'brand.500'} _hover={{ textDecoration: 'underline' }}>
            <Link to='/signin'>Sign in now</Link>
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default SignUpPage;
