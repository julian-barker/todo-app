import React from 'react';
import Header from './Components/Header';
import ToDo from './Components/ToDo';
import Settings from './Components/Settings';
import Login from './Components/Auth/Login';
import {
  createRouteConfig,
  createReactRouter,
  RouterProvider,
  Outlet
} from '@tanstack/react-router';

import './App.scss';

const rootRoute = createRouteConfig();

const home = rootRoute.createRoute({
  path: '/',
  component: () => (
    <>
      <Header />
      <ToDo />
      <Outlet />
    </>
  ),
});

const settings = rootRoute.createRoute({
  path: '/settings',
  component: () => (
    <>
      <Header />
      <Settings />
      <Outlet />
    </>
  ),
});

const login = rootRoute.createRoute({
  path: '/login',
  component: () => (
    <>
      <Header />
      <Login />
      <Outlet />
    </>
  ),
});

const routeConfig = rootRoute.addChildren([home, settings, login]);


// const Layout = ({children}) => (
//   <>
//     <Header />
//     <SettingsProvider>
//       {children}
//     </SettingsProvider>
//   </>
// );

// const layoutRoute = rootRoute.createRoute({
//   id: 'layout',
//   component: Layout,
// });

// const home = layoutRoute.createRoute({
//   path: '/',
//   component: ToDo,
// });

// const settings = layoutRoute.createRoute({
//   path: '/settings',
//   component: Settings,
// });

// const routeConfig = rootRoute.addChildren([
//   layoutRoute.addChildren([home, settings]),
// ]);

const router = createReactRouter({routeConfig});

const App = () => {
  return (
    <RouterProvider router={router} ></RouterProvider>
  );
};

export default App;
