import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	mediaId: null,
}

const mediaIdSlice = createSlice({
	name: 'mediaId',
	initialState,
	reducers: {
		selectMediaId: (state, action) => {
			state.mediaId = action.payload
		},
	},
})

export const { selectMediaId } = mediaIdSlice.actions
export default mediaIdSlice.reducer
