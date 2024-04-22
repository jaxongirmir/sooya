import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import MAIN_URL from '../url/Urls'
export const addReading = createAsyncThunk(
	'reading/addReading',
	async ({ id, text }, { rejectWithValue }) => {
		try {
			console.log('lessonData', text)
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}
			console.log(id)
			const response = await axios.post(
				`${MAIN_URL}/lessons/${id}/text_question_sets`,
				{
					text_question_set: {
						text,
						lesson_id: id,
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
	readings: [],
	loading: false,
	error: null,
}

const readingSlice = createSlice({
	name: 'reading',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(addReading.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(addReading.fulfilled, (state, action) => {
				state.loading = false
				state.readings.push(action.payload)
			})
			.addCase(addReading.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})
export default readingSlice.reducer
