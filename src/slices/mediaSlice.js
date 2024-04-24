import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import MAIN_URL from '../url/Urls'

export const fetchMedias = createAsyncThunk(
	'medias/fetchMedias',
	async ({ id }, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}
			const response = await axios.get(
				`${MAIN_URL}/lessons/${id}/media_items`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data.message)
		}
	}
)

// export const fetchMedia = createAsyncThunk(
// 	'media/fetchMedia',
// 	async ({ id, mediaId }, { rejectWithValue }) => {
// 		try {
// 			const token = localStorage.getItem('token')
// 			if (!token) {
// 				throw new Error('Token not found')
// 			}
// 			const response = await axios.get(
// 				`${MAIN_URL}/lessons/${id}/media_items/${mediaId}`,
// 				{
// 					headers: {
// 						Authorization: `Bearer ${token}`,
// 					},
// 				}
// 			)
// 			return response.data
// 		} catch (error) {
// 			return rejectWithValue(error.response.data.message)
// 		}
// 	}
// )
export const addMedia = createAsyncThunk(
	'media/addMedia',
	async ({ id, formData }, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}
			const response = await axios.post(
				`${MAIN_URL}/lessons/${id}/media_items`,
				formData,
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

const initialState = {
	medias: [],
	loading: false,
	error: null,
}

const mediaSlice = createSlice({
	name: 'medias',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchMedias.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchMedias.fulfilled, (state, action) => {
				state.loading = false
				state.medias = action.payload
			})
			.addCase(fetchMedias.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			// .addCase(fetchMedia.pending, state => {
			// 	state.loading = true
			// 	state.error = null
			// })
			// .addCase(fetchMedia.fulfilled, (state, action) => {
			// 	state.loading = false
			// 	state.medias = action.payload
			// })
			// .addCase(fetchMedia.rejected, (state, action) => {
			// 	state.loading = false
			// 	state.error = action.payload
			// })
			.addCase(addMedia.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(addMedia.fulfilled, (state, action) => {
				state.loading = false
				state.medias.push(action.payload)
			})
			.addCase(addMedia.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})
export default mediaSlice.reducer
