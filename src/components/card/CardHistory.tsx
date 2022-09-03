import { ConvertStatus, EnumURL, FormatDate, formatMoney } from 'utils/Common';
import { Button, Modal, notification } from "antd";
import { CancelOrder } from "services/Setting.Service";
import { useState } from "react";
import { useHistory } from "react-router-dom";

interface CardHistoryDocument {
  id: string;
  requiredDate: Date;
  image: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  status: string;
}

const CardHistory = ({ id, requiredDate, image, name, price, size, quantity, status }: CardHistoryDocument) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const link = useHistory();

  const handleCancelOrder = () => {
    setShowModal(true);
  }

  const handleOk = () => {
    setConfirmLoading(true);
    CancelOrder(id)
      .then(() => {
        setShowModal(false);
        setConfirmLoading(false);
        notification['success']({
          message: 'Thông báo',
          description:
            'Đơn hàng đã được hủy thành công',
        });
        link.push("/");
        link.push("/history");
      })
      .catch(e => {
        console.log(e);
        setShowModal(true);
      });
  }

  return (
    <>
      <div className="card-history">
        <div className="card-history__field">
          <span>{FormatDate(requiredDate)}</span>
        </div>
        <div className="card-history__field">
          <img className="card-history__field__image" src={`${EnumURL.baseURL}${image}`} alt="img" />
        </div>
        <div className="card-history__field">
          <span>{name}</span>
        </div>
        <div className="card-history__field">
          <span>{formatMoney(price)}</span>
        </div>
        <div className="card-history__field">
          <span>{size}</span>
        </div>
        <div className="card-history__field">
          <span>{quantity}</span>
        </div>
        <div className="card-history__field">
          <span>{ConvertStatus(status)}</span>
        </div>
        {
          (status === 'waiting' || status === 'shipping') && <div className="card-history__field"><Button onClick={handleCancelOrder}>Hủy</Button></div>
        }
      </div>
      <Modal
        title="Tiến hành đặt hàng"
        visible={showModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setShowModal(false)}
      >
        <p>Xác nhận tiến hành đặt hàng</p>
      </Modal>
    </>
  )
}

export default CardHistory
