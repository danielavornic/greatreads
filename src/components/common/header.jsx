import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import {
	chakra,
	Flex,
	VisuallyHidden,
	HStack,
	Button,
	Avatar,
} from '@chakra-ui/react';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import { ReactComponent as Logo } from '../../assets/greatreads-logo.svg';

const Header = ({ currentUser, signOutStart }) => (
	<chakra.header
		bg={'white'}
		w='full'
		px={{ base: 4, md: 8, lg: 10 }}
		py={4}
		borderBottom='1px'
		borderColor='gray.200'
	>
		<Flex alignItems='center' justifyContent='space-between' mx='auto'>
			<Flex>
				<Link to='/'>
					<Logo />
					<VisuallyHidden>greatreads</VisuallyHidden>
				</Link>
			</Flex>
			<HStack display='flex' alignItems='center' spacing={1}>
				{currentUser ? (
					<HStack>
						<Link to='/'>
							<Button variant='ghost' size='sm' onClick={signOutStart}>
								Sign out
							</Button>
						</Link>
						<Avatar
							size='sm'
              bg={'brand.500'}
							color={'white'}
							name={currentUser.displayName}
							src={currentUser.photoURL ? currentUser.photoURL : ''}
						/>
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
			</HStack>
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
