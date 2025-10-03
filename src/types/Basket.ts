export interface BasketItem {
  productId: string; // vì backend trả Guid -> chuỗi
  productName: string;
  price: number;
  quantity: number;
}

export interface Basket {
  items: BasketItem[];
}
