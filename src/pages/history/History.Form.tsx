import React from 'react'
import CardHistory from '../../components/card/CardHistory';
import Layout from "../../components/Layout";
import CartDocument from '../../interfaces/Cart.Interface';
import OrderDocument from '../../interfaces/Order.Interface';

interface CustomOrderDocument {
  _id: string;
  status: string;
  comment: string;
  infoGuest: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
  };
  requiredDate: Date;
  orderDetails: CartDocument[];
}

interface HistoryFormDocument {
  history: CustomOrderDocument[];
}

const HistoryForm = ({ history }: HistoryFormDocument) => {
  return (
    <Layout>
      {
        history.map((item, index) => {
          return (
            <div key={index}>
              {
                item.orderDetails.map(detail => {
                  return (
                    <CardHistory key={detail.product._id}
                      id={item._id}
                      requiredDate={item.requiredDate}
                      image={detail.product.images[0].name}
                      name={detail.product.name}
                      price={detail.product.price}
                      size={detail.size}
                      quantity={detail.quantity}
                      status={item.status}
                    />
                  )
                })
              }
            </div>
          )
        })
      }
    </Layout>
  )
}

export default HistoryForm
