import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import { Container } from '@chakra-ui/react';

import { selectCurrentUser } from './redux/user/user.selectors';

import HomePage from './pages/homepage';
import SearchPage from './pages/search';
import BookPage from './pages/book';
import AuthorPage from './pages/author';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import UserBooksPage from './pages/user-books';
import Page404 from './pages/404';

import Header from './components/common/header';
import HeaderUsers from './components/common/header-users';
import Footer from './components/common/footer';

import './App.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const allRoutes = [
  '/',
  '/signin/',
  '/signup/',
  '/search/:category/:term/',
  '/books/:bookKey',
  '/authors/:authorKey',
  '/users/:username/books',
  '/users/:username/books/all',
  '/users/:username/books/:shelf/:rating?',
  '*',
];

const App = ({ currentUser }) => (
  <div id='container'>
    <Route
      exact
      path={allRoutes}
      component={currentUser ? HeaderUsers : Header}
    />
    <Container
      px='0'
      mt={{ base: 24, md: 28 }}
      mb={{ base: 22, md: 24 }}
      maxW={'full'}
      id='main-content'
    >
      <ScrollToTop />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/signin/'>
          {currentUser ? <Redirect to='/' /> : <SignInPage />}
        </Route>
        <Route path='/signup/'>
          {currentUser ? <Redirect to='/' /> : <SignUpPage />}
        </Route>
        <Route exact path='/search/:category/:term/' component={SearchPage} />
        <Route exact path='/books/:bookKey' component={BookPage} />
        <Route exact path='/authors/:authorKey' component={AuthorPage} />
        <Route exact path='/users/:username/books'>
          <Redirect to='all' />
        </Route>
        <Route
          exact
          path='/users/:username/books/:shelf/:rating?'
          component={UserBooksPage}
        />
        <Route route='*' component={Page404} />
      </Switch>
    </Container>
    <Footer />
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
