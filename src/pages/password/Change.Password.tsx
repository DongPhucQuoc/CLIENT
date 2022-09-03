import { useState } from 'react'
import Header from "components/Header";
import Layout from "components/Layout";
import { Form, Input, Button, Modal, notification } from "antd";
import { ChangePassword } from 'services/Setting.Service';
import { useHistory } from "react-router-dom";
import { removeUserSession, AnimationModal } from 'utils/Common';

const ChangePasswordPage = () => {
  const [password, setPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [cNewPassword, setCNewPassword] = useState<string>();
  const [message, setMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const history = useHistory();

  const handleClickChangePassword = () => {
    if (!password || !newPassword || !cNewPassword) {
      return;
    }
    setMessage("");
    setShowModal(true);
  }

  const handleOk = () => {
    setConfirmLoading(true);
    ChangePassword(password, newPassword, cNewPassword)
      .then(() => {
        notification['success']({
          message: 'Thông báo',
          description:
            'Thay đổi mật khẩu thành công',
        });
        removeUserSession();
        history.push("/login");
      })
      .catch(e => {
        console.log(e);
        setMessage("Thay đổi mật khẩu thất bại. Hãy thử lại")
      });
    AnimationModal(setShowModal, setConfirmLoading);
  }

  const handleCancel = () => {
    setShowModal(false);
  }

  return (
    <>
      <Header />
      <Layout>
        <Form
          className="change-password__form"
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
            label="Mật khẩu cũ"
            name="password"
            rules={[
              {
                required: true,
                message: 'Mật khẩu cũ không được trống!',
              },
            ]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Mật khẩu mới không được trống!',
              },
            ]}
          >
            <Input.Password onChange={(e) => setNewPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="cNewPassword"
            rules={[
              {
                required: true,
                message: 'Mật khẩu xác nhận không được trống!',
              },
            ]}
          >
            <Input.Password onChange={(e) => setCNewPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handleClickChangePassword}>
              Thay đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Layout>
      <Modal
        title="Thông báo"
        visible={showModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {
          message ? (
            <p className="release-status">{message}</p>
          ) : (
            <p>Bạn có chắc chắn muốn thay đổi?</p>
          )
        }
      </Modal>
    </>
  )
}

export default ChangePasswordPage
