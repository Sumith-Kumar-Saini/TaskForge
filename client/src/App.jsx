import { Provider } from "react-redux";
import AppRouter from "@/router";
import { store } from "@/store/store";
// import RegisterForm from "./pages/Register";
// import LoginForm from "./pages/Login";

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
      {/* <RegisterForm/>
      <LoginForm/> */}
    </Provider>
  );
};

export default App;
