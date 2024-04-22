import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import MAIN_URL from '../url/Urls'

export const fetchUsers = createAsyncThunk(
	'users/fetchUsers',
	async (_, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}
			const response = await axios.get(`${MAIN_URL}/users`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data.message)
		}
	}
)
export const deleteUser = createAsyncThunk(
	'users/deleteUser',
	async (id, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}

			await axios.delete(`${MAIN_URL}/users/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			return id
		} catch (error) {
			return rejectWithValue(
				error.response ? error.response.data.message : error.message
			)
		}
	}
)

export const updateUser = createAsyncThunk(
	'users/updateUser',
	async ({ id, userData }, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}
			const response = await axios.put(
				`${MAIN_URL}/users/${id}`,
				{ user: userData },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			return response.data
		} catch (error) {
			return rejectWithValue(
				error.response ? error.response.data.message : error.message
			)
		}
	}
)

export const addUser = createAsyncThunk(
	'users/addUser',
	async (userData, { rejectWithValue }) => {
		try {
			console.log(userData)
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}
			const response = await axios.post(`${MAIN_URL}/users`, userData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			return response.data
		} catch (error) {
			return rejectWithValue(
				error.response ? error.response.data.message : error.message
			)
		}
	}
)

const initialState = {
	users: [],
	loading: false,
	error: null,
}

const userslice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchUsers.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false
				state.users = action.payload
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(deleteUser.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.loading = false
				state.users = state.users.filter(user => user.id !== action.payload)
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(updateUser.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false
				state.users = state.users.map(user =>
					user.id === action.payload.id ? action.payload : user
				)
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(addUser.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(addUser.fulfilled, (state, action) => {
				state.loading = false
				state.users.push(action.payload)
			})
			.addCase(addUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export default userslice.reducer
