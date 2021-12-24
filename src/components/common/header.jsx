import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import {
	chakra,
	Flex,
	Box,
	VisuallyHidden,
	HStack,
	Button,
	Avatar,
	Menu,
	MenuGroup,
	MenuItem,
	MenuButton,
	MenuList,
	MenuDivider,
} from '@chakra-ui/react';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import SearchInput from '../search/search-input';
import { ReactComponent as Logo } from '../../assets/greatreads-logo.svg';

const Header = ({ currentUser, signOutStart }) => (
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
			<Link to='/'>
				<Logo />
				<VisuallyHidden>greatreads</VisuallyHidden>
			</Link>
			{currentUser ? (
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
							<MenuGroup title={currentUser.displayName}>
								<MenuItem>Profile</MenuItem>
							</MenuGroup>
							<MenuDivider />
							<Link to='/'>
								<MenuItem onClick={signOutStart}>Sign out</MenuItem>
							</Link>
						</MenuList>
					</Menu>
				</HStack>
			) : (
				<HStack>
					<Link to='/signin'>
						<Button variant='ghost' size='sm'>
							Sign in
						</Button>
					</Link>
					<Link to='/signup'>
						<Button colorScheme='brand' size='sm'>
							Sign up
						</Button>
					</Link>
				</HStack>
			)}
		</Flex>
	</chakra.header>
);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
