import { Select } from "antd";
import CategoryDocument from 'interfaces/Category.Interface';

interface ProductHeaderDocument {
  categories: CategoryDocument[] | undefined;
  typeSelected: string;
  handleSelectCategory(value: string): void;
}

const { Option } = Select;

const ProductHeader = ({ categories, typeSelected, handleSelectCategory }: ProductHeaderDocument) => {

  const handleSelect = (value: string) => {
    handleSelectCategory(value);
  }

  return (
    <div className="product__header">
      <h3 className="product__header__title">Danh mục sản phẩm</h3>
      <Select defaultValue={typeSelected} style={{ width: 150 }} onChange={handleSelect}>
        <Option value="all">Tất cả</Option>
        {
          categories && categories.map(category => {
            return (
              <Option key={category._id} value={category._id}>{category.name}</Option>
            )
          })
        }
      </Select>
    </div>
  )
}

export default ProductHeader;
