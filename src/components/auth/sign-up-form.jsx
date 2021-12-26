import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

import {
  selectUserError,
  selectIsUserLogging,
} from '../../redux/user/user.selectors';
import { signUpStart } from '../../redux/user/user.actions';
import { handleSignUpErrors } from '../../utils/auth';

const SignUpForm = ({ signUpStart, userError, isLogging }) => {
  const [userCredentials, setUserCredentials] = useState({
    name: null,
    username: null,
    email: null,
    password: null,
    passwordConfirm: null,
  });
  const { name, username, email, password, passwordConfirm } = userCredentials;

  const [authError, setAuthError] = useState({ message: '', type: '' });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordConfirm)
      setAuthError({
        message: 'Your passwords do not match.',
        type: 'password',
      });
    else signUpStart(name, username, email, password);
  };

  useEffect(() => {
    if (userError) {
      setAuthError(handleSignUpErrors(userError.code));
      if (!password || !email || !name || !username || !passwordConfirm)
        setAuthError({ message: '', type: '' });
    }

    return () => setAuthError({ message: '', type: '' });
    // eslint-disable-next-line
  }, [userError]);

  return (
    <form>
      <Alert
        status='error'
        display={authError.message ? 'flex' : 'none'}
        mb={4}
        borderRadius={'md'}
      >
        <AlertIcon />
        {authError.message}
      </Alert>
      <Stack spacing={4}>
        <FormControl id='name' isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name='name'
            type='text'
            placeholder='Name'
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id='username' isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            name='username'
            type='text'
            isInvalid={authError.type === 'username'}
            placeholder='Username'
            onChange={handleChange}
          />
        </FormControl>
        <FormControl
          id='email'
          isInvalid={authError.type === 'email'}
          isRequired
        >
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
          isInvalid={authError.type === 'password'}
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
        <FormControl
          id='passwordConfirm'
          isInvalid={authError.type === 'password'}
          isRequired
        >
          <FormLabel>Confirm password</FormLabel>
          <Input
            name='passwordConfirm'
            type='password'
            placeholder='Confirm Password'
            onChange={handleChange}
          />
        </FormControl>
        <Button
          type='submit'
          disabled={!email || !name || !password || !passwordConfirm}
          title='Fill out all fields!'
          onClick={handleSubmit}
          colorScheme='brand'
          isLoading={isLogging}
        >
          Sign up
        </Button>
      </Stack>
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  userError: selectUserError,
  isLogging: selectIsUserLogging,
});

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (name, username, email, password) =>
    dispatch(signUpStart({ name, username, email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
