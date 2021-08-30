import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './pages/homepage';
import SearchPage from './pages/search';
import BookPage from './pages/book';
import GenresPage from './pages/genres';
import GenrePage from './pages/genre';

import Header from './components/header';
import Footer from './components/footer';

import './App.css';

function App() {
  return (
    <div id='container'>
      <Header />
      <div id='main-content'>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/search/:category?/:query?' component={SearchPage} />
          <Route exact path='/books/'>
            <Redirect to='/search/' />
          </Route>
          <Route exact path='/books/:bookKey' component={BookPage} />
          <Route exact path='/genres/' component={GenresPage} />
          <Route exact path='/genres/:genreName' component={GenrePage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
