import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import SignUpPage from './pages/SignUpPage';
import axiosInstance, { setAccessToken } from './axiosInstance';
import LogInPage from './pages/LogInPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance('tokens/refresh')
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setUser(null);
        setAccessToken('');
      });
  }, []);

  const signupHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    const res = await axiosInstance.post('authRouter/signup', data);
    if (res.status !== 201) {
      return alert('Something went wrong');
    }
    console.log(res);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const res = await axiosInstance.post('authRouter/login', data);

    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
  };

  const logoutHandler = async () => {
    await axiosInstance.post('authRouter/logout');
    setUser(null);
    setAccessToken('');
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/signup',
          element: <SignUpPage signupHandler={signupHandler} />,
        },
        {
          path: '/login',
          element: <LogInPage loginHandler={loginHandler} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
