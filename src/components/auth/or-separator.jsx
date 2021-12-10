import { Flex, Text } from '@chakra-ui/react';

const OrSeparator = () => (
	<Flex alignItems={'center'}>
		<hr width='100%' />
		<Text color={'gray.500'} mx={4}>
			Or
		</Text>
		<hr width='100%' />
	</Flex>
);

export default OrSeparator;
