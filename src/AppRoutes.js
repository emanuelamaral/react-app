import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import UserList from "./views/user/UserList";
import UserForm from "./views/user/UserForm";
import NotFound from "./views/NotFound";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/user" element={<UserList />}></Route>
            <Route path="/user/new" element={<UserForm />}></Route>
            <Route path="/user/:id" element={<UserForm />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    );
}

export default AppRoutes;