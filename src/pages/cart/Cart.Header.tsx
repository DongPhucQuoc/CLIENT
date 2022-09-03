import { Checkbox } from "antd";
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface CartHeaderDocument {
  handleCheckbox(e: CheckboxChangeEvent): void;
}

const CartHeader = ({ handleCheckbox }: CartHeaderDocument) => {
  return (
    <div className="cart__header">
      <Checkbox onChange={handleCheckbox}>Chọn tất cả</Checkbox>
    </div>
  )
}

export default CartHeader
