import { useState } from 'react';
import { Card, Button, Modal, Select, notification } from 'antd';
import { formatMoney, getPriceBySize, getTokenLocal, ProductSize } from 'utils/Common';
import { useHistory, Link } from "react-router-dom";
import ProductDocument from 'interfaces/Product.Interface';
import { EnumURL, AnimationModal } from "utils/Common";

interface CardBasicDocument {
  product: ProductDocument;
  handleAddToCart(idProduct: string, quantity: number, size: string): void;
}

const { Meta } = Card;
const { Option } = Select;

const CardBasic = ({ product, handleAddToCart }: CardBasicDocument) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);
  const [size, setSize] = useState<string>("S");
  const [priceSize, setPriceSize] = useState<any>(0);
  const url = window.location.pathname;
  const history = useHistory();

  const handleSelect = (value: string) => {
    setPriceSize(getPriceBySize(value));
    setSize(value);
  }

  const handleClickAddToCart = () => {
    handleAddToCart(product._id, count, size);
    notification['success']({
      message: 'Thông báo',
      description:
        'Sản phẩm đã được thêm vào giỏ',
    });
  }

  const handleOk = () => {
    setConfirmLoading(true);
    AnimationModal(setShowModal, setConfirmLoading);
    const carts = [{
      product: product._id,
      quantity: count,
      size: size
    }]
    handleAddToCart(product._id, count, size);
    history.push("/order", { cart: carts, from: "card" });
  }

  const handleCancel = () => {
    setShowModal(false);
  }

  const handleClickDecrement = () => {
    if (count <= 1) {
      return;
    }
    setCount(prev => prev - 1);
  }

  const handleClickIncrement = () => {
    setCount(prev => prev + 1);
  }

  const handleClickBuy = () => {
    if (!getTokenLocal()) {
      history.push("/login");
      return;
    }

    setShowModal(true);
  }

  return (
    <Card
      hoverable
      style={{ width: 270 }}
      cover={
        <Link to={`/detail/${product._id}`}>
          <img
            className="card-basic__img"
            alt="example"
            src={`${EnumURL.baseURL}${product?.images[0]?.name}`}
          />
        </Link>
      }
      actions={[
        <Button onClick={handleClickBuy}>Mua hàng</Button>,
        <Button onClick={handleClickAddToCart}>Thêm vào</Button>
      ]}
    >
      <Meta title={product.name} description={`Giá tiền: ${formatMoney(product.price)}`} />

      <Modal
        title="Xác nhận thông tin"
        visible={showModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="card-basic__modal">
          <div className="card-basic__modal__item">
            <span>{product.name}</span>
          </div>
          <div className="card-basic__modal__item">
            <span>Giá: {formatMoney(product.price + priceSize)}</span>
          </div>
          <div className="card-basic__modal__item">
            <Select defaultValue="S" style={{ width: 150 }} onChange={handleSelect}>
              {
                ProductSize.map(item => {
                  return (
                    <Option key={item.id} value={item.size}>{item.size}</Option>
                  )
                })
              }
            </Select>
          </div>
          <div className="card-basic__model__item">
            <Button onClick={handleClickDecrement}>-</Button>
            <span className="card-basic__modal__quantity">{count}</span>
            <Button onClick={handleClickIncrement}>+</Button>
          </div>
        </div>
      </Modal>
    </Card>
  )
}

export default CardBasic
