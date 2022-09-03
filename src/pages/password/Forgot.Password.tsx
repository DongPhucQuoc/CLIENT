import { useState } from 'react'
import Header from "components/Header";
import Layout from "components/Layout";
import { Form, Input, Button, Modal, notification } from "antd";
import { ForgotPassword } from "services/Setting.Service";
import { AnimationModal } from "utils/Common";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string>("");

    const handleClickForgotPassword = () => {
        if (!email) {
            return;
        }

        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            setErr("Email không đúng định dạng");
            return;
        }

        setShowModal(true);
        setConfirmLoading(true);
        ForgotPassword(email)
            .then(() => {
                setErr("");
                notification['success']({
                    message: 'Thông báo',
                    description:
                        'Yêu cầu cấp lại mật khẩu thành công',
                });
                AnimationModal(setShowModal, setConfirmLoading);
            })
            .catch(e => {
                console.log(e);
                notification['warning']({
                    message: 'Thông báo',
                    description:
                        'Email không đúng',
                });
                setErr("Xin hãy kiểm tra lại email!");
                AnimationModal(setShowModal, setConfirmLoading);
            });
    }

    const handleOk = () => {
        setShowModal(false);
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
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Email không được trống!',
                            },
                        ]}
                    >
                        <Input onChange={(e) => { setEmail(e.target.value); setErr(""); }} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" onClick={handleClickForgotPassword}>
                            Cấp lại mật khẩu
                        </Button>
                    </Form.Item>
                    {err && <p className="release-status">{err}</p>}
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
                    err ? (
                        <p className="release-status">{err}</p>
                    ) : (
                        <p>Mật khẩu mới đã được gửi về Email đăng ký</p>
                    )
                }
            </Modal>
        </>
    )
}

export default ForgotPasswordPage
