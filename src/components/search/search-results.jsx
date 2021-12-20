import { useState, useEffect, forwardRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';

import {
	selectAreSearchResultsFetching,
	selectSearchResults,
} from '../../redux/search/search.selectors';

import { VStack, Stack, Flex, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';

import CustomSpinner from '../common/custom-spinner';
import CustomPagination from '../common/custom-pagination';
import DetailedBookListItem from '../books/detailed-book-list-item';
import AuthorListItem from '../author/author-list-item';

const SearchResults = ({ searchResults, areSearchResultsLoading, match }) => {
	const urlCategory = match.params.category;
	const [data, setData] = useState([]);
	const [current, setCurrent] = useState(1);
	const pageSize = urlCategory === 'books' ? 10 : 20;
	const offset = (current - 1) * pageSize;
	const results = data ? data.slice(offset, offset + pageSize) : [];

	const Prev = forwardRef((props, ref) => (
		<Button ref={ref} {...props}>
			Prev
		</Button>
	));
	const Next = forwardRef((props, ref) => (
		<Button ref={ref} {...props}>
			Next
		</Button>
	));

	const itemRender = (_, type) => {
		if (type === 'prev') return Prev;
		if (type === 'next') return Next;
	};

	useEffect(() => {
		if (searchResults) {
			setData(searchResults.docs);
			setCurrent(1);
		}
	}, [searchResults]);

	return (
		<Stack width={'full'} my={['36px', '48px']}>
			{searchResults ? (
				searchResults.numFound > 0 ? (
					<Stack width='100%' maxW={'full'}>
						<Text mb='8px'>
							Page {current} of {searchResults.docs.length} results
						</Text>
						<VStack spacing={['28px', '36px']} width={'full'} align='center'>
							<Stack align='left' w={'full'}>
								{urlCategory === 'books'
									? results.map(({ key, ...otherBookProps }) => (
											<DetailedBookListItem key={key} {...otherBookProps} />
									  ))
									: urlCategory === 'authors'
									? results.map(({ key, ...otherProps }) => (
											<AuthorListItem key={key} path={key} {...otherProps} />
									  ))
									: null}
							</Stack>
							{data && data.length > pageSize ? (
								<CustomPagination
									current={current}
									pageSize={pageSize}
									data={data}
									itemRender={itemRender}
									setCurrent={setCurrent}
								/>
							) : null}
						</VStack>
					</Stack>
				) : (
					<Flex justifyContent='center'>
						<Text>No results found.</Text>
					</Flex>
				)
			) : areSearchResultsLoading ? (
				<CustomSpinner />
			) : null}
		</Stack>
	);
};

const mapStateToProps = createStructuredSelector({
	searchResults: selectSearchResults,
	areSearchResultsLoading: selectAreSearchResultsFetching,
});

export default withRouter(connect(mapStateToProps)(SearchResults));
