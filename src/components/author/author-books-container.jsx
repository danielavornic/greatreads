import { useState, useEffect, forwardRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectAuthorWorks } from '../../redux/authors/authors.selectors';

import { VStack, Stack, Grid } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';

import CoverBookListItem from '../books/cover-book-list-item';
import CustomPagination from '../common/custom-pagination';

const AuthorBooksContainer = ({ works }) => {
	const [data, setData] = useState([]);
	const [current, setCurrent] = useState(1);
	const pageSize = 15;
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
		if (works) {
			setData(works.docs);
			setCurrent(1);
		}
	}, [works]);

	return (
		<Stack width={'full'} mb={['36px', '48px']}>
			{works ? (
				works.numFound > 0 ? (
					<VStack spacing={['28px', '36px']}>
						<Grid
							w={'full'}
							templateColumns={[
								'repeat(3, 1fr)',
								'repeat(4, 1fr)',
								'repeat(4, 1fr)',
								'repeat(5, 1fr)',
							]}
							align='center'
							gap={[4, 4, 6]}
						>
							{results.map(({ key, ...otherBookProps }) => (
								<CoverBookListItem key={key} {...otherBookProps} />
							))}
						</Grid>
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
				) : null
			) : null}
		</Stack>
	);
};

const mapStateToProps = createStructuredSelector({
	works: selectAuthorWorks,
});

export default withRouter(connect(mapStateToProps)(AuthorBooksContainer));
