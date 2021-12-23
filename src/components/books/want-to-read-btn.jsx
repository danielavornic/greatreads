import { connect } from 'react-redux';
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

import { addBookToShelfStart } from '../../redux/user/user.actions';

const WantToReadBtn = ({ addBookToShelf }) => (
	<ButtonGroup isAttached colorScheme={'brand'} bg={'brand'} width={'full'}>
		<Button
			width={'calc(100% - 34px)'}
			textAlign={'left'}
			onClick={() => addBookToShelf('wantToRead')}
		>
			Want to read
		</Button>
		<Menu size='sm'>
			<MenuButton
				as={IconButton}
				cursor={'pointer'}
				aria-label='More options'
				icon={<TriangleDownIcon />}
				borderLeftRadius='0'
				borderLeft={'1px solid white'}
			></MenuButton>
			<MenuList>
				<MenuGroup>
					<MenuItem onClick={() => addBookToShelf('wantToRead')}>
						Want to read
					</MenuItem>
					<MenuItem onClick={() => addBookToShelf('read')}>Read</MenuItem>
					<MenuItem onClick={() => addBookToShelf('currentlyReading')}>
						Currently reading
					</MenuItem>
				</MenuGroup>
			</MenuList>
		</Menu>
	</ButtonGroup>
);

const mapDispatchToProps = (dispatch) => ({
	addBookToShelf: (shelf) => dispatch(addBookToShelfStart(shelf)),
});

export default connect(null, mapDispatchToProps)(WantToReadBtn);
