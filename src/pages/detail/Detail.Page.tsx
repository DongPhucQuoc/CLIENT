import { useState, useEffect } from 'react';
import Header from "components/Header";
import Feed from "./Detail.Form";
import ProductDocument from 'interfaces/Product.Interface';
import Spinner from 'components/Spinner';
import { GetProductByID } from 'services/Setting.Service';
import { useParams } from 'react-router-dom';
import { getQuantityCartItems, setQuantityCartItems } from 'utils/Common';
import { AddToCart } from "services/Setting.Service";
import { notification } from "antd";
import { AppProvider } from 'context/Context';

const DetailPage = () => {
  const { id }: any = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string>("S");
  const [items, setItems] = useState<number>(0);
  const [product, setProduct] = useState<ProductDocument>({
    _id: "",
    name: "",
    price: 0,
    description: "",
    images: [{
      _id: "",
      name: ""
    }],
    category: ""
  });

  useEffect(() => {
    GetProductByID(id)
      .then(res => {
        setProduct(res.data.result);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }, []);

  const handleClickAddToCart = () => {
    const array = JSON.parse(getQuantityCartItems());
    if (array.length === 0) {
      array.push(id);
    }
    else {
      let flag = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i] === id) {
          flag = 1;
          break;
        }
      }
      if (!flag) { array.push(id); }
    }
    setQuantityCartItems(array);
    setItems(array.length);
    AddToCart(id, quantity, size);
    notification['success']({
      message: 'Thông báo',
      description:
        'Sản phẩm đã được thêm vào giỏ',
    });
  }

  return (
    <AppProvider value={items}>
      <Header />
      {
        loading ? (
          <Spinner />
        ) : (
          <Feed 
            data={product} 
            quantity={quantity}
            setQuantity={setQuantity}
            size={size}
            setSize={setSize}
            handleAddToCart={handleClickAddToCart}
          />
        )
      }
    </AppProvider>
  )
}

export default DetailPage
