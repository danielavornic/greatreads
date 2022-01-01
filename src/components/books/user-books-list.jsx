import { useState, useEffect, forwardRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { VStack, Stack, Grid } from '@chakra-ui/layout';
import { Button, Text } from '@chakra-ui/react';

import { selectUserBooks } from '../../redux/books/books.selectors';

import CustomPagination from '../common/custom-pagination';
import CoverBookListItem from './cover-book-list-item';

const UserBooksList = ({ userBooks }) => {
  userBooks = userBooks.books;
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);

  const pageSize = 15;
  const offset = (current - 1) * pageSize;
  const results = data ? data.slice(offset, offset + pageSize) : [];

  const itemRender = (_, type) => {
    if (type === 'prev') return Prev;
    if (type === 'next') return Next;
  };

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

  useEffect(() => {
    if (userBooks) {
      setData(userBooks);
      setCurrent(1);
    }
  }, [userBooks]);

  return (
    <Stack width={'full'} mb={['36px', '48px']}>
      {userBooks ? (
        userBooks.length > 0 ? (
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
              {results.map(({ bookKey, cover, ...otherBookProps }, idx) => (
                <CoverBookListItem
                  key={idx}
                  cover_i={cover}
                  bookKey={bookKey}
                  {...otherBookProps}
                />
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
        ) : (
          <Text textAlign={'center'}>No books found.</Text>
        )
      ) : (
        <Text textAlign={'center'}>No books found.</Text>
      )}
    </Stack>
  );
};

const mapStateToProps = createStructuredSelector({
  userBooks: selectUserBooks,
});

export default connect(mapStateToProps)(UserBooksList);
