import { Link } from 'react-router-dom';

import { ListItem, Text } from '@chakra-ui/layout';

const AuthorListItem = ({ path, name, work_count, birth_date, death_date, top_work }) => (
  <ListItem pb='10px'>
    <Text 
      display='inline'
      textDecor='underline' 
      color={'brand.600'} 
      fontSize='lg' 
    >
      <Link to={`/authors/${path}`}>
        {name}
      </Link>
    </Text>
    {
      birth_date || death_date
      ? <Text display='inline' pl='10px'>
          (
          { birth_date ? `${birth_date} - ` : '? - ' }
          { death_date ? `${death_date}` : '' }
          )
        </Text>
      : null
    }
    <Text fontSize='sm' pt='4px'>
      {work_count} books
      { top_work ? ` including ${top_work}` : '' }
    </Text>
  </ListItem>
);

export default AuthorListItem;