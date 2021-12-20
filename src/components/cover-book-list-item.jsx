import { Link } from 'react-router-dom';

import { Box } from '@chakra-ui/layout';
import { Image, Tooltip } from '@chakra-ui/react';

const CoverBookListItem = ({ title, cover_i, cover_edition_key, edition_key }) => {
	const bookCoverUrl = cover_i
		? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
		: 'https://openlibrary.org/images/icons/avatar_book.png';
	
	const bookKey = cover_edition_key
			? cover_edition_key
			: edition_key
			? edition_key[0]
			: edition_key;

	return (
		<Box border='1px' borderColor='gray.200' padding='10px' borderRadius='10px'>
			<Link to={`/books/${bookKey}`}>
				<Tooltip label={title}>
					<Image
						src={bookCoverUrl}
						alt={`Cover of "${title}"`}
						width={['100px', '120px']}
						height='auto'
						boxShadow='lg'
					/>
				</Tooltip>
			</Link>
		</Box>
	);
};

export default CoverBookListItem;
