import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { selectGenre } from '../redux/genres/genres.selectors';

import { 
  Text, 
  Stack, 
  List, 
  ListItem 
} from '@chakra-ui/layout';

const RelatedList = ({ genre, data }) => {
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    if (data === 'genres')
      setItems(genre.relatedGenres.docs);
    else if (data === 'authors')
      setItems(genre.authors);
  }, [data, genre]);

  return (
    <Stack mb={['36px', '48px']}>
      <Text 
        fontWeight='700' 
        textTransform='uppercase'
      >
        Related { data }
      </Text>
      <List>
        {
          items
          ? items.length > 0
            ? items.slice(1, 11).map(
              ({ name, key }) =>
              <ListItem key={name}>
                <Text 
                  color={'brand.600'} 
                  textDecor='underline' 
                  textOverflow='ellipsis'
                  overflow='hidden'
                  whiteSpace='nowrap'
                >
                  <Link to={`/${data}/${key.split('/')[2]}`}>
                    {name}
                  </Link>
                </Text>
              </ListItem>
            )
            : null
          : null
        }
      </List>
    </Stack>
  )
};

const mapStateToProps = createStructuredSelector({
  genre: selectGenre
});

export default connect(mapStateToProps)(RelatedList);