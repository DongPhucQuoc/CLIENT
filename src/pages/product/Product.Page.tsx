import { useState, useEffect } from 'react';
import Header from "components/Header";
import Feed from "./Product.Form";
import CategoryDocument from 'interfaces/Category.Interface';
import ProductDocument from 'interfaces/Product.Interface';
import ProductHeader from './Product.Header';
import {
  GetListCategories,
  GetListProducts,
  AddToCart,
  GetListProductsByCategory
} from 'services/Setting.Service';
import {
  GetListProductSortedByName,
  GetListProductSortedByPrice,
  GetListProductSortedByNameAndPrice,
  GetListProductByCategoryAndSortedByName,
  GetListProductByCategoryAndSortedByPrice,
  GetListProductByCategorySortedByNameAndPrice,
} from "services/Setting.Service";
import { getQuantityCartItems, setQuantityCartItems } from 'utils/Common';
import { AppProvider } from 'context/Context';

const ProductPage = () => {
  const [products, setProducts] = useState<ProductDocument[]>();
  const [items, setItems] = useState<number>(0);
  const [categories, setCategories] = useState<CategoryDocument[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [typeSelected, setTypeSelected] = useState<string>("all");
  const [nameSelected, setNameSelected] = useState({
    increment: false,
    decrement: false,
  });
  const [priceSelected, setPriceSelected] = useState({
    increment: false,
    decrement: false,
  });

  useEffect(() => {
    if (typeSelected === "all") {
      GetAllProducts();
      return;
    }

    GetProductsWithType();
  }, [typeSelected]);

  useEffect(() => {
    GetListCategories()
      .then(res => {
        setCategories(res.data.result);
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  useEffect(() => {
    if (typeSelected === "all") {
      setLoading(true);
      if (nameSelected.increment) {
        GetListProductSortedByName("increment")
          .then(res => {
            setProducts(res.data.result);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }
      if (nameSelected.decrement) {
        GetListProductSortedByName("decrement")
          .then(res => {
            setProducts(res.data.result);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }
      if (priceSelected.increment) {
        GetListProductSortedByPrice("increment")
          .then(res => {
            setProducts(res.data.result);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }
      if (priceSelected.decrement) {
        GetListProductSortedByPrice("decrement")
          .then(res => {
            setProducts(res.data.result);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }
      if (nameSelected.increment && priceSelected.increment) {
        GetListProductSortedByNameAndPrice("increment", "decrement")
          .then(res => {
            setProducts(res.data.result);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }
      if (nameSelected.increment && priceSelected.decrement) {
        GetListProductSortedByNameAndPrice("decrement", "increment")
          .then(res => {
            setProducts(res.data.result);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }
      if (!nameSelected.increment && !nameSelected.decrement && !priceSelected.decrement && !priceSelected.increment) {
        GetAllProducts();
      }
    }
    else {
      setLoading(true);
      if (nameSelected.increment) {
        GetListProductByCategoryAndSortedByName(typeSelected, "increment")
          .then(res => {
            setProducts(res.data.result);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }
      if (nameSelected.decrement) {
        GetListProductByCategoryAndSortedByName(typeSelected, "decrement")
          .then(res => {
            setProducts(res.data.result);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }
      if (priceSelected.increment) {
        GetListProductByCategoryAndSortedByPrice(typeSelected, "increment")
          .then(res => {
            setProducts(res.data.result);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }
      if (priceSelected.decrement) {
        GetListProductByCategoryAndSortedByPrice(typeSelected, "decrement")
          .then(res => {
            setProducts(res.data.result);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }
      if (nameSelected.increment && priceSelected.increment) {
        GetListProductByCategorySortedByNameAndPrice(typeSelected, "increment", "decrement")
          .then(res => {
            setProducts(res.data.result);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }
      if (nameSelected.increment && priceSelected.decrement) {
        GetListProductByCategorySortedByNameAndPrice(typeSelected, "decrement", "increment")
          .then(res => {
            setProducts(res.data.result);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }
      if (!nameSelected.increment && !nameSelected.decrement && !priceSelected.decrement && !priceSelected.increment) {
        GetProductsWithType();
      }
    }
  }, [nameSelected, priceSelected]);

  const GetAllProducts = () => {
    setLoading(true);
    GetListProducts()
      .then(res => {
        setProducts(res.data.result);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }

  const GetProductsWithType = () => {
    setLoading(true);
    GetListProductsByCategory(typeSelected)
      .then(res => {
        setLoading(false);
        setProducts(res.data.result);
      })
      .then(e => {
        setLoading(false);
        console.log(e);
      });
  }

  const handleSelectCategory = (value: string) => {
    setTypeSelected(value);
    setNameSelected({ increment: false, decrement: false });
    setPriceSelected({ increment: false, decrement: false });
  };

  const handleAddToCart = (idProduct: string, quantity: number, size: string) => {
    const array = JSON.parse(getQuantityCartItems());
    if (array.length === 0) {
      array.push(idProduct);
    }
    else {
      let flag = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i] === idProduct) {
          flag = 1;
          break;
        }
      }
      if (!flag) { array.push(idProduct); }
    }
    setQuantityCartItems(array);
    setItems(array.length);
    AddToCart(idProduct, quantity, size);
  }


  const handleGetProductWithCategory = (checked: boolean, type: string) => {
    if (!checked) {
      setNameSelected(prev => ({ ...prev, increment: false, decrement: false }));
      return;
    }

    if (type === "increment") {
      setNameSelected(prev => ({ ...prev, increment: true, decrement: false }));
    }
    else {
      setNameSelected(prev => ({ ...prev, increment: false, decrement: true }));
    }
  }

  const handleGetProductWithPrice = (checked: boolean, type: string) => {
    if (!checked) {
      setPriceSelected(prev => ({ ...prev, increment: false, decrement: false }));
      return;
    }

    if (type === "increment") {
      setPriceSelected(prev => ({ ...prev, increment: true, decrement: false }));
    }
    else {
      setPriceSelected(prev => ({ ...prev, increment: false, decrement: true }));
    }
  }

  return (
    <AppProvider value={items}>
      <Header />
      <ProductHeader
        categories={categories}
        typeSelected={typeSelected}
        handleSelectCategory={handleSelectCategory}
      />
      <Feed
        loading={loading}
        products={products}
        nameSelected={nameSelected}
        priceSelected={priceSelected}
        handleGetProductWithCategory={handleGetProductWithCategory}
        handleGetProductWithPrice={handleGetProductWithPrice}
        handleAddToCart={handleAddToCart}
      />
    </AppProvider>
  )
}

export default ProductPage
