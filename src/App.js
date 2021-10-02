import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './pages/homepage';
import SearchPage from './pages/search';
import BookPage from './pages/book';
import GenresPage from './pages/genres';
import GenrePage from './pages/genre';
import AuthorPage from './pages/author';

import Header from './components/common/header';
import Footer from './components/common/footer';

import './App.css';

function App() {
  return (
    <div id='container'>
      <Header />
      <div id='main-content'>
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
          <Route exact path='/genres/' component={GenresPage} />
          <Route exact path='/genres/:genreName' component={GenrePage} />
          <Route exact path='/authors/:authorKey' component={AuthorPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
