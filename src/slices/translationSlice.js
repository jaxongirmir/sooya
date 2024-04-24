import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import MAIN_URL from '../url/Urls'

export const fetchTranslations = createAsyncThunk(
	'medias/fetchMedias',
	async ({ id, mediaId }, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}
			const response = await axios.get(
				`${MAIN_URL}/lessons/${id}/media_items/${mediaId}/translations`,
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

export const addTranslation = createAsyncThunk(
	'media/addMedia',
	async ({ lessonId, mediaId, array_of_objects }, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}
			const response = await axios.post(
				`${MAIN_URL}/lessons/${lessonId}/media_items/${mediaId}/translations`,
				{
					translation: {
						array_of_objects,
					},
				},
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
	translations: [],
	loading: false,
	error: null,
}

const translationSlice = createSlice({
	name: 'translations',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchTranslations.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchTranslations.fulfilled, (state, action) => {
				state.loading = false
				state.translations = action.payload
			})
			.addCase(fetchTranslations.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(addTranslation.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(addTranslation.fulfilled, (state, action) => {
				state.loading = false
				state.translations.push(action.payload)
			})
			.addCase(addTranslation.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})
export default translationSlice.reducer
