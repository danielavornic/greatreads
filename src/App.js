import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage';
import SearchPage from './pages/search';
import BookPage from './pages/book';

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
          <Route path='/search' component={SearchPage} />
          <Route path='/book:bookKey' component={BookPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
