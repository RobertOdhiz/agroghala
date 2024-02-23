import {
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registrationform from "./Components/Registrationform";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Feedback from "./Components/Feedback";
import Ghalas from "./Components/Ghalas";
import Blogspage from "./Components/Blogspage";
import Sokopage from "./Components/Sokopage";
import Logout from "./Components/logout";
import Assistant from "./Components/assistant"

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Registrationform /> },
  { path: "/login", element: <Login/> },
  { path: "/feedback", element: <Feedback/> },
  { path: "/ghalas", element: <Ghalas/> },
  { path: "/blogs", element: <Blogspage/> },
  { path: "/soko", element: <Sokopage/> },
  { path: "/logout", element: <Logout/> },
]);

function App() {
  return (
    <div className="px-10">
        <Assistant />
      <RouterProvider router={router}>
        <Routes>
          <Route element={router} />
        </Routes>
      </RouterProvider>
    </div>
  );
}

export default App;
