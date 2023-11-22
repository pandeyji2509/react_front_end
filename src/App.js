import logo from './logo.svg';
import './App.css';
import Question from './components/Question';
import Forms from './components/Forms';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
   <Router>
   <Routes>
     <Route path="/" exact element={<Forms />}></Route>
     <Route path="/question" exact element={<Question/>}></Route>
    </Routes>
   </Router>   
    </div>
  );
}

export default App;
