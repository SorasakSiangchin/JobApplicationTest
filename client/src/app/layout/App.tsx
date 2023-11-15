import { useCallback, useEffect } from 'react'
import {
  Route,
  Routes,
} from "react-router-dom";
import { useAppDispatch } from '../stores/configureStore';
import { getCurrentAccount } from '../stores/accountSlice';
import { PrivateLogin, PrivateRoute } from './PrivateRoute';
import LoginPage from '../../features/LoginPage';
import FeedPage from '../../features/FeedPage';
import RegisterPage from '../../features/RegisterPage';
import ErrorPage from '../../features/ErrorPage';
import ProfilePage from '../../features/ProfilePage';
import ProfileFriendPage from '../../features/ProfileFriendPage';
import FriendsPage from '../../features/FriendsPage';

const App = () => {
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    try {
      await dispatch(getCurrentAccount())
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <Routes>
      <Route path="/" element={<PrivateLogin>
        <LoginPage />
      </PrivateLogin>} />

      <Route path="/register" element={<PrivateLogin>
        <RegisterPage />
      </PrivateLogin>} />

      <Route element={<PrivateRoute />} >
        <Route path='/profile' element={<ProfilePage />} />
        <Route path="/profileFriend/:friendId" element={<ProfileFriendPage />} />
        <Route path='/friends' element={<FriendsPage />} />
        <Route path="/feed" element={<FeedPage />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default App