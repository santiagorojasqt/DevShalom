import logo from './logo.svg';
import './public/css/style.css';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/" component={<Login/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
