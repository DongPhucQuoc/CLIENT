export const setTokenLocal = (token: string) => {
  sessionStorage.setItem("token", token);
};

export const getTokenLocal = () => {
  return sessionStorage.getItem("token") || null;
};

export const removeUserSession = () => {
  sessionStorage.removeItem("token");
};

export const setQuantityCartItems = (carts: any) => {
  sessionStorage.setItem("carts", JSON.stringify(carts));
}

export const getQuantityCartItems = () => {
  return sessionStorage.getItem("carts") || "[]";
}

export const formatMoney = (money: number) => {
  return (money?.toString()?.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") || 0) + " đồng";
};

export const getPriceBySize = (size: string) => {
  if (size === "S") {
    return 0;
  }
  if (size === "M") {
    return 5000;
  }
  if (size === "L") {
    return 10000;
  }
}

export const ProductSize = [
  { id: 0, size: "S" },
  { id: 1, size: "M" },
  { id: 2, size: "L" },
];

export const EnumHistory = [
  { id: 0, status: "unconfirmed" },
  { id: 1, status: "waiting" },
  { id: 2, status: "shipping" },
  { id: 3, status: "shipped" },
  { id: 4, status: "canceled" },
]

export const ConvertDate = (date: Date) => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const FormatDate = (timestamp: any) => {
  const x = new Date(timestamp);
  const hh = x.getHours();
  const min = x.getMinutes();
  const dd = x.getDate();
  const mm = x.getMonth() + 1;
  const yy = x.getFullYear();
  return hh + "h:" + min + "p " + dd + "/" + mm + "/" + yy;
};

export const EnumURL = {
  baseURL: "http://127.0.0.1:2000",
  user: "user",
  login: "/login",
  profile: "/profile",
  category: "/category",
  categories: "/categories",
  product: "/product",
  products: "/products",
  order: "order",
  orders: "/orders",
  ordersTracking: "/orders/tracking",
  orderUpdate: "/order/update",
  cart: "cart",
  carts: "/carts",
  deleteListCarts: "cart/delete/list",
  statistic: "statistic",
  changePassword: "/change-password",
  paypal: "/paypal",
  return_url: "http://127.0.0.1:4000/pay-success",
  cancel_url: "http://127.0.0.1:4000/pay-cancel",
  sort: {
    product: {
      base: "/products/sort",
      name: "/products/sort/name",
      price: "/products/sort/price",
    },
    category: "/categories/sort",
  },
  forgot: "/forgot-password",
};

export const AnimationModal = (
  setShowModal: any,
  setConfirmLoading: any
) => {
  setTimeout(() => {
    setShowModal(false);
    setConfirmLoading(false);
  }, 1000);
};

export const ConvertStatus = (status: string) => {
  switch (status) {
    case "unconfirmed": {
      return "Chưa xác nhận";
    }
    case "waiting": {
      return "Đang chờ";
    }
    case "shipping": {
      return "Đang giao";
    }
    case "shipped": {
      return "Đã giao";
    }
    case "canceled": {
      return "Đã hủy";
    }
  }
};

export const ConvertStatusButton = (status: string) => {
  switch (status) {
    case "waiting": {
      return "Xác nhận";
    }
    case "shipping": {
      return "Đã nhận";
    }
  }
};
