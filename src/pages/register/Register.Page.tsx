import { ChangeEvent, useState } from 'react';
import Header from "components/Header";
import Layout from "components/Layout";
import { Form, Button, Input, notification } from "antd";
import UserDocument from 'interfaces/User.Interface';
import { useHistory } from "react-router-dom";
import FormDataRegister from "./Register.Data";
import { Register } from 'services/Setting.Service';
import { ValidateEmail, ValidatePhone, ValidatePassword, ComparePassword } from 'utils/Validate';

const RegisterPage = () => {
  const [message, setMessage] = useState<string>();
  const [user, setUser] = useState<UserDocument>({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const history = useHistory();

  const handleInputText = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setMessage("");
    if (name === "firstName") {
      setUser(prev => ({ ...prev, firstName: e.target.value }));
    }
    if (name === "lastName") {
      setUser(prev => ({ ...prev, lastName: e.target.value }));
    }
    if (name === "address") {
      setUser(prev => ({ ...prev, address: e.target.value }));
    }
    if (name === "phone") {
      setUser(prev => ({ ...prev, phone: e.target.value }));
    }
    if (name === "email") {
      setUser(prev => ({ ...prev, email: e.target.value }));
    }
    if (name === "password") {
      setUser(prev => ({ ...prev, password: e.target.value }));
    }
    if (name === "cPassword") {
      setUser(prev => ({ ...prev, cPassword: e.target.value }));
    }
  }

  const handleClickSignUp = () => {
    if (!user.firstName || !user.lastName || !user.address
      || !user.phone || !user.email || !user.password || !user.cPassword) {
      return;
    }

    if (!ValidatePhone(user.phone)) {
      setMessage("Số điện thoại không phù hợp");
      return;
    }

    if (!ValidateEmail(user.email)) {
      setMessage("Email không đúng định dạng");
      return;
    }

    if (user.password.length < 8 || user.cPassword.length < 8) {
      setMessage("Mật khẩu ít nhất 8 ký tự");
      return;
    }

    if (!ComparePassword(user.password, user.cPassword)) {
      setMessage("Mật khẩu xác nhận không trùng khớp");
      return;
    }

    if (!ValidatePassword(user.password, user.cPassword)) {
      setMessage("Mật khẩu bao gồm ký tự in hoa và ký tự thường");
      return;
    }

    Register(user)
      .then(() => {
        notification['success']({
          message: 'Thông báo',
          description:
            'Đăng kỳ tài khoản thành công',
        });
        history.push("/login");
      })
      .catch(e => {
        console.log(e);
        notification['warning']({
          message: 'Thông báo',
          description:
            'Email đã được đăng ký',
        });
        setMessage("Đăng kí thất bại");
      })
  }

  return (
    <>
      <Header />
      <Layout>
        <Form className="register__form"
          name="basic" labelCol={{ span: 8, }}
          wrapperCol={{ span: 16, }}
          initialValues={{ remember: true, }}
        >
          {
            FormDataRegister.map(item => {
              return (
                <Form.Item key={item.id} className="register__form__item"
                  label={item.label} name={item.name}
                  rules={[
                    {
                      required: true,
                      message: item.message,
                    },
                  ]}
                >
                  {
                    (item.name === "password" || item.name === "cPassword") ? (
                      <Input.Password onChange={(e) => handleInputText(e, item.name)} />
                    ) : (
                      <Input onChange={(e) => handleInputText(e, item.name)} />
                    )
                  }
                </Form.Item>
              )
            })
          }
          <Form.Item wrapperCol={{ offset: 8, span: 16, }} className="register__form__button">
            <p className="error__status">{message}</p>
            <Button type="primary" htmlType="submit" onClick={handleClickSignUp}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Layout>

    </>
  )
}

export default RegisterPage
