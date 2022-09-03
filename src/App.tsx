import "./styles/index.scss";
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './routes/Private.Route';
import Footer from "./components/Footer";
import LoginPage from './pages/login/Login.Page';
import HomePage from './pages/home/Home.Page';
import OrderPage from './pages/order/Order.Page';
import ProductPage from './pages/product/Product.Page';
import StatisticPage from './pages/statistic/Statistic.Page';
import RegisterPage from './pages/register/Register.Page';
import ProfilePage from './pages/profile/Profile.Page';
import CartPage from './pages/cart/Cart.Page';
import ChangePasswordPage from './pages/password/Change.Password';
import DetailPage from './pages/detail/Detail.Page';
import HistoryPage from './pages/history/History.Page';
import ForgotPasswordPage from "./pages/password/Forgot.Password";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/product" component={ProductPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/detail/:id" component={DetailPage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <PrivateRoute path="/order" component={OrderPage} />
        <PrivateRoute path="/history" component={HistoryPage} />
        <PrivateRoute path="/statistic" component={StatisticPage} />
        <PrivateRoute path="/change-password" component={ChangePasswordPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
