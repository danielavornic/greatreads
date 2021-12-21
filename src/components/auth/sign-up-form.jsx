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
	AlertIcon
} from '@chakra-ui/react';

import { signUpStart } from '../../redux/user/user.actions';
import { selectUserError } from '../../redux/user/user.selectors';

const SignUpForm = ({ signUpStart, userError }) => {
	const [userCredentials, setUserCredentials] = useState({
		name: null,
		email: null,
		password: null,
		passwordConfirm: null,
	});
	const { name, email, password, passwordConfirm } = userCredentials;

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
		else signUpStart(name, email, password);
	};

	useEffect(() => {
		if (userError) {
			switch (userError.code) {
				case 'auth/invalid-email':
					setAuthError({
						message: 'Please use a valid email adress.',
						type: 'email',
					});
					break;
				case 'auth/email-already-in-use':
					setAuthError({
						message: 'This email is already connected to an account.',
						type: 'email',
					});
					break;
				case 'auth/weak-password':
					setAuthError({
						message: 'Password should be at least 6 characters.',
						type: 'password',
					});
					break;
				default:
					setAuthError({
						message: 'An internal error has occured.',
						type: '',
					});
			}

			if (!password || !email || !name || !passwordConfirm)
				setAuthError({ message: '', type: '' });
		}

		return () => setAuthError({ message: '', type: '' });
	}, [userError, name, email, password, passwordConfirm]);

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
				>
					Sign up
				</Button>
			</Stack>
		</form>
	);
};

const mapStateToProps = createStructuredSelector({
	userError: selectUserError
});

const mapDispatchToProps = (dispatch) => ({
	signUpStart: (name, email, password) =>
		dispatch(signUpStart({ name, email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
