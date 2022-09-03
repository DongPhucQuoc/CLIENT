import { EnumURL, getTokenLocal } from "../utils/Common";
import HttpService from "./getWays/Setting.GetWay";
import UserDocument from "../interfaces/User.Interface";
import OrderDocument from "../interfaces/Order.Interface";
import {
  PaypalDocument,
  PaypalGuestInfo,
} from "../interfaces/Paypal.Interface";

const headers = {
  headers: {
    Authorization: "Bearer " + getTokenLocal(),
  },
}

//---User
export const Register = async (user: UserDocument) => {
  return await HttpService.post(EnumURL.user, {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    phone: user.phone,
    email: user.email,
    password: user.password,
    cPassword: user.cPassword,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const Login = async (email: string, password: string) => {
  return await HttpService.post(EnumURL.login, {
    email: email,
    password: password,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetProfile = async () => {
  return await HttpService.get(EnumURL.profile, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const UpdateProfile = async (user: UserDocument) => {
  return await HttpService.put(EnumURL.profile, {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const ChangePassword = async (
  password: string | undefined,
  newPassword: string | undefined,
  cNewPassword: string | undefined
) => {
  return await HttpService.put(EnumURL.changePassword, {
    password: password,
    newPassword: newPassword,
    cNewPassword: cNewPassword,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const ForgotPassword = async (email: string) => {
  return await HttpService.post(EnumURL.forgot, {
    email: email,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

//---Product
export const GetProductByID = async (id: any) => {
  return await HttpService.get(`${EnumURL.product}/${id}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListProducts = async () => {
  return await HttpService.get(EnumURL.products, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListProductsByCategory = async (type: string | undefined) => {
  return await HttpService.get(`${EnumURL.products}/${type}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListProductByCategoryAndSortedByName = async (
  categoryID: string,
  type: string
) => {
  return await HttpService.post(
    `${EnumURL.sort.product.base}/name/category/${categoryID}`,
    {
      type: type,
    }
  , {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListProductByCategoryAndSortedByPrice = async (
  categoryID: string,
  type: string
) => {
  return await HttpService.post(
    `${EnumURL.sort.product.base}/price/category/${categoryID}`,
    {
      type: type,
    }, {
      headers: {
        Authorization: "Bearer " + getTokenLocal(),
      },
    }
  );
};

export const GetListProductSortedByNameAndPrice = async (
  typeName: string,
  typePrice: string
) => {
  return await HttpService.post(EnumURL.sort.product.base, {
    typeName: typeName,
    typePrice: typePrice,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListProductByCategorySortedByNameAndPrice = async (
  categoryID: string,
  typeName: string,
  typePrice: string
) => {
  return await HttpService.post(`${EnumURL.sort.product.base}/${categoryID}`, {
    typeName: typeName,
    typePrice: typePrice,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListProductSortedByName = async (type: string) => {
  return await HttpService.post(EnumURL.sort.product.name, {
    type: type,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListProductSortedByPrice = async (type: string) => {
  return await HttpService.post(EnumURL.sort.product.price, {
    type: type,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

//---Category
export const GetListCategories = async () => {
  return await HttpService.get(EnumURL.categories, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const DeleteProduct = async (id: string | undefined) => {
  return await HttpService.delete(`${EnumURL.product}/${id}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

//---Cart
export const AddToCart = async (
  idProduct: string,
  quantity: number,
  size: string
) => {
  return await HttpService.post(EnumURL.cart, {
    product: idProduct,
    quantity: quantity,
    size: size,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListCarts = async () => {
  return await HttpService.get(EnumURL.carts, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetCartPriceSelected = async (list: string[] | undefined) => {
  return await HttpService.post(`${EnumURL.cart}/price`, {
    carts: list,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetCartQuantity = async () => {
  return await HttpService.get(`${EnumURL.carts}/quantity`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const UpdateCartByID = async (
  id: string,
  quantity: number,
  size: string
) => {
  return await HttpService.put(EnumURL.cart, {
    product: id,
    quantity: quantity,
    size: size,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const DeleteCartByID = async (id: string | undefined) => {
  return await HttpService.delete(`${EnumURL.cart}/${id}`, headers);
};

export const DeleteListCart = async (list: string[] | undefined) => {
  return await HttpService.post(EnumURL.deleteListCarts, {
    carts: list,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const DeleteAllCart = async () => {
  return await HttpService.delete(`${EnumURL.cart}/all`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

//Order
export const CreateOrder = async (order: OrderDocument) => {
  return await HttpService.post(EnumURL.order, {
    comment: order.comment,
    infoGuest: order.infoGuest,
    orderDetails: order.orderDetails,
  },
  {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListOrder = async () => {
  return await HttpService.get(EnumURL.order, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetOrderHistory = async (status: string) => {
  return await HttpService.get(`${EnumURL.ordersTracking}/${status}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetProductsForOrder = async (list: any[]) => {
  return await HttpService.post(`${EnumURL.products}/${EnumURL.order}`, {
    list: list,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const CancelOrder = async (id: string) => {
  return await HttpService.post(`${EnumURL.order}/cancel/${id}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
}

//Statistic
export const StatisticOrdered = async () => {
  return await HttpService.get(EnumURL.statistic, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

//Paypal
export const GetPricePaypalToCreate = async (items: PaypalDocument[]) => {
  return await HttpService.post(`${EnumURL.paypal}/price`, {
    list: items,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const SavePaypal = async (
  orderID: string,
  carts: PaypalDocument[],
  infoGuest: PaypalGuestInfo
) => {
  return await HttpService.post(EnumURL.paypal, {
    orderID: orderID,
    orderDetails: carts,
    infoGuest: infoGuest,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};
