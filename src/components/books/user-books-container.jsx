import { Avatar, HStack, VStack, Text, Flex } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectUserBooks } from '../../redux/books/books.selectors';

import UserShelvesContainer from './user-shelves-container';
import UserRatingsContainer from './user-ratings-container';
import UserBooksList from './user-books-list';

const UserBooksContainer = ({
  userBooks: { username, displayName, photoURL, shelf, rating },
}) => (
  <VStack maxW={'5xl'} align={'left'}>
    <HStack
      fontSize={16}
      bg={'brand.50'}
      padding={3}
      borderRadius={4}
      mb={{ base: 3, md: 4 }}
    >
      <Link to={`/users/${username}`}>
        <Avatar
          size='xs'
          bg={'brand.500'}
          color={'white'}
          name={displayName}
          src={photoURL ? photoURL : ''}
          mr={4}
        />
        <Text
          display={'inline'}
          fontWeight={'bold'}
          color={'brand.500'}
          _hover={{ color: 'black' }}
        >
          {displayName}
        </Text>
      </Link>
      <Text>{' > '}</Text>
      <Text fontWeight={'bold'}>Books</Text>
    </HStack>
    <Flex flexDirection={{ base: 'column', md: 'row' }}>
      <VStack me={{ base: 0, md: 6 }} mb={{ base: 6, md: 0 }}>
        <UserShelvesContainer username={username} shelf={shelf} />
        <UserRatingsContainer username={username} rating={rating} />
      </VStack>
      <UserBooksList />
    </Flex>
  </VStack>
);

const mapStateToProps = createStructuredSelector({
  userBooks: selectUserBooks,
});

export default connect(mapStateToProps)(UserBooksContainer);
