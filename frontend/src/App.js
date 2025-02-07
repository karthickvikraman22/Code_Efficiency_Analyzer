import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Question from './components/Question';
import { Routes, Route } from 'react-router-dom';
import Ide from './components/Ide';
import { AuthProvider, useAuth } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App flex justify-center">
        <Routes>
          <Route path='/' element={<Home/>} />

          {/* User routes */}
          <Route path='/register' element={<Signup/>}/>
          <Route path='/login' element={<LoginOrQuestion/>}/>

          {/* Question routes */}
          <Route path='/questions' element={<LoginOrQuestion/>}/>
          <Route path='/questions/easy' element={<LoginOrQuestion/>}/>
          <Route path='/questions/medium' element={<LoginOrQuestion/>}/>
          <Route path='/questions/hard' element={<LoginOrQuestion/>}/>

          {/* Editor routes */}
          <Route path='/questions/editor' element={<LoginOrIde/>}/>
          <Route path='/questions/easy/editor' element={<LoginOrIde/>}/>
          <Route path='/questions/medium/editor' element={<LoginOrIde/>}/>
          <Route path='/questions/hard/editor' element={<LoginOrIde/>}/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

function LoginOrQuestion(){
  const { isAuthenticated } = useAuth();
  return isAuthenticated?<Question/>:<Login/>;
}

function LoginOrIde() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated?<Ide/>:<Login/>;
}

export default App;
