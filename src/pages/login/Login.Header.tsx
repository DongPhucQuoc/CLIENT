import { useState, useEffect } from 'react'
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { GetCartQuantity } from "services/Setting.Service";

const { Header } = Layout;

const LoginHeader = () => {
  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const url = window.location.pathname;

  useEffect(() => {
    GetCartQuantity()
      .then(res => setCartQuantity(res.data.result))
      .catch(e => console.log(e));
  }, []);

  return (
    <Header>
      <div className="header__left-side">
        <div className="header__left-side__logo">
          <Link to="/">
            <img src="http://thehoneycoffee.com/wp-content/themes/thehoneycoffee/assets/images/logo_text_yellow.png" />
          </Link>
        </div>
        <Menu theme="dark"
          defaultSelectedKeys={url === "/" ? ['1'] : url === "/product" ? ["2"] : ["0"]}
        >
          <Menu.Item key="1"><Link to="/">Trang chủ</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/product">Sản phẩm</Link></Menu.Item>
        </Menu>
      </div>
      <div className="header__right-side">
        <Menu theme="dark"
          defaultSelectedKeys={(url === "/cart" || url === "/login") ? ['1'] : ["2"]}
        >
          <Menu.Item>
            <Link to="/cart"><ShoppingCartOutlined className="header__icons header__right-side__cart-icon" /></Link>
            <div className="header__right-side__cart">
              <div className="header__right-side__cart-circle"></div>
              <div className="header__right-side__cart-quantity"><span>{cartQuantity}</span></div>
            </div>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login">Đăng nhập</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/register">Đăng ký</Link>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  )
}

export default LoginHeader
