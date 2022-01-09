import { Flex } from '@chakra-ui/react';

import BookStatusBtn from './book-status-btn';
import BookRating from './book-rating';
import BookHeart from './book-heart';

const BookActionsPanel = () => {
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <BookStatusBtn />
      <Flex
        width={{ base: '260px', md: 'full' }}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <BookRating />
        <BookHeart />
      </Flex>
    </Flex>
  );
};

export default BookActionsPanel;
