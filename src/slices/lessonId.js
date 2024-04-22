import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	lessonId: null,
}

const lessonIdSlice = createSlice({
	name: 'lessonId',
	initialState,
	reducers: {
		setLessonId(state, action) {
			state.lessonId = action.payload
		},
	},
})

export const { setLessonId } = lessonIdSlice.actions
export const selectLessonId = state => state.lessonId.lessonId

export default lessonIdSlice.reducer
