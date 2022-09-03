import { useState, useEffect } from 'react';
import Header from "components/Header";
import Feed from "./Cart.Form";
import Empty from "./ Cart.Empty";
import Spinner from 'components/Spinner';
import { GetListCarts } from 'services/Setting.Service';
import CartDocument from 'interfaces/Cart.Interface';

const CartPage = () => {
  const [cart, setCart] = useState<CartDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    GetListCarts()
      .then(res => {
        setCart(res.data.result);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }, []);

  return (
    <>
      <Header />
      {
        loading ? (
          <Spinner />
        ) : (
          <>
            {
              cart && cart.length > 0 ? (
                <Feed data={cart} />
              ) : (
                <Empty/>
              )
            }
          </>
        )
      }
    </>
  )
}

export default CartPage
