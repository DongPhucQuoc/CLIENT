import { useState, useEffect } from 'react';
import CardBasic from 'components/card/CardBasic';
import Header from "components/Header";
import HomeBanner from './Home.Banner';
import Layout from "components/Layout";
import { Button } from "antd";
import HomeBottom from './Home.Bottom';
import ProductDocument from 'interfaces/Product.Interface';
import { GetListProducts, AddToCart } from 'services/Setting.Service';
import Spinner from 'components/Spinner';
import { Link } from "react-router-dom";
import { AppProvider } from 'context/Context';
import { getQuantityCartItems, setQuantityCartItems } from 'utils/Common';

const HomePage = () => {
  const [products, setProducts] = useState<ProductDocument[]>();
  const [loading, setLoading] = useState<Boolean>(true);
  const [dataHomeBottom, setDataHomeBottom] = useState<[ProductDocument[]]>();
  const [items, setItems] = useState<number>(0);

  useEffect(() => {
    GetListProducts()
      .then(res => {
        setProducts(res.data.result);
        handleDataHomeBottom(res.data.result);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      })
  }, []);

  useEffect(() => {
    const array = JSON.parse(getQuantityCartItems());
    setItems(array.length);
  }, [])

  const handleDataHomeBottom = (products: ProductDocument[]) => {
    const result = handleData(products);
    setDataHomeBottom(result);
  }

  const handleAddToCart = (idProduct: string, quantity: number, size: string) => {
    const array = JSON.parse(getQuantityCartItems());
    if (array.length === 0) {
      array.push(idProduct);
    }
    else {
      let flag = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i] === idProduct) {
          flag = 1;
          break;
        }
      }
      if (!flag) { array.push(idProduct); }
    }
    setQuantityCartItems(array);
    setItems(array.length);
    AddToCart(idProduct, quantity, size)
      .catch(e => {
        console.log(e);
      })
  }

  const handleData = (products: ProductDocument[]) => {
    const result: any = [];
    let data: any = null;
    const lengthPro = products.length;
    const lengthArr = lengthPro % 8;

    if (products.length / 8 < 0) {
      data = products.slice(0, products.length);
      result.push(data);
    }
    else {
      let lengthExist = lengthPro;
      for (let i = 0; i < lengthArr; i++) {
        lengthExist = lengthPro - i * 8;
        if (lengthExist > 8) {
          data = products.slice(i * 8, (i + 1) * 8);
        }
        else {
          data = products.slice(i * 8, lengthExist);
        }
        result.push(data);
      }
    }
    return result;
  }

  return (
    <AppProvider value={items}>
      <Header />
      <HomeBanner />
      {
        loading ? (
          <Spinner />
        ) : (
          <>
            <Layout>
              <div className="home__see-more">
                <Button><Link to="/product">Xem thêm sản phẩm</Link></Button>
              </div>
              <div className="home__feed">
                {
                  products && products.slice(0, 8).map(product => {
                    return (
                      <CardBasic
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                      />
                    )
                  })
                }
              </div>
            </Layout>
            {
              dataHomeBottom && (
                <HomeBottom data={dataHomeBottom} handleAddToCart={handleAddToCart} />
              )
            }
          </>
        )
      }
    </AppProvider>
  )
}

export default HomePage
