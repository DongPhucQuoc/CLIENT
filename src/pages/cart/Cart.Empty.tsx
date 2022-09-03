import Layout from "components/Layout";
import { Button } from "antd";
import { Link } from "react-router-dom";

const  CartEmpty = () => {
  return (
    <Layout>
      <div className="cart__empty">
        <h2>Giỏ hàng đang trống hãy đi mua sắm ngay</h2>
        <Button><Link to="/product">Đi mua sắm ngay 🥳</Link></Button>
      </div>
    </Layout>
  )
}

export default  CartEmpty
