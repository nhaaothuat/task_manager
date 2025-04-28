import Home from "./pages/Home/Home";
import {  Routes, Route, BrowserRouter } from "react-router-dom";

import SignUp from "./pages/Sign-up/SignUp";
import SignIn from "./pages/Sign-in/SignIn";


function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
      
        <Route path="/" exact element={<Home />} />
        <Route  path="/users/signin" exact element={<SignIn />} />
        <Route path="/users/signup" exact element={<SignUp />} />
        
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
