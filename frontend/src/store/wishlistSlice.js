import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { wishlistApi } from '../services/wishlistApi';

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistApi.getWishlist();
      return response.wishlist;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
    }
  }
);

export const toggleWishlistItem = createAsyncThunk(
  'wishlist/toggleWishlistItem',
  async ({ productId, isAdded }, { rejectWithValue }) => {
    try {
      if (isAdded) {
        const response = await wishlistApi.removeFromWishlist(productId);
        return response.wishlist;
      } else {
        const response = await wishlistApi.addToWishlist(productId);
        return response.wishlist;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update wishlist');
    }
  }
);

const initialState = {
  items: [],
  isLoading: false,
  error: null
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Toggle Wishlist Item
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        // Handled by re-fetching in components, or we can just update the list of IDs if we want
      });
  }
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
