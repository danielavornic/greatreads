import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, withRouter } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Stack,
  Button,
  Heading,
  Text,
  Alert,
  AlertIcon
} from '@chakra-ui/react';

import { googleSignInStart, emailSignInStart } from '../redux/user/user.actions';
import { selectUserError } from '../redux/user/user.selectors';

const SignInPage = ({ googleSignInStart, emailSignInStart, userError }) => {
  const [ userCredentials, setUserCredentials ] = useState({
    email: null,
    password: null,
  });
  const { email, password } = userCredentials;
  const [ authError, setAuthError ] = useState(null);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    emailSignInStart(email, password);
  };

  useEffect(() => {
    if (!password || !email) setAuthError(null)
  })

  useEffect(() => {
    setAuthError(userError ? 'Your credentials don\'t match.' : null)

    return () => setAuthError(null);
  }, [userError])

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
        <Heading fontSize={'4xl'} textAlign={'center'}>
          Sign in
        </Heading>

        <Button colorScheme='google' onClick={googleSignInStart}>Continue with Google</Button>

        <Flex alignItems={'center'}>
          <hr width='100%' />
          <Text color={'gray.500'} mx={4}>
            Or
          </Text>
          <hr width='100%' />
        </Flex>

        <form onSubmit={handleSubmit}>

          <Alert status='error' display={authError ? 'flex' : 'none'} mb={4} borderRadius={'md'}>
            <AlertIcon />
            {authError}
          </Alert>

          <Stack spacing={4}>
            <FormControl id='email' isInvalid={authError} isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                name='email'
                type='email'
                placeholder='Email adress'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              id='password'
              isInvalid={authError}
              isRequired
            >
              <FormLabel>Password</FormLabel>
              <Input
                name='password'
                type='password'
                placeholder='Password'
                onChange={handleChange}
              />
            </FormControl>
            <Button 
              type='submit' 
              onClick={handleSubmit} 
              colorScheme='brand' 
              title='Fill out all fields!' 
              disabled={!password || !email} 
            >
              Sign in
            </Button>
          </Stack>
        </form>

        <Flex fontSize={'md'} justifyContent='center'>
          <Text color={'gray.600'} mr={2}>
            Not a member?
          </Text>
          <Text color={'brand.500'} _hover={{ textDecoration: 'underline' }}>
            <Link to='/signup'>Sign up now</Link>
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

const mapStateToProps = createStructuredSelector({
  userError: selectUserError
});

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignInPage));
