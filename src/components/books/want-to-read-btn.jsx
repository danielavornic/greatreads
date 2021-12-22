import {
	ButtonGroup,
	Button,
	IconButton,
	Menu,
	MenuGroup,
	MenuList,
	MenuItem,
	MenuButton,
} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

const WantToReadBtn = () => (
	<ButtonGroup
		isAttached
		colorScheme={'brand'}
		bg={'brand'}
		width={'full'}
	>
		<Button width={'calc(100% - 34px)'} textAlign={'left'}>
			Want to read
		</Button>
		<Menu size='sm'>
			<MenuButton as={Button} variant={'link'} cursor={'pointer'} minW={0}>
				<IconButton
					aria-label='More options'
					icon={<TriangleDownIcon />}
					borderLeftRadius='0'
					borderLeft={'1px solid white'}
				/>
			</MenuButton>
			<MenuList>
				<MenuGroup>
					<MenuItem>Want to read</MenuItem>
					<MenuItem>Read</MenuItem>
					<MenuItem>Currently reading</MenuItem>
				</MenuGroup>
			</MenuList>
		</Menu>
	</ButtonGroup>
);

export default WantToReadBtn;
