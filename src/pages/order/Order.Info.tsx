import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import Layout from "components/Layout";
import { Form, Input, Button } from "antd";
import UserDocument from 'interfaces/User.Interface';
import { GetProfile } from 'services/Setting.Service';
import Spinner from 'components/Spinner';

interface InfoGuestDocument {
  user: UserDocument
  setComment: Dispatch<SetStateAction<string>>;
  setUser: Dispatch<SetStateAction<UserDocument>>;
  handleOrder(): void;
}

const InfoGuest = ({ user, setUser, setComment, handleOrder }: InfoGuestDocument) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [form] = Form.useForm();

  useEffect(() => {
    GetProfile()
      .then(res => {
        setUser(res.data.result);
        setLoading(false);
        const user = res.data.result;
        form.setFieldsValue({
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          address: user.address,
        })
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }, []);

  const handleClickOrder = () => {
    if (!user.firstName || !user.lastName || !user.address || !user.phone) {
      return;
    }

    handleOrder();
  }

  return (
    <Layout>
      <div className="order__step">
        <span className="order__step__circle order__step__active">1</span>
        <span className="order__step__line"></span>
        <span className="order__step__circle">2</span>
      </div>
      {
        loading ? (
          <Spinner />
        ) : (
          <Form className="register__form"
            name="basic" labelCol={{ span: 8, }}
            wrapperCol={{ span: 16, }}
            initialValues={{ remember: true, }}
            form={form}
          >
            <Form.Item
              label="Họ" name="lastName"
              rules={[
                {
                  required: true,
                  message: 'Họ không được trống!',
                },
              ]}
            >
              <Input onChange={(e) => setUser(prev => ({ ...prev, lastName: e.target.value }))} />
            </Form.Item>

            <Form.Item
              label="Tên" name="firstName"
              rules={[
                {
                  required: true,
                  message: 'Tên không được trống!',
                },
              ]}
            >
              <Input onChange={(e) => setUser(prev => ({ ...prev, firstName: e.target.value }))} />
            </Form.Item>

            <Form.Item
              label="Địa chỉ" name="address"
              rules={[
                {
                  required: true,
                  message: 'Địa chỉ không được trống!',
                },
              ]}
            >
              <Input onChange={(e) => setUser(prev => ({ ...prev, address: e.target.value }))} />
            </Form.Item>

            <Form.Item
              label="Số điện thoại" name="phone"
              rules={[
                {
                  required: true,
                  message: 'Số điện thoại không được trống!',
                },
              ]}
            >
              <Input onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))} />
            </Form.Item>

            <Form.Item
              label="Ghi chú"
            >
              <Input onChange={(e) => setComment(e.target.value)} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16, }} className="register__form__button">
              <Button type="primary" htmlType="submit" onClick={handleClickOrder}>
                Đặt hàng
              </Button>
            </Form.Item>
          </Form>
        )
      }
    </Layout>
  )
}

export default InfoGuest
