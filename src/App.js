import { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import HomePage from './pages/homepage';
import SearchPage from './pages/search';
import BookPage from './pages/book';
import AuthorPage from './pages/author';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';

import Header from './components/common/header';
import Footer from './components/common/footer';

import './App.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div id='container'>
      <Header />
      <div id='main-content'>
        <ScrollToTop/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/search/:category?/:term?/:facet?' component={SearchPage} />
          <Route exact path='/books/'>
            <Redirect to='/search/books/' />
          </Route>
          <Route exact path='/authors/'>
            <Redirect to='/search/authors/' />
          </Route>
          <Route exact path='/books/:bookKey' component={BookPage} />
          <Route exact path='/authors/:authorKey' component={AuthorPage} />
          <Route path='/signin/' component={SignInPage} />
          <Route path='/signup/' component={SignUpPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
