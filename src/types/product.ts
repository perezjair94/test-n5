export interface IProduct {
  id: number;
  name: string;
  price: number;
  amount: number;
}

export interface FormData {
  name: IProduct["name"];
  price: IProduct["price"];
  amount: IProduct["amount"];
}
