import { withRouter } from 'react-router-dom';
import { Flex, Stack, Heading } from '@chakra-ui/react';

import SignInForm from '../components/auth/sign-in-form';
import GoogleSignBtn from '../components/auth/google-sign-btn';
import OrSeparator from '../components/auth/or-separator';
import AuthBottomLink from '../components/auth/auth-bottom-link';

const SignInPage = () => (
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
			<GoogleSignBtn />
			<OrSeparator />
			<SignInForm />
			<AuthBottomLink link='signup' />
		</Stack>
	</Flex>
);

export default withRouter(SignInPage);
