import Dashboard from "./views/Dashboard.js";
import Map from "./views/Map.js";
// import Notifications from "./views/Notifications.js";
import UserProfile from "./views/user/UserProfile.js";
import UserForm from "./views/user/UserForm.js";
import UserList from "./views/user/UserList.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  // {
  //   path: "/map",
  //   name: "Map",
  //   icon: "tim-icons icon-pin",
  //   component: <Map />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notificações",
  //   icon: "tim-icons icon-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  {
    path: "/user-profile",
    name: "Perfil de Usuário",
    icon: "tim-icons icon-notes",
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Usuários",
    icon: "tim-icons icon-single-02",
    component: <UserList />,
    layout: "/admin",
  },
  {
    path: "/register-user",
    name: "Cadastro de usuário",
    icon: "tim-icons icon-badge",
    component: <UserForm />,
    layout: "/admin"
  }
];
export default routes;
