import { StaticImageData } from 'next/image';

export interface BannerImageProps {
  heading: string;
  subHeading: string;
  imageSrc: StaticImageData;
}

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  isBestseller: boolean;
  imageUrl: string;
  isVeg: boolean;
  servings: number;
}

export interface SubCategory {
  name: string;
  foodItems: FoodItem[];
}

export interface Category {
  name: string;
  subCategory: SubCategory[];
}

export interface Menu {
  category: Category[];
}

export interface Cart {
  id: number;
  item: FoodItem;
  quantity: number;
}
