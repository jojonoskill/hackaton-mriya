import logo from './logo.svg';
import './App.css';
import ErrorPage from './pages/error-page';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Student from "./pages/Student";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Student/>,
    errorElement: <ErrorPage />,
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
