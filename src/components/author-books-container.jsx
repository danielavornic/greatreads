import { useState, useEffect, forwardRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import {
  VStack,
  Grid,
  Stack
} from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import Pagination from '@choc-ui/paginator';

import BookListItem from './book-list-item';
import { selectAuthorWorks } from '../redux/authors/authors.selectors';

const AuthorBooksContainer = ({ works }) => {
  const [ data, setData ] = useState([]);
  const [ current, setCurrent ] = useState(1);
  const pageSize = 15;
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
    if (works) {
      setData(works.docs);
      setCurrent(1);
    }
  }, [works]);

  return (
    <Stack width={'full'} mb={['36px', '48px']}>
      {
        works
        ? works.numFound > 0
          ? <VStack spacing={['28px', '36px']}>
                <Stack w={'full'} >
                  {
                    results.map(
                      ({ key, cover_edition_key, edition_key, ...otherBookProps }) => {
                        const bookKey = cover_edition_key ? cover_edition_key : edition_key;
                        return <BookListItem key={key} bookKey={bookKey} view='table' {...otherBookProps} />
                      }
                    ) 
                  }
                </Stack>
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
                        responsive
                      />
                    : null
                }
            </VStack>
            : null
        : null
      }
    </Stack>
  )
};

const mapStateToProps = createStructuredSelector({
  works: selectAuthorWorks
});

export default withRouter(
  connect(mapStateToProps)
  (AuthorBooksContainer)
);