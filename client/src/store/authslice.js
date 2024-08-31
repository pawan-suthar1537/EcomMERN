import { createSlice } from "@reduxjs/toolkit";

//   "auth/loginUser",
//   async (formdata, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(API_URL + "/api/auth/login", formdata, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });
//       if (res.data.success === false) {
//         throw new Error(res.data.message);
//       }
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const checkauth = createAsyncThunk(
//   "auth/checkauth",
//   async (_, { rejectWithValue, getState }) => {
//     const state = getState();
//     const token = state.auth.token;

//     try {
//       const response = await axios.get(`${API_URL}/api/auth/check-auth`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isauth: false,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isauth = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isauth = false;
      state.token = null;
    },
  },
});

export const { setUser, logout,setToken } = authSlice.actions;
export default authSlice.reducer;
