import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';

import { Container, Text } from '@chakra-ui/layout';

import { fetchBookStart } from '../redux/books/books.actions';
import {
	selectBook,
	selectIsBookFetching,
} from '../redux/books/books.selectors';

import BookContainer from '../components/books/book-container';
import CustomSpinner from '../components/common/custom-spinner';

const BookPage = ({ match, fetchBookStart, book, isBookLoading }) => {
	const bookKey = match.params.bookKey;
	useEffect(() => {
		fetchBookStart(bookKey);
	}, [bookKey, fetchBookStart]);

	return (
		<Container maxW={'5xl'}>
			{book ? (
				book.error === 'notfound' ? (
					<Text align='center'>Book not found</Text>
				) : (
					<BookContainer />
				)
			) : isBookLoading ? (
				<CustomSpinner />
			) : (
				<Text align='center'>Book not found</Text>
			)}
		</Container>
	);
};

const mapStateToProps = createStructuredSelector({
	book: selectBook,
	isBookLoading: selectIsBookFetching,
});

const mapDispatchToProps = (dispatch) => ({
	fetchBookStart: (bookKey) => dispatch(fetchBookStart(bookKey)),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(BookPage)
);
