import React, { useState, useEffect } from 'react'
import Spinner from '../../components/Spinner';
import Header from "../../components/Header";
import FeedHeader from "./History.Header";
import Empty from "./History.Empty";
import Feed from "./History.Form";
import { GetOrderHistory, GetListOrder } from '../../services/Setting.Service';
import CartDocument from '../../interfaces/Cart.Interface';

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

const HistoryPage = () => {
  const [history, setHistory] = useState<CustomOrderDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("all");

  useEffect(() => {
    if (status === "all") {
      GetListOrder()
        .then(res => {
          setHistory(res.data.result);
          setLoading(false);
        })
        .catch(e => {
          console.log(e);
          setLoading(false);
        });
    }
    else {
      console.log(status);
      GetOrderHistory(status)
        .then(res => {
          setHistory(res.data.result);
          setLoading(false);
        })
        .catch(e => {
          console.log(e);
          setLoading(false);
        });
    }
  }, [status]);

  const handleSelect = (status: string) => {
    setLoading(true);
    setStatus(status);
  }

  return (
    <>
      <Header />
      {
        loading ? (
          <Spinner />
        ) : (
          <>
            <FeedHeader status={status} handleSelect={handleSelect} />
            {
              history && history.length > 0 ? (
                <Feed history={history} />
              ) : (
                <Empty />
              )
            }
          </>
        )
      }
    </>
  )
}

export default HistoryPage
