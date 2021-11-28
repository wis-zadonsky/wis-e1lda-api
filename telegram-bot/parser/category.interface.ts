import { IItem } from "./item.interface";

export interface ICategory {
  name: string;
  items: IItem[];
}