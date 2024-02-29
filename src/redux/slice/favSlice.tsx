import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Favorite from "../../screen/favorite/Favorite";
import { FavoritePayload } from "../../types/favSliceType";
import { HomeFlatlistProps } from "../../types/homeTypes";

export interface FavoriteState {
  favItem: FavoritePayload[];
}

const initialState: FavoriteState = {
  favItem: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<FavoritePayload>) => {
      // Check if the item already exists in the favItem array
      const existingItemIndex = state.favItem.findIndex(
        (item) => item.thumbnail === action.payload.thumbnail
      );

      // If the item doesn't exist, add it to the array
      if (existingItemIndex === -1) {
        state.favItem.push(action.payload);
      }
    },
    removeToFavorite: (state, action: PayloadAction<FavoritePayload>) => {
      const indexToRemove = state.favItem.findIndex(
        (item) => item.thumbnail === action.payload.thumbnail
      );

      if (indexToRemove !== -1) {
        state.favItem.splice(indexToRemove, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToFavorite, removeToFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
