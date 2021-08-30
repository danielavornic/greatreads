import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
  }, [genre])

  return (
    <Stack mb={['36px', '48px']}>
      <Text fontWeight='700' textTransform='capitalize' color={'brand.600'}>
        Related { data }
      </Text>
      <List>
        {
          items
          ? items.length > 0
            ? items.slice(1, 11).map(
              ({ name, key }) =>
              <ListItem key={name}>
                <Link to={`/${data}/${key.split('/')[2]}`}>
                  <Text 
                    color={'gray.600'} 
                    textDecor='underline' 
                    textOverflow='ellipsis'
                    overflow='hidden'
                    whiteSpace='nowrap'
                  >
                    {name}
                  </Text>
                </Link>
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
})

export default connect(mapStateToProps)(RelatedList);