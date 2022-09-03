import Layout from "components/Layout";
import CardBasic from 'components/card/CardBasic';
import ProductDocument from 'interfaces/Product.Interface';
import SideBar from "./Product.SideBar";
import { Spin } from "antd";

interface ProductFormDocument {
  loading: boolean;
  products: ProductDocument[] | undefined;
  nameSelected: {
    increment: boolean;
    decrement: boolean;
  },
  priceSelected: {
    increment: boolean;
    decrement: boolean;
  };
  handleGetProductWithCategory(checked: boolean, type: string): void;
  handleGetProductWithPrice(checked: boolean, type: string): void;
  handleAddToCart(idProduct: string, quantity: number, size: string): void;
}

const ProductForm = ({
  loading,
  products,
  nameSelected,
  priceSelected,
  handleGetProductWithCategory,
  handleGetProductWithPrice,
  handleAddToCart
}: ProductFormDocument) => {

  return (
    <Layout>
      <div className="product">
        <SideBar
          nameSelected={nameSelected}
          priceSelected={priceSelected}
          handleGetProductWithCategory={handleGetProductWithCategory}
          handleGetProductWithPrice={handleGetProductWithPrice}
        />
        {
          loading ? (
            <div className="product__spinner">
              <Spin />
            </div>
          ) : (
            <div className="product__feed">
              {
                products && products.map(product => {
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
          )
        }
      </div>
    </Layout>
  )
}

export default ProductForm
