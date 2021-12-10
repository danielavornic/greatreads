import { Link } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';

const AuthBottomLink = ({ link }) => (
	<Flex fontSize={'md'} justifyContent='center'>
		<Text color={'gray.600'} mr={2}>
			{link === 'signup' ? 'Not ' : 'Already '}
      a member?
		</Text>
		<Text color={'brand.500'} _hover={{ textDecoration: 'underline' }}>
			<Link to={`/${link}`}>
        Sign
				{link === 'signup' ? ' up ' : ' in '}
				now
			</Link>
		</Text>
	</Flex>
);

export default AuthBottomLink;
