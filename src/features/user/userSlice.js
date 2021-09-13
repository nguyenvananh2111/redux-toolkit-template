import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    name: "Anh",
    address: {
        city: "Da Nang",
        province: "Hai Chau",
    },
    loading: false,
    errorMessage: "",
};

// Fake API
const changeNameAPIFailed = (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject("this is error 222"), 2000);
    });
};

// Thunk for changeNameWithFailed
export const changeUsernameWithFailedAsync = createAsyncThunk(
    "user/everyNameYouWant",
    async (name, { rejectWithValue }) => {
        try {
            await changeNameAPIFailed(name);
        } catch (error) {
            console.log("Error ==>", error);
            return rejectWithValue(error);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeUsername: (state, action) => {
            state.name = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(changeUsernameWithFailedAsync.pending, (state) => {
                state.loading = true;
                state.errorMessage = "";
            })
            .addCase(changeUsernameWithFailedAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.errorMessage = "";
            })
            .addCase(changeUsernameWithFailedAsync.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            });
    },
});

export const { changeUsername } = userSlice.actions;

export default userSlice.reducer;
