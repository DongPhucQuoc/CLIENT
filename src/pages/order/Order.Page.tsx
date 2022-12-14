import { useState, useEffect } from 'react';
import Header from "components/Header";
import Done from "./Order.Done";
import { Modal } from "antd";
import UserDocument from 'interfaces/User.Interface';
import { DeleteListCart } from 'services/Setting.Service';
import { CreateOrder } from 'services/Setting.Service';
import OrderDocument from 'interfaces/Order.Interface';
import { AnimationModal, getQuantityCartItems, setQuantityCartItems } from 'utils/Common';
import Payment from "./Order.Payment";
import GuestInformation from "./Order.Info";

const OrderPage = ({ location }: any) => {
  const [cart, setCart] = useState<any[]>([]);
  const [comment, setComment] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [from, setFrom] = useState<string>();
  const [buy, setBuy] = useState<boolean>(false);
  const [completeInfo, setCompleteInfo] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderDocument>({
    comment: "",
    infoGuest: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
    },
    orderDetails: cart,
  });
  const [user, setUser] = useState<UserDocument>({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    cPassword: "",
  });

  useEffect(() => {
    setCart(location.state.cart);
    setFrom(location.state.from);
  }, []);


  useEffect(() => {
    if (buy) {
      cleanCartAfterOrder();
    }
  }, [buy])

  const handleClickOrder = () => {
    setCompleteInfo(true);
  }

  const handleConfirmOrder = () => {
    setOrder({
      comment: comment,
      infoGuest: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
      },
      orderDetails: cart,
    });

    setShowModal(true);
  }

  const handleOk = () => {
    setConfirmLoading(true);
    CreateOrder(order)
      .then(() => {
        Modal.success({
          content: 'Xin c???m ??n qu?? kh??ch h??ng ???? tin t?????ng d???ch v??? ch??ng t??i!',
        });
        setBuy(true);
        AnimationModal(setShowModal, setConfirmLoading);
      })
      .catch(e => {
        console.log(e);
        AnimationModal(setShowModal, setConfirmLoading);
      });
  }

  const cleanCartAfterOrder = () => {
    if (from === "cart") {
      const list = GetListIDCarts();
      DeleteListCart(list)
        .catch(e => {
          console.log(e);
        });
    }
    const array = JSON.parse(getQuantityCartItems());
    for(let i = 0; i < cart.length; i++) {
      setQuantityCartItems(
        array.filter((item: string) => {
          return item !== cart[i].product;
        })
      );
    }
  }

  const GetListIDCarts = () => {
    let result: string[] = [];
    for (let i = 0; i < cart.length; i++) {
      result.push(cart[i].product);
    }

    return result;
  }

  const handleCancel = () => {
    setShowModal(false);
  }

  return (
    <>
      <Header />
      {
        buy ? (
          <Done />
        ) : (
          <>
            {
              completeInfo ? (
                <Payment
                  user={user}
                  carts={location.state.cart}
                  setBuy={setBuy}
                  handleConfirmOrder={handleConfirmOrder}
                />
              ) : (
                <GuestInformation
                  user={user}
                  setUser={setUser}
                  setComment={setComment}
                  handleOrder={handleClickOrder} />
              )
            }
          </>
        )
      }
      <Modal
        title="Ti???n h??nh ?????t h??ng"
        visible={showModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>X??c nh???n ti???n h??nh ?????t h??ng</p>
      </Modal>
    </>
  )
}

export default OrderPage
