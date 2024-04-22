import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import MAIN_URL from '../url/Urls'

export const fetchQuestions = createAsyncThunk(
	'questions/fetchQuestions',
	async ({ lessonId, mediaId }, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}
			const response = await axios.get(
				`${MAIN_URL}/lessons/${lessonId}/media_items/${mediaId}/multiple_questions`,
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

export const addQuestion = createAsyncThunk(
	'question/addQuestion',
	async ({ lessonId, mediaId, multiple_question }, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}
			const response = await axios.post(
				`${MAIN_URL}/lessons/${lessonId}/media_items/${mediaId}/multiple_questions`,
				multiple_question,
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
	questions: [],
	loading: false,
	error: null,
}

const questionSlice = createSlice({
	name: 'questions',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchQuestions.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchQuestions.fulfilled, (state, action) => {
				state.loading = false
				state.questions = action.payload
			})
			.addCase(fetchQuestions.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(addQuestion.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(addQuestion.fulfilled, (state, action) => {
				state.loading = false
				state.questions.push(action.payload)
			})
			.addCase(addQuestion.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})
export default questionSlice.reducer
