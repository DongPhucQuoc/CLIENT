import { useState, useEffect } from 'react'
import { Modal } from "antd";
import CardCart from 'components/card/CardCart';
import Layout from "components/Layout";
import CartDocument from 'interfaces/Cart.Interface';
import { DeleteCartByID, GetCartPriceSelected, UpdateCartByID } from "services/Setting.Service";
import { AnimationModal, getQuantityCartItems, getTokenLocal, setQuantityCartItems } from "utils/Common";
import { useHistory } from "react-router-dom";
import CheckboxAll from "./Cart.Header";
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { PaypalDocument } from 'interfaces/Paypal.Interface';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Spin, } from "antd";
import { formatMoney } from "utils/Common";

interface CartFormDocument {
  data: CartDocument[];
}

const CartForm = ({ data }: CartFormDocument) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [idDelete, setIDDelete] = useState<string>();
  const [carts, setCarts] = useState<PaypalDocument[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    if (updated) {
      const listID = GetListIDCart();
      if (listID) {
        GetCartPriceSelected(listID)
          .then(res => {
            setLoading(false);
            setTotal(res.data.result);
          })
          .catch(e => {
            setLoading(false);
            console.log(e);
          })
      }
    }
  }, [carts, updated]);

  const isSelected = (cart: PaypalDocument, type: boolean) => {
    setLoading(true);
    setUpdated(false);
    if (!type) {
      setCarts(prev => prev.filter(item => {
        return item.product !== cart.product;
      }));
      setUpdated(true);
    }
    else {
      setCarts(prev => [...prev, cart]);
      UpdateCartByID(cart.product, cart.quantity, cart.size)
        .then(() => setUpdated(true))
        .catch(e => {
          console.log(e);
        });
    }
  }

  const handleDelte = (id: string) => {
    const array = JSON.parse(getQuantityCartItems());
    setQuantityCartItems(
      array.filter((item: string) => {
        return item !== id;
      })
    );
    setIDDelete(id);
    setShowModal(true);
  }

  const handleOk = () => {
    setConfirmLoading(true);
    DeleteCartByID(idDelete)
      .then(() => {
        history.push("/");
        history.push("/cart");
      })
      .catch(e => {
        console.log(e);
      });
    AnimationModal(setShowModal, setConfirmLoading);
  }

  const handleCancel = () => {
    setShowModal(false);
  }

  const handleClickOrder = () => {
    if (!getTokenLocal()) {
      history.push("/login");
      return;
    }

    if (carts.length === 0) {
      Modal.error({
        title: 'Thông báo đặt hàng',
        content: 'Hãy chọn ít nhất 1 sản phẩm',
      });
      return;
    }

    history.push("/order", { cart: carts, from: "cart" });
  }

  const GetListIDCart = () => {
    const arr: string[] = [];
    carts.forEach(item => {
      arr.push(item.product);
    })
    return arr;
  }

  const handleCheckbox = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    if (!checked) {
      setCarts([]);
      return;
    }
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <Layout className="cart">
      <div className="cart__feed">
        <CheckboxAll handleCheckbox={handleCheckbox} />
        {
          data && data.map(item => {
            return (
              <CardCart key={item.product._id}
                product={item.product}
                quantity={item.quantity}
                size={item.size}
                selectedAll={selectAll}
                isSelected={isSelected}
                handleDelete={handleDelte}
              />
            )
          })
        }
      </div>
      <div className="cart__total">
        <span className="cart__total__text">
          Thành tiền: {
            loading ? <Spin indicator={antIcon} /> : (formatMoney(total))
          }
        </span>
        <Button onClick={handleClickOrder}>Mua hàng</Button>
      </div>
      <Modal
        title="Thông báo"
        visible={showModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xóa ?</p>
      </Modal>
    </Layout>
  )
}

export default CartForm
