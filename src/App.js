import Signup from './page/authentication/signup/Signup'
import Login from './page/authentication/Login/Login'
import Profile from './compnents/Profile';
import PrivateRoute from './routes/PrivateRoute';
import AllUser from './page/AllUser';
import ShowProfile from './page/ShowProfile';
import { Route,Routes,Navigate} from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
    <Route path='/profile/:id' element={ < PrivateRoute><Profile/></PrivateRoute>} />
    <Route path="/reload" component={null} key="reload" />
    <Route path='/alluser' element={< AllUser/>} />
    <Route path='/getuser/:id' element={< ShowProfile/>} />
    <Route path='/login' element={< Login/>} />
    <Route path='/signup' element={<Signup />} />
    <Route path="*"  element={ < Navigate to="/login" />} ></Route>
    </Routes>
    </>
  );
}

export default App;
