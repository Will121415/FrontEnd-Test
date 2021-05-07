import { Supplier } from "./supplier_model";

export class Product {
  idProduct: string;
  name: string
  status: string;
  salePrice: number;
  purchasePrice: number;
  unitMeasure: string;
  quantityStock: number;
  iva: number;
  description: string;
  supplier: Supplier;
}
