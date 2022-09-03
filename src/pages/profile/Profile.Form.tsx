import { useState, useEffect } from 'react';
import Layout from "components/Layout";
import { Form, Input, Button, Modal, notification } from "antd";
import UserDocument from 'interfaces/User.Interface';
import { UpdateProfile } from 'services/Setting.Service';
import { useHistory } from "react-router-dom";
import { AnimationModal } from "utils/Common";

interface ProfileFormDocument {
  data: UserDocument;
}

const ProfileForm = ({ data }: ProfileFormDocument) => {
  const [message, setMessage] = useState<string>();
  const [user, setUser] = useState<UserDocument>(data);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    form.setFieldsValue({
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phone: user.phone,
      email: user.email
    })
  }, []);

  const handleClickChangeProfile = () => {
    if (!user.firstName || !user.lastName || !user.address) {
      return;
    }

    setShowModal(true);
  }

  const handleOk = () => {
    setConfirmLoading(true);
    UpdateProfile(user)
      .then(() => {
        notification['success']({
          message: 'Thông báo',
          description:
            'Thay đổi thông tin thành công',
        });
        history.push("/");
        history.push("/profile");
      })
      .catch((e) => {
        console.log(e);
        setMessage("Cập nhật thông tin thất bại");
      });
    AnimationModal(setShowModal, setConfirmLoading);
  }

  const handleCancel = () => {
    setShowModal(false);
  }

  return (
    <Layout>
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

        <Form.Item label="Số điện thoại" name="phone">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16, }} className="register__form__button">
          <Button type="primary" htmlType="submit" onClick={handleClickChangeProfile}>
            Thay đổi
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Thông báo"
        visible={showModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {
          message ? (
            <p>{message}</p>
          ) : (
            <p>Bạn có chắc chắn muốn thay đổi?</p>
          )
        }
      </Modal>
    </Layout>
  )
}

export default ProfileForm
