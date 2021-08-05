import { Switch, Route } from 'react-router-dom';

import Homepage from './pages/homepage';

import Header from './components/header.component';

import './App.css';

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={Homepage}/>
      </Switch>
    </div>
  );
}

export default App;
