import './App.css';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Question from './Pages/Question';
import { Routes, Route } from 'react-router-dom';
import Ide from './Pages/Ide';

function App() {
  return (
      <div className="App flex justify-center">
        <Routes>
          <Route path='/' element={<Home/>} />

          {/* User routes */}
          <Route path='/register' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>

          {/* Question routes */}
          <Route path='/questions' element={<Question/>}/>

          {/* Editor routes */}
          <Route path='/questions/:id' element={<Ide/>}/>
        </Routes>
      </div>
  );
}

export default App;
