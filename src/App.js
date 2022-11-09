import Signup from './page/authentication/signup/Signup'
import Login from './page/authentication/Login/Login'
import Profile from './compnents/Profile';
import PrivateRoute from './routes/PrivateRoute';
import AllUser from './page/AllUser';
import ShowProfile from './page/ShowProfile';
import YourProfile from './page/YourProfile';
import { Route,Routes,Navigate} from 'react-router-dom';
import Navbar from './page/Navbar';
import ChangePassword from './page/ChangePassword';

function App() {
  return (
    <>
    <Routes>
    <Route path='/profile/:id' element={ < PrivateRoute><Profile/></PrivateRoute>} />
    <Route path="/reload" component={null} key="reload" />
    <Route path='/alluser' element={< AllUser/>} />
    <Route path='/getuser/:id' element={< ShowProfile/>} />
    <Route path='/getprofile' element={< PrivateRoute>< YourProfile/></PrivateRoute>} />
    <Route path='/changepassword' element={< PrivateRoute>< ChangePassword/></PrivateRoute>} />
    <Route path='/login' element={< Login/>} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/navbar' element={<Navbar />} />
    <Route path="*"  element={ < Navigate to="/login" />} ></Route>
    </Routes>
    </>
  );
}

export default App;
