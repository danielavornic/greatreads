import { forwardRef } from 'react';
import { Button } from '@chakra-ui/react';
import Pagination from '@choc-ui/paginator';

const CustomPagination = ({ current, pageSize, data, setCurrent }) => {
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

  return (
    <Pagination
      current={current}
      onChange={(page) => {
        setCurrent(page);
        window.scrollTo(0, 0);
      }}
      pageSize={pageSize}
      total={data.length}
      itemRender={itemRender}
      paginationProps={{
        display: 'flex',
      }}
      responsive
    />
  );
};

export default CustomPagination;
