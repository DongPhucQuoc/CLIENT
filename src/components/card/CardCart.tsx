import React, { useState, useEffect } from 'react';
import { Select, Button, Checkbox } from "antd";
import { formatMoney, ProductSize, EnumURL, getPriceBySize } from '../../utils/Common';
import ProductDocument from '../../interfaces/Product.Interface';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface CardCartDocument {
  product: ProductDocument;
  quantity: number;
  size: string;
  selectedAll: boolean;
  isSelected(cart: any, type: boolean): void
  handleDelete(idProduct: string): void;
}

const { Option } = Select;

const CardCart = ({ product, quantity, size, selectedAll, isSelected, handleDelete }: CardCartDocument) => {
  const [count, setCount] = useState<number>(quantity);
  const [selected, setSelected] = useState<boolean>(false);
  const [sizeSelected, setSizeSelected] = useState<string>(size);
  const [priceSize, setPriceSize] = useState<any>(getPriceBySize(size));

  useEffect(() => {
    setSelected(selectedAll);
  }, [selectedAll]);

  useEffect(() => {
    if (selectedAll) {
      bodyHandleChecked(selectedAll);
    }
  }, [selectedAll]);

  const handleSelectSize = (value: string) => {
    setPriceSize(getPriceBySize(value));
    setSizeSelected(value);
  }

  const handleDecrement = () => {
    if (count <= 1) {
      return;
    }
    setCount(prev => prev - 1);
  }

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  }

  const handleClickSelect = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    bodyHandleChecked(checked);
  }

  const bodyHandleChecked = (checked: boolean) => {
    const cart = {
      product: product._id,
      quantity: count,
      size: sizeSelected
    }
    isSelected(cart, checked);
    setSelected(checked);
  }

  const handleClickDelete = () => {
    handleDelete(product._id);
  }

  return (
    <div className="card__cart">
      <Checkbox className="card__cart__checkbox" checked={selected}
        onChange={(e) => handleClickSelect(e)} defaultChecked={false}
      />
      <div className="card__cart__col">
        <img src={`${EnumURL.baseURL}${product.images[0].name}`} alt="cart" />
      </div>
      <div className="card__cart__col card__cart__name">
        <span>{product.name}</span>
      </div>
      <div className="card__cart__col">
        <span>{formatMoney(product.price + priceSize)}</span>
      </div>
      {
        selected ? (
          <>
            <div className="card__cart__col">
              <Select disabled defaultValue={size} style={{ width: 100 }} onChange={handleSelectSize}>
                {
                  ProductSize.map(item => {
                    return (
                      <Option key={item.id} value={item.size}>{item.size}</Option>
                    )
                  })
                }
              </Select>
            </div>
            <div className="card__cart__col card__cart__quantity">
              <Button disabled onClick={handleDecrement}>-</Button>
              <span>{count}</span>
              <Button disabled onClick={handleIncrement}>+</Button>
            </div>
            <div className="card__cart__col card__cart__icon"></div>
          </>
        ) : (
          <>
            <div className="card__cart__col">
              <Select defaultValue={size} style={{ width: 100 }} onChange={handleSelectSize}>
                {
                  ProductSize.map(item => {
                    return (
                      <Option key={item.id} value={item.size}>{item.size}</Option>
                    )
                  })
                }
              </Select>
            </div>
            <div className="card__cart__col card__cart__quantity">
              <Button onClick={handleDecrement}>-</Button>
              <span>{count}</span>
              <Button onClick={handleIncrement}>+</Button>
            </div>
            <div className="card__cart__col card__cart__icon">
              <span onClick={handleClickDelete}>🗑️</span>
            </div>
          </>
        )
      }
    </div>
  )
}

export default CardCart
