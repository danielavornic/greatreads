import { withRouter } from 'react-router-dom';
import { Flex, Stack, Heading } from '@chakra-ui/react';

import SignUpForm from '../components/auth/sign-up-form';
import GoogleSignBtn from '../components/auth/google-sign-btn';
import OrSeparator from '../components/auth/or-separator';
import AuthBottomLink from '../components/auth/auth-bottom-link';

const SignUpPage = () => {
	return (
		<Flex align={'center'} justify={'center'}>
			<Stack
				width={'full'}
				maxW={'md'}
				spacing={8}
				px={6}
				mx={'auto'}
			>
				<Heading fontSize={'4xl'} textAlign='center'>
					Sign up
				</Heading>
				<GoogleSignBtn />
				<OrSeparator />
				<SignUpForm />
				<AuthBottomLink link='signin' />
			</Stack>
		</Flex>
	);
};

export default withRouter(SignUpPage);
