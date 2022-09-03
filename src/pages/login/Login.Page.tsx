import { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import Layout from "components/Layout";
import { Login } from 'services/Setting.Service';
import { SetToken } from 'services/getWays/Setting.GetWay';
import LoginHeader from './Login.Header';

const LoginPage = () => {
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const link = useHistory();

  const handleClickLogin = () => {
    if (!username || !password) {
      return;
    }

    Login(username, password)
      .then((res) => {
        const token = res.data.token;
        SetToken(token);
        link.push("/");
      })
      .catch((e) => {
        setMessage("Sai thông tin tài khoản");
        console.log(e);
      })
  }

  return (
    <>
      <LoginHeader />
      <Layout>
        <Form
          className="login__form"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[
              {
                required: true,
                message: 'Tài khoản không được trống!',
              },
            ]}
          >
            <Input onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: 'Mật khẩu không được trống!',
              },
            ]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Giữ đăng nhập</Checkbox>
          </Form.Item>

          <p className="release-status">{message}</p>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handleClickLogin}>
              Đăng nhập
            </Button>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Link className="forgot-password" to="/forgot-password">Quên mật khẩu?</Link>
          </Form.Item>
        </Form>
      </Layout>
    </>
  )
}

export default LoginPage
