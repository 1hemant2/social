import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile'
import EditProfile from './pages/Profile/EditProfile';
import { useSelector } from 'react-redux';
import UploadPost from './pages/UploadPost';
import Spinner from './component/Spinner';
import Followers from './pages/Profile/Followers';
import OthersProfile from './pages/OthersProfile'
import Following from './pages/Profile/Following';
import Search from './pages/Search';
import ProtectedPage from './component/ProtectedPage';
import Message from './pages/Message/Message';
import Notificaton from './pages/Notification/Notificaton';

const App = () => {
  const { loading } = useSelector(state => state.loaders);
  return (
    <div className=''>
      {
        loading && <Spinner></Spinner>
      }
      <BrowserRouter >
        <Routes>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/' element={<ProtectedPage><Home></Home></ProtectedPage>}></Route>
          <Route path='/profile' element={<ProtectedPage><Profile></Profile></ProtectedPage>}></Route>
          <Route path='/editProfile' element={<ProtectedPage><EditProfile></EditProfile></ProtectedPage>}></Route>
          <Route path='/uploadPost' element={<ProtectedPage><UploadPost></UploadPost></ProtectedPage>}></Route>
          <Route path='/followers' element={<ProtectedPage><Followers></Followers></ProtectedPage>}></Route>
          <Route path='/following' element={<ProtectedPage><Following></Following></ProtectedPage>}></Route>
          <Route path='/OthersProfile' element={<ProtectedPage><OthersProfile></OthersProfile></ProtectedPage>}></Route>
          <Route path='/search' element={<ProtectedPage><Search></Search></ProtectedPage>}></Route>
          <Route path='/message' element={<ProtectedPage><Message></Message></ProtectedPage>}></Route>
          <Route path='/notification' element={<ProtectedPage><Notificaton></Notificaton></ProtectedPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;