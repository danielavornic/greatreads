import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage';
import SearchPage from './pages/search';

import Header from './components/header';
import Footer from './components/footer';

import './App.css';

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/search' component={SearchPage}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
