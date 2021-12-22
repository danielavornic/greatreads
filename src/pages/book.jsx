import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { Container, Box, Heading, Text } from '@chakra-ui/layout';
import { Grid, Image } from '@chakra-ui/react';

import { fetchBookStart } from '../redux/books/books.actions';
import {
	selectBook,
	selectIsBookFetching
} from '../redux/books/books.selectors';

import { selectCurrentUser } from '../redux/user/user.selectors';

import CustomSpinner from '../components/common/custom-spinner';
import ReadMore from '../components/common/read-more';
import WantToReadBtn from '../components/books/want-to-read-btn';

const BookPage = ({ match, fetchBookStart, book, isBookLoading, currentUser }) => {
	const bookKey = match.params.bookKey;
	useEffect(() => {
		fetchBookStart(bookKey);
	}, [bookKey, fetchBookStart]);

	const [ isLoadingImg, setIsLoadingImg ] = useState(true);

	return (
		<Container maxW={'5xl'}>
			{book ? (
				book.error === 'notfound' ? (
					<Text align='center'>Book not found</Text>
				) : (
					<Grid
						templateColumns={['repeat(1, 1fr)', '240px 1fr']}
						gap={[4, 6, 10]}
						w={'full'}
					>
						<Box>
							<Image
								src='https://openlibrary.org/images/icons/avatar_book.png'
								width='240px'
								height='auto'
								boxShadow='sm'
								alt='fallback-book-cover'
								display={isLoadingImg ? 'block' : 'none'}
							/>
							<Image
								src={
									book.covers
										? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
										: 'https://openlibrary.org/images/icons/avatar_book.png'
								}
								width='240px'
								height='auto'
								boxShadow='sm'
								alt='book-cover'
								onLoad={() => setIsLoadingImg(false)}
								display={isLoadingImg ? 'none' : 'block'}
							/>
							{ currentUser 
							? <Box my={8} width={'full'}>
									<WantToReadBtn/> 
								</Box>
							: null }
						</Box>
						<Box>
							<Heading
								as='h1'
								fontWeight={700}
								fontSize={{ base: '3xl', md: '4xl' }}
								pb='8px'
							>
								{book.title}
							</Heading>
							<Heading as='h2' fontSize={{ base: 'lg', md: 'xl' }} pb='20px'>
								by
								{book.authors
									? book.authors.map((author, idx) => (
											<Link key={idx} to={author.key ? author.key : '#'}>
												<Text
													display='inline'
													pl='6px'
													_hover={{ textDecoration: 'underline' }}
												>
													{author.name}
													{idx !== 0 || idx !== book.authors.length - 1
														? ','
														: null}
												</Text>
											</Link>
									  ))
									: ' Unknown author'}
							</Heading>
							<Text pb='4px' color={'gray.600'}>
								This edition was published in <b>{book.publish_date}</b>
							</Text>
							<Text color={'gray.600'}>
								{book.physical_format ? book.physical_format : null}
								{book.physical_format && book.number_of_pages ? ', ' : null}
								{book.number_of_pages ? book.number_of_pages + ' pages' : null}
							</Text>
							{book.description ? (
								<Box pt='28px'>
									<Text color={'brand.500'} pb='4px'>
										<b>Description</b>
									</Text>
									<ReadMore text={book.description.replace(/\r\n\r/g, '')} />
								</Box>
							) : null}
						</Box>
					</Grid>
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
	currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
	fetchBookStart: (bookKey) => dispatch(fetchBookStart(bookKey)),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(BookPage)
);
