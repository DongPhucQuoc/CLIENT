import { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { getQuantityCartItems, removeUserSession } from 'utils/Common';
import { getTokenLocal } from 'utils/Common';
import { Link } from "react-router-dom";

const { Header } = Layout;

const handleClickLogout = () => {
  removeUserSession();
}

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/profile">Thông tin cá nhân</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/history">Xem lịch sử</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/statistic">Xem thống kê</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/change-password">Đổi mật khẩu</Link>
    </Menu.Item>
    <Menu.Item onClick={handleClickLogout}>
      <Link to="/login">Đăng xuất</Link>
    </Menu.Item>
  </Menu>
);

const MyHeader = () => {
  const [token, setToken] = useState<any>(getTokenLocal());
  const [items, setItems] = useState<number>(0);
  const url = window.location.pathname;

  useEffect(() => {
    setToken(getTokenLocal());
  }, [token]);

  useEffect(() => {
    const array = JSON.parse(getQuantityCartItems());
    setItems(array.length);
  }, [JSON.parse(getQuantityCartItems())]);


  return (
    <Header>
      <div className="header__left-side">
        <div className="header__left-side__logo">
          <Link to="/">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxagvwT8no9oEEoQZwbrLs4dwl7mlmCEQWg&usqp=CAU" />
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
          defaultSelectedKeys={(url === "/cart") ? ['1'] : ["2"]}
        >
          <Menu.Item key="1">
            <Link to="/cart"><ShoppingCartOutlined className="header__icons header__right-side__cart-icon" /></Link>
            <div className="header__right-side__cart">
              <div className="header__right-side__cart-circle"></div>
              <div className="header__right-side__cart-quantity">
                <span>{items}</span>
              </div>
            </div>
          </Menu.Item>
          {
            token ? (
              <Dropdown overlay={menu} placement="bottomRight">
                <Menu.Item key="2"><UserOutlined className="header__icons" /></Menu.Item>
              </Dropdown>
            ) : (
              <>
                <Menu.Item>
                  <Link to="/login">Đăng nhập</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/register">Đăng ký</Link>
                </Menu.Item>
              </>
            )
          }
        </Menu>
      </div>
    </Header>
  )
}

export default MyHeader
