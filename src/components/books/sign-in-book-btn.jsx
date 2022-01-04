import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SignInBookBtn = () => (
  <Link to='/signin'>
    <Button width={'full'} colorScheme={'brand'}>
      Sign in to log book
    </Button>
  </Link>
);

export default SignInBookBtn;
