import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    redirect,
} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import { Navbar } from './components/Navbar';
import { Banner } from './components/Banner';
import './styles/global.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Home</div>,
        errorElement: <ErrorPage />,
    },
    { path: '/login', element: <LoginPage />, errorElement: <ErrorPage /> },
    {
        path: '/navbar',
        element: <Navbar buildings={['Prédio 1', 'Prédio 2', 'Prédio 3']} />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/banner',
        element: <Banner />,
        errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
