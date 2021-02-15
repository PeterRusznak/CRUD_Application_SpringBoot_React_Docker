import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CustomerHook from './components/CustomerHook';
import CreateHook from './components/CreateHook';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route path="/" exact component={CustomerHook}></Route>
            <Route path="/customers" component={CustomerHook}></Route>
            <Route path="/add/:id" component={CreateHook}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
