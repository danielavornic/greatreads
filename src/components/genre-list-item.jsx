import { Link } from 'react-router-dom';

import {
  ListItem,
  Text,
} from '@chakra-ui/layout';

const GenreListItem = ({ path, name, count }) => (
  <ListItem pb='4px'>
    <Text 
      textDecor='underline' 
      color={'brand.600'} 
      fontSize='lg' 
      display='inline'
    >
      <Link to={`/genres/${path.split('/')[2]}`}>
        {name}
      </Link>
    </Text>
    <Text 
      fontSize='sm'
      display='inline'
      ml='10px'
    >
      {count} books
    </Text>
  </ListItem>
);

export default GenreListItem;