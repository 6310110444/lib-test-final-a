import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Homepage from './components/Homepage'
import Signin from './features/auth/Signin'
import Signup from './features/auth/Signup'
import Dashboard from './components/Dashboard'
import Usercheck from './features/users/Usercheck'
import Settings from './features/settings/Settings'
import UsersList from './features/users/UsersList';
import BooksList from './features/books/BooksList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditBook from './features/books/EditBook'
import NewBook from './features/books/NewBook'
import Prefetch from './features/auth/Prefetch'
import PersistSignin from './features/auth/PersistSignin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle';

function App() {
  useTitle('Library Management System')

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* homepage routes */}
          <Route path="/" element={<Homepage />} />
              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route element={<PersistSignin />}>
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                  <Route element={<Prefetch />}>
                    <Route path="dash" element={<Homepage />} />
                    <Route element={<Dashboard />}>
                      <Route path="users" element={<Usercheck />} />
                      <Route path="/users/:id" element={<EditUser />} />
                      <Route element={<RequireAuth allowedRoles={[ROLES.Librarian, ROLES.Admin]} />}>
                      <Route path="settings">
                        <Route index element={<Settings />} />
                          <Route path="userslist">
                            <Route index element={<UsersList />} />
                            <Route path=":id" element={<EditUser />} />
                            <Route path="new" element={<NewUserForm />} />
                          </Route>
                        </Route>
                      </Route>

                      <Route path="books">
                        <Route index element={<BooksList />} />
                        <Route path=":id" element={<EditBook />} />
                        <Route path="new" element={<NewBook />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>{/* End Protected Routes */}
        </Route>
      </Routes >
    </div>
  );
}

export default App;
