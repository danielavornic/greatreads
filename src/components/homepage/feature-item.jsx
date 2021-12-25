import { Box, Text, VStack } from '@chakra-ui/react';

const FeatureItem = ({ children, text }) => (
	<Box bg={'brand.25'} borderRadius='6px'>
		<VStack padding='36px'>
			<Box padding='12px' bg={'brand.200'} borderRadius='50%' mb='12px'>
				{children}
			</Box>
			<Text color={'gray.800'} fontSize={{ base: 'md', md: 'lg' }}>
				{text}
			</Text>
		</VStack>
	</Box>
);

export default FeatureItem;
