import logo from './logo.svg';
import '../public/css/style.css';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes,Switch } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
