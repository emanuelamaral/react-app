import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import UserList from "./views/user/UserList";
import UserForm from "./views/user/UserForm";
import Login from "./Login";
import NotFound from "./views/NotFound";
import Cadastro from "./Cadastro";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" exact element={<Login/>}></Route>
            <Route path="/cadastro" element={<Cadastro/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/user" element={<UserList />}></Route>
            <Route path="/user/new" element={<UserForm />}></Route>
            <Route path="/user/:id" element={<UserForm />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    );
}

export default AppRoutes;