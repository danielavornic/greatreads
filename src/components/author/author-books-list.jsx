import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { VStack, Stack, Grid } from '@chakra-ui/layout';

import { selectAuthorWorks } from '../../redux/authors/authors.selectors';

import CoverBookListItem from '../books/cover-book-list-item';
import CustomPagination from '../common/custom-pagination';

const AuthorBooksList = ({ works }) => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);

  const pageSize = 24;
  const offset = (current - 1) * pageSize;
  const results = data ? data.slice(offset, offset + pageSize) : [];

  useEffect(() => {
    if (works) {
      setData(works.docs);
      setCurrent(1);
    }
  }, [works]);

  return (
    <Stack width={'full'} mb={['36px', '48px']}>
      {works ? (
        works.numFound > 0 ? (
          <VStack spacing={['28px', '36px']}>
            <Grid
              w={'full'}
              templateColumns={[
                'repeat(3, 1fr)',
                'repeat(5, 1fr)',
                'repeat(4, 1fr)',
                'repeat(5, 1fr)',
                'repeat(6, 1fr)',
              ]}
              gap={4}
            >
              {results.map(({ key, ...otherBookProps }) => {
                return (
                  <CoverBookListItem
                    key={key}
                    booKey={null}
                    {...otherBookProps}
                  />
                );
              })}
            </Grid>
            {data && data.length > pageSize ? (
              <CustomPagination
                data={data}
                pageSize={pageSize}
                current={current}
                setCurrent={setCurrent}
              />
            ) : null}
          </VStack>
        ) : null
      ) : null}
    </Stack>
  );
};

const mapStateToProps = createStructuredSelector({
  works: selectAuthorWorks,
});

export default connect(mapStateToProps)(AuthorBooksList);
