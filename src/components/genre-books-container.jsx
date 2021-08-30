import { useState, useEffect, forwardRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectGenre } from '../redux/genres/genres.selectors';

import {
  VStack,
  Grid,
  Stack
} from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import Pagination from '@choc-ui/paginator';

import BookListItem from './book-list-item';

const GenreBooksContainer = ({ genre }) => {
  const [ data, setData ] = useState([]);
  const [ current, setCurrent ] = useState(1);
  const pageSize = 20;
  const offset = (current - 1) * pageSize;
  const results = data ? data.slice(offset, offset + pageSize) : [];

  const Prev = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>Prev</Button>
  ));
  const Next = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>Next</Button>
  ));

  const itemRender = (_, type) => {
    if (type === 'prev') return Prev;
    if (type === 'next') return Next;
  };

  useEffect(() => {
    if (genre) {
      setData(genre.docs);
      setCurrent(1);
    }
  }, [genre]);

  return (
    <Stack width={'full'} mb={['36px', '48px']}>
      {
        genre
        ? genre.numFound > 0
          ? <Stack width='100%' maxW={'full'}>
              <VStack 
                spacing={['28px', '36px']} 
                width={'full'} 
                align='center'
              >
                <Grid
                  templateColumns={[ 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)']}
                  align='center'
                  gap={[ 4, 4, 6 ]}
                  w={'full'}
                >
                  {
                    results.map(
                      ({ key, cover_edition_key, edition_key, ...otherBookProps }) => {
                        const bookKey = cover_edition_key ? cover_edition_key : edition_key;
                        return <BookListItem key={key} bookKey={bookKey} view='cover' {...otherBookProps} />
                      }
                    ) 
                  }
                </Grid>
                {
                  data && data.length > pageSize
                    ? <Pagination
                        current={current}
                        onChange={(page) => {
                          setCurrent(page);
                          window.scrollTo(0, 0);
                        }}
                        pageSize={pageSize}
                        total={data.length}
                        itemRender={itemRender}
                        paginationProps={{
                          display: 'flex'
                        }}
                      />
                    : null
                }
              </VStack>
            </Stack>
            : null
        : null
      }
    </Stack>
  )
};

const mapStateToProps = createStructuredSelector({
  genre: selectGenre
});

export default withRouter(
  connect(mapStateToProps)
  (GenreBooksContainer)
);