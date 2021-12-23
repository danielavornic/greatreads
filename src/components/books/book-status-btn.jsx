import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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

import { selectBook } from '../../redux/books/books.selectors';
import { updateBookStatusStart } from '../../redux/books/books.actions';

const BookStatusBtn = ({ book, updateBookStatus }) => {
	const [bookStatus, setBookStatus] = useState(book.status);

	const handleClick = (status) => {
		updateBookStatus(status);
		setBookStatus(status);
	};

	const toggleClick = () => {
		if (bookStatus === '') {
			updateBookStatus('wantToRead');
			setBookStatus('wantToRead');
		} else {
			updateBookStatus('');
			setBookStatus('');
		}
	};

	const sentenceCase = (text) => {
		return text.replace(/^[a-z]|[A-Z]/g, function (v, i) {
			return i === 0 ? v.toUpperCase() : ' ' + v.toLowerCase();
		});
	};

	return (
		<ButtonGroup isAttached colorScheme={'brand'} bg={'brand'} width={'full'}>
			<Button
				width={'calc(100% - 34px)'}
				textAlign={'left'}
				onClick={toggleClick}
				variant={bookStatus === '' ? 'solid' : 'outline'}
			>
				{bookStatus === '' ? 'Want to read' : sentenceCase(bookStatus)}
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
						<MenuItem onClick={() => handleClick('wantToRead')}>
							Want to read
						</MenuItem>
						<MenuItem onClick={() => handleClick('read')}>Read</MenuItem>
						<MenuItem onClick={() => handleClick('currentlyReading')}>
							Currently reading
						</MenuItem>
					</MenuGroup>
				</MenuList>
			</Menu>
		</ButtonGroup>
	);
};

const mapStateToProps = createStructuredSelector({
	book: selectBook,
});

const mapDispatchToProps = (dispatch) => ({
	updateBookStatus: (shelf) => dispatch(updateBookStatusStart(shelf)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookStatusBtn);
