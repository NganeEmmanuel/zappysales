import { RouterProvider } from 'react-router-dom';
import router from './app/routes/router';

/**
 * Root Application Component bootstrapping the React Router.
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
