import Dashboard from "./views/Dashboard.js";
import Map from "./views/Map.js";
import UserProfile from "./views/user/UserProfile.js";
import UserForm from "./views/user/UserForm.js";
import UserList from "./views/user/UserList.js";
import DisposiForm from "./views/Dispositivos/DisposiForm.js";
import DisposiList from "./views/Dispositivos/DispositivosList.js";
import GatewaysList from "./views/gateway/GatewaysList.js";
import GatewayForm from "./views/gateway/GatewayForm.js";

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
  },
  {
    path: "/dispositivos",
    name: "Dispositivos",
    icon: "tim-icons icon-laptop",
    component: <DisposiList />,
    layout: "/admin"
  },
  {
    path: "/register-dispositivos",
    name: "Cadastro de Dispositivos",
    icon: "tim-icons icon-paper",
    component: <DisposiForm />,
    layout: "/admin"
  },
  {
    path: "/gateways",
    name: "Lista de Gateways",
    icon: "tim-icons icon-align-left-2",
    component: <GatewaysList />,
    layout: "/admin",
  },
  {
    path: "/register-gateway",
    name: "Cadastro de gateways",
    icon: "tim-icons icon-puzzle-10 ",
    component: <GatewayForm />,
    layout: "/admin",
  },
];
export default routes;
  