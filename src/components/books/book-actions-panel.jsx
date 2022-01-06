import { Flex } from '@chakra-ui/react';

import BookStatusBtn from './book-status-btn';
import BookRating from './book-rating';

const BookActionsPanel = () => {
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <BookStatusBtn />
      <BookRating />
    </Flex>
  );
};

export default BookActionsPanel;
