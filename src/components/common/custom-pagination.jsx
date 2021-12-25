import Pagination from '@choc-ui/paginator';

const CustomPagination = ({
  current,
  pageSize,
  data,
  itemRender,
  setCurrent,
}) => (
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

export default CustomPagination;
