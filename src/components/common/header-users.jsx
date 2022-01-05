import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import {
  chakra,
  Flex,
  Box,
  VisuallyHidden,
  HStack,
  VStack,
  Button,
  Avatar,
  Menu,
  MenuGroup,
  MenuItem,
  MenuButton,
  MenuList,
  MenuDivider,
  useDisclosure,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import {
  selectCurrentUser,
  selectUsername,
} from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import SearchInput from '../search/search-input';
import { ReactComponent as Logo } from '../../assets/greatreads-logo.svg';

const HeaderUsers = ({ currentUser, signOutStart, username }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <chakra.header
      bg='rgba(255, 255, 255, 0.9)'
      w='full'
      px={{ base: 4, md: 8, lg: 10 }}
      py={4}
      borderBottom='1px'
      borderColor='gray.200'
      position='fixed'
      zIndex='100'
      backdropFilter='saturate(190%) blur(5px)'
      boxShadow='xs'
    >
      <Flex alignItems='center' justifyContent='space-between' mx='auto'>
        <IconButton
          size={'md'}
          variant={'ghost'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ base: currentUser ? 'block' : 'none', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Link to='/'>
            <Logo />
            <VisuallyHidden>greatreads</VisuallyHidden>
          </Link>
          <HStack
            as={'nav'}
            spacing={6}
            ms={12}
            display={{ base: 'none', md: 'flex' }}
          >
            <Link to='/'>
              <Text fontSize={14}>Home</Text>
            </Link>
            <Link to={`/users/${username}/books/all`}>
              <Text fontSize={14}>My books</Text>
            </Link>
          </HStack>
        </HStack>
        <HStack spacing={4}>
          <Box display={{ base: 'none', md: 'block' }}>
            <SearchInput inputCategory='books' headerInput />
          </Box>
          <Menu bg={'white'}>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <Avatar
                size='sm'
                bg={'brand.500'}
                color={'white'}
                name={currentUser.displayName}
                src={currentUser.photoURL ? currentUser.photoURL : ''}
              />
            </MenuButton>
            <MenuList>
              <MenuGroup title={currentUser.displayName} pb={2}>
                {/* <MenuItem>Profile</MenuItem> */}
              </MenuGroup>
              <MenuDivider />
              <Link to='/'>
                <MenuItem onClick={signOutStart}>Sign out</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pt={6} pb={4} display={{ md: 'none' }}>
          <VStack as={'nav'} spacing={4}>
            <SearchInput inputCategory='books' headerInput />
            <Link to='/'>Home</Link>
            <Link to={`/users/${username}/books/all`}>My books</Link>
          </VStack>
        </Box>
      ) : null}
    </chakra.header>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  username: selectUsername,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUsers);
