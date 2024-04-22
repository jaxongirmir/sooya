import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	translationId: null,
}

const translationIdSlice = createSlice({
	name: 'translationId',
	initialState,
	reducers: {
		selectTranslationId(state, action) {
			state.translationId = action.payload
		},
	},
})

export const { selectTranslationId } = translationIdSlice.actions
// export const selectTranslationId = state => state.translation.translation

export default translationIdSlice.reducer

// export const { selectMediaId } = mediaIdSlice.actions
// export default mediaIdSlice.reducer
