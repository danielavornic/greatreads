import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

import { emailSignInStart } from '../../redux/user/user.actions';
import { selectCurrentUser, selectUserError } from '../../redux/user/user.selectors';

const SignInForm = ({ emailSignInStart, userError, user }) => {
	const [userCredentials, setUserCredentials] = useState({
		email: null,
		password: null,
	});
	const { email, password } = userCredentials;

	const [authError, setAuthError] = useState(null);

	const history = useHistory();

	const handleChange = (event) => {
		const { value, name } = event.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		emailSignInStart(email, password);
	};

	useEffect(() => history.push(user ? '/' : '/signin'), [user]);

	useEffect(() => {
		if (!email || !password) 
			setAuthError(null);
		else if (userError)
			setAuthError('Your credentials don\'t match.');

		return () => setAuthError(null);
	}, [userError]);

	return (
		<form onSubmit={handleSubmit}>
			<Alert
				status='error'
				display={authError ? 'flex' : 'none'}
				mb={4}
				borderRadius={'md'}
			>
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
				<FormControl id='password' isInvalid={authError} isRequired>
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
					disabled={!email || !password}
				>
					Sign in
				</Button>
			</Stack>
		</form>
	);
};

const mapStateToProps = createStructuredSelector({
	user: selectCurrentUser,
	userError: selectUserError
});

const mapDispatchToProps = (dispatch) => ({
	emailSignInStart: (email, password) =>
		dispatch(emailSignInStart({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
