import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { searchStart } from '../../redux/search/search.actions';

import {
	HStack,
	Select,
	InputGroup,
	InputRightElement,
	Input,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchInput = ({ inputCategory, searchStart, match, history }) => {
	const urlCategory = match.params.category;
	const urlTerm = match.params.term;
	const urlFacet = match.params.facet;

	const categories = ['books', 'authors'];
	const facets = ['all', 'title', 'author'];

	const [searchRequest, setSearchRequest] = useState({
		category: inputCategory,
		term: urlTerm ? urlTerm : '',
		facet: urlFacet ? urlFacet : 'all',
	});
	const { category, facet, term } = searchRequest;

	const handleChange = (event) => {
		const { value, name } = event.target;
		setSearchRequest({ ...searchRequest, [name]: value });
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' || event.keyCode === 13) {
			handleSubmit();
			event.currentTarget.blur();
		}
	}

	const handleSubmit = () => {
		if (term !== '') {
			const pathFacet = category === 'books' ? `/${facet}` : '';
			history.push(`/search/${category}/${spaceToPlus(term)}${pathFacet}`);
		}
	}

	const spaceToPlus = (word) => decodeURI(word).replace(/ /g, '+');
	const plusToSpace = (word) => word.replace(/\+/g, ' ');

	useEffect(() => {
		if (urlCategory && !categories.includes(urlCategory)) {
			history.push(`/search/books/${spaceToPlus(term)}/all`);
			window.location.reload();
		}

		if (urlFacet && !facets.includes(urlFacet)) {
			history.push(`/search/${category}/${spaceToPlus(term)}/all`);
			window.location.reload();
		}

		if (urlTerm) {
			if (urlTerm.includes(' '))
				history.push(`/search/${category}/${spaceToPlus(term)}/${facet}`);
			else 
				searchStart(category, term, facet);
		}
		 
	}, [urlCategory, urlTerm, urlFacet, searchStart]);

	return (
		<HStack maxW={'3xl'} w={'full'}>
			{inputCategory === 'books' ? (
				<Select
					name='facet'
					size='lg'
					w={{ base: '42%', md: '30%', lg: '20%' }}
					colorScheme={'brand'}
					bg={'brand.50'}
					defaultValue={facet}
					onChange={handleChange}
				>
					<option fontSize={{ base: 'md', md: 'lg' }} value='all'>
						All
					</option>
					<option fontSize={{ base: 'md', md: 'lg' }} value='title'>
						Title
					</option>
					<option fontSize={{ base: 'md', md: 'lg' }} value='author'>
						Author
					</option>
				</Select>
			) : null}

			<InputGroup size='lg'>
				<Input
					name='term'
					type='search'
					placeholder={`Search ${category}...`}
					onChange={handleChange}
					onKeyPress={handleKeyPress}
					defaultValue={plusToSpace(term)}
				/>
				<InputRightElement
					children={<AiOutlineSearch />}
					cursor='pointer'
					onClick={handleSubmit}
				/>
			</InputGroup>
		</HStack>
	);
};

const mapDispatchToProps = (dispatch) => ({
	searchStart: (category, term, facet) =>
		dispatch(searchStart({ category, term, facet })),
});

export default withRouter(connect(null, mapDispatchToProps)(SearchInput));
