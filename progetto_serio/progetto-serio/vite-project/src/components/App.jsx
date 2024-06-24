import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profilo from './Profilo';
import UpdateUser from './updateUser';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomeComp from './homeComp/HomeComp';
import HomeEmp from './homeEmp/HomeEmp';
import Sidebar from "./sidebar/Sidebar";
import ProfiloUtente from "./ProfiloUtente";
import Chat from './Chat';


function App() {

  const isLoggedIn=window.localStorage.getItem("loggedIn")
  return (
    <div>
      <BrowserRouter >
      {/*{isLoggedIn && <Sidebar />}*/}
        <Routes>
          <Route path="/" element ={isLoggedIn=="true"? <Profilo/>: <Login/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/home" element ={<Home/>} />
          {/*<Route path="/userProfile" element={<ProfiloUtente/>}/>*/}
          <Route path="/profile/:name" element ={<Profilo/>} />
          <Route path="/privato/:privatoId" element={<ProfiloUtente/>} />
          <Route path="/azienda/:aziendaId" element={<ProfiloUtente/>} />
          <Route path="/profilo" element ={<Profilo/>} />
          <Route path="/updateUser" element ={<UpdateUser/>} />
          <Route path="/feedAziende" element={<HomeComp/>} />
          <Route path="/feedPrivati" element={<HomeEmp/>} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
