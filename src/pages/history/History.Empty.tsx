import React from 'react';
import Layout from "../../components/Layout";
import { Button } from "antd";
import { Link } from "react-router-dom";

const HistoryEmpty = () => {
  return (
    <Layout>
      <div className="history__empty">
        <h2>Bạn chưa từng mua hàng!! Hãy đi mua sắm ngay</h2>
        <Button><Link to="/product">Đi mua sắm ngay 🥳</Link></Button>
      </div>
    </Layout>
  )
}

export default HistoryEmpty
