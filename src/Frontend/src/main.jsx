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
import DashboardPage from './pages/DashboardPage';
import { Navbar } from './components/Navbar';
import { Card } from './components/Card';
import { Dash } from './components/Dash';
import { Gallery } from './components/Gallery';
import { Filter } from './components/Filter';
import { Modal } from './components/Modal';
import { Banner } from './components/Banner';
import { SideBar } from './components/SideBar';
import './styles/global.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <div></div>,
        errorElement: <ErrorPage />,
        loader: async () => {
            return redirect('/login');
        },
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
    {
        path: '/card',
        element: <Card />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/dash',
        element: <Dash />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/gallery',
        element: <Gallery />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/modal',
        element: <Modal />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/navbar',
        element: <Navbar />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/filter',
        element: <Filter />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/sidebar',
        element: <SideBar />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/dashboard',
        element: <DashboardPage />,
        errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
