import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { data } from '@/utils/data';
import { Category, FoodItem, Menu, SubCategory } from '@/utils/interface';

const initialState = {
  data: {
    menu: data as Menu,
    categories: data.category.map((category) => category.name),
    activeCategory: data.category[0] as Category | null,
  },
};

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeActiveCategory: (state, action: PayloadAction<string>) => {
      const defaultCategory = action.payload
        ? action.payload
        : state.data.categories[0];
      state.data.activeCategory =
        state.data.menu.category.find(
          (category) => category.name === defaultCategory
        ) ?? null;
    },
    // filterMenuItems: (state, action: PayloadAction<string>) => {
    //   state.data.activeCategory = state.data.activeCategory.filter((subCategory : SubCategory) => {
    //     return subCategory.foodItems.filter((item : FoodItem ) => item.name.toLowerCase().includes(action.payload.toLowerCase()))
    //   })
    // }
  },
});

export const { changeActiveCategory } = menu.actions;

export default menu.reducer;
