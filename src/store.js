import { configureStore } from '@reduxjs/toolkit'
import lessonId from './slices/lessonId'
import lessonSlice from './slices/lessonSlice'
import login from './slices/loginSlice'
import mediaId from './slices/mediaId'
import mediaSlice from './slices/mediaSlice'
import questionSLice from './slices/questionSLice'
import translationId from './slices/translationId'
import translationSlice from './slices/translationSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
	reducer: {
		login,
		lesson: lessonSlice,
		user: userSlice,
		media: mediaSlice,
		translation: translationSlice,
		lessonId: lessonId,
		mediaId: mediaId,
		translationId: translationId,
		question: questionSLice,
	},
})
