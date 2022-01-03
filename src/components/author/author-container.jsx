import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Box, Heading, Text } from '@chakra-ui/layout';
import { Flex, Image } from '@chakra-ui/react';

import { selectAuthor } from '../../redux/authors/authors.selectors';

import AuthorBooksList from './author-books-list';
import ReadMore from '../common/read-more';

const AuthorContainer = ({ author }) => {
  const [isLoadingImg, setIsLoadingImg] = useState(true);

  return (
    <Flex flexDirection={['column', 'column', 'row']}>
      <Box w={['full', 'full', '210px']} mr={[4, 6, 8]} mb={8}>
        <Image
          src='https://openlibrary.org/images/icons/avatar_author-lg.png'
          width='200px'
          height='auto'
          boxShadow='lg'
          alt='fallback-author-image'
          display={isLoadingImg ? 'block' : 'none'}
          mx={{ base: 'auto', md: '0' }}
        />
        <Image
          src={
            author.photos && author.photos[0] !== -1
              ? `https://covers.openlibrary.org/a/id/${author.photos[0]}-L.jpg`
              : 'https://openlibrary.org/images/icons/avatar_author-lg.png'
          }
          width='200px'
          height='auto'
          boxShadow='lg'
          alt='author-image'
          onLoad={() => setIsLoadingImg(false)}
          display={isLoadingImg ? 'none' : 'block'}
          mx={{ base: 'auto', md: '0' }}
        />
      </Box>
      <Box w={'full'}>
        <Heading
          as='h1'
          fontWeight={700}
          fontSize={{ base: '3xl', md: '4xl' }}
          pb='12px'
          textAlign={{ base: 'center', md: 'left' }}
        >
          {author.name}
        </Heading>
        {author.birth_date || author.death_date ? (
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            pb='20px'
            textAlign={{ base: 'center', md: 'left' }}
          >
            {author.birth_date ? `${author.birth_date} - ` : '? - '}
            {author.death_date ? `${author.death_date}` : ''}
          </Text>
        ) : null}
        {author.bio ? (
          author.bio.value ? (
            <ReadMore text={author.bio.value} />
          ) : (
            <ReadMore text={author.bio} />
          )
        ) : null}
        <Box mt={[8, 10]}>
          <Heading as='h2' fontSize={{ base: 'xl', md: '2xl' }} pb='20px'>
            Books
          </Heading>
          <AuthorBooksList />
        </Box>
      </Box>
    </Flex>
  );
};

const mapStateToProps = createStructuredSelector({
  author: selectAuthor,
});

export default connect(mapStateToProps)(AuthorContainer);
