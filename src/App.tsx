import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components';
import { RequireAuth } from './layouts';
import { Edit, Home, Login, Register } from './pages';
import { useContext } from 'react';
import { UserContext } from './context/userProvider';
import { LayoutContainerForm, Layout404, LayoutRedirect } from './layouts';

function App() {

  const { user } = useContext(UserContext);

  if (user === false) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<RequireAuth />}
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path="edit/:nanoid"
            element={<Edit />}
          />
        </Route>

        <Route
          path="/"
          element={<LayoutContainerForm />}
        >
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
        </Route>

        <Route path="/:nanoid" element={<LayoutRedirect />} >
          <Route
            index
            element={<Layout404 />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App
