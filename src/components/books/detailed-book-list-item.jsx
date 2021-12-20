import { Link } from 'react-router-dom';

import { Heading, Text, Box, Grid } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

const DetailedBookListItem = ({
	cover_i,
	title,
	author_name,
	author_key,
	first_publish_year,
	cover_edition_key,
	edition_key,
}) => {
	const bookCoverUrl = cover_i
		? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
		: 'https://openlibrary.org/images/icons/avatar_book.png';

	const bookKey = cover_edition_key
		? cover_edition_key
		: edition_key
		? edition_key[0]
		: edition_key;

	return (
		<Box
			border='1px'
			borderColor='brand.50'
			borderRadius='10px'
			padding={['24px', '28px']}
			width={'full'}
		>
			<Grid
				templateColumns={['80px 1fr', '100px 1fr']}
				gap={[4, 4, 6]}
				w={'full'}
			>
				<Box>
					<Link to={`/books/${bookKey}`}>
						<Image
							src={bookCoverUrl}
							alt={`Cover of "${title}"`}
							width={['80px', '100px']}
							height='auto'
						/>
					</Link>
				</Box>
				<Box>
					<Link to={`/books/${bookKey}`}>
						<Heading as={'h5'} fontSize={{ base: 'xl', md: '2xl' }} mb='4px'>
							{title}
						</Heading>
					</Link>
					<Heading
						as={'h6'}
						fontWeight='400'
						fontSize={{ base: 'lg', md: 'xl' }}
						mb='12px'
					>
						by
						{author_name
							? author_name.map((name, idx) =>
									idx < author_name.length - 1 ? (
										<Link to={`/authors/${author_key[idx]}`}>
											<Text
												display='inline'
												pl='6px'
												_hover={{ textDecoration: 'underline' }}
											>
												{name},
											</Text>
										</Link>
									) : (
										<Link to={`/authors/${author_key[idx]}`}>
											<Text
												display='inline'
												pl='6px'
												_hover={{ textDecoration: 'underline' }}
											>
												{name}
											</Text>
										</Link>
									)
							  )
							: ' Unknown author'}
					</Heading>
					<Text color='gray.500'>first published in {first_publish_year}</Text>
				</Box>
			</Grid>
		</Box>
	);
};

export default DetailedBookListItem;
