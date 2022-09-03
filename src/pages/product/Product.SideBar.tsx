import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FC } from 'react';

interface Props {
  nameSelected: {
    increment: boolean;
    decrement: boolean;
  },
  priceSelected: {
    increment: boolean;
    decrement: boolean;
  };
  handleGetProductWithCategory(checked: boolean, value: string): void;
  handleGetProductWithPrice(checked: boolean, value: string): void;
}

const ProductSideBar: FC<Props> = ({ nameSelected, priceSelected, handleGetProductWithCategory, handleGetProductWithPrice }) => {
  const handleCheckCategory = (e: CheckboxChangeEvent, type: string) => {
    const checked = e.target.checked;
    handleGetProductWithCategory(checked, type);
  }

  const handleCheckPrice = (e: CheckboxChangeEvent, type: string) => {
    const checked = e.target.checked;
    handleGetProductWithPrice(checked, type);
  }
  
  return (
    <div className="product__sidebar">
      <h3>BỘ LỌC TÌM KIẾM</h3>
      <p>Danh mục:</p>
      <div className="product__sidebar__box">
        <Checkbox checked={nameSelected.decrement} onChange={(e) => handleCheckCategory(e, "decrement")}>Từ A - Z</Checkbox>
        <Checkbox checked={nameSelected.increment} onChange={(e) => handleCheckCategory(e, "increment")}>Từ Z - A</Checkbox>
      </div>
      <p>Giá:</p>
      <div className="product__sidebar__box">
        <Checkbox checked={priceSelected.increment} onChange={(e) => handleCheckPrice(e, "increment")}>Giảm dần</Checkbox>
        <Checkbox checked={priceSelected.decrement} onChange={(e) => handleCheckPrice(e, "decrement")}>Tăng dần</Checkbox>
      </div>
    </div>
  )
}

export default ProductSideBar
