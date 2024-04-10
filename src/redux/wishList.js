import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    wishListData: [],
    userInfo: null,
}
export const wishList = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const item = state.wishListData.find((p) => p.id === action.payload.id);
            if (!item) {
                state.wishListData.push(action.payload);
            }
        },
        deleteFromWishlist: (state, action) => {
            state.wishListData = state.wishListData.filter(
                (p) => p.id !== action.payload
            );
        },
        addUser: (state, action) => {
            state.userInfo = action.payload;
        },
        removeUser: (state) => {
            state.userInfo = null;
        },

    }
});
export const { addToWishlist, deleteFromWishlist,addUser,removeUser } = wishList.actions;
export default wishList.reducer;