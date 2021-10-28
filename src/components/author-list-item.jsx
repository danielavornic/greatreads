import { Link } from 'react-router-dom';

import { Box, Heading, Text } from '@chakra-ui/layout';

const AuthorListItem = ({ path, name, work_count, birth_date, death_date, top_work }) => (
  <Box 
    border='1px'
    borderColor='brand.50'
    borderRadius='10px'
    padding={['24px', '28px']}
    width={'full'}
  >
    <Heading 
      as='h5'
      display='inline'
      color={'brand.600'} 
      fontSize={{ base: 'lg', md: 'xl' }}
      fontWeight='600'
      _hover={{ textDecor: 'underline' }}
    >
      <Link to={`/authors/${path}`}>
        {name}
      </Link>
    </Heading>
    {
      birth_date || death_date
      ? <Text display='inline' pl='10px' fontSize={{ base: 'md', md: 'lg' }}>
          (
          { birth_date ? `${birth_date} - ` : '? - ' }
          { death_date ? `${death_date}` : '' }
          )
        </Text>
      : null
    }
    <Text fontSize='sm' pt='4px'>
      {work_count} books
      { top_work ? ` including "${top_work}"` : '' }
    </Text>
  </Box>
);

export default AuthorListItem;