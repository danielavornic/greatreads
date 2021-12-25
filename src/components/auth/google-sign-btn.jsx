import { connect } from 'react-redux';

import { Button } from '@chakra-ui/react';

import { googleSignInStart } from '../../redux/user/user.actions';

const GoogleSignButton = ({ googleSignInStart }) => (
  <Button colorScheme='google' onClick={googleSignInStart}>
    Continue with Google
  </Button>
);

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
});

export default connect(null, mapDispatchToProps)(GoogleSignButton);
