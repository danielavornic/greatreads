import { Switch, Route } from 'react-router-dom';

import Homepage from './pages/homepage';

import Header from './components/header';
import Footer from './components/footer';

import './App.css';

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={Homepage}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
