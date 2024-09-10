import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store/store';
import BookList from './components/Book/BookList';
import BookOne from './components/Book/BookOne';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <BookList />
      },
    ]
  },
  {
    path: "/books/:bookId",
    element: <BookOne />
  }
])

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
