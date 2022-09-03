import { useEffect } from "react";
import Layout from "components/Layout";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { notification } from "antd";

const OrderDone = () => {
  useEffect(() => {
    notification['success']({
      message: 'Đã đặt hàng thành công',
      description:
        'Cảm ơn quý khách đã sử dụng dịch vụ! <3',
    });
  }, []);

  return (
    <Layout>
      <div className="order__done">
        <p>Cảm ơn quý khách đã tin tưởng dịch vụ chúng tôi! 🤩😍😘🥰</p>
        <Button><Link to="/product">Tiếp tục mua sắm nào 🥳</Link></Button>
      </div>
    </Layout>
  )
}

export default OrderDone
