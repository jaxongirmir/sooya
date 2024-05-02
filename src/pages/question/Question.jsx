import { Button, Input } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLessonId, setLessonId } from '../../slices/lessonId'
import { selectMediaId } from '../../slices/mediaId'
import { addQuestion } from '../../slices/questionSLice'
import { selectTranslationId } from '../../slices/translationId'
import styles from './Question.module.css'

const Question = ({ setModalOpen, setCurrent }) => {
	const [question, setQuestion] = useState('')
	const [correctAnswer, setCorrectAnswer] = useState('')
	const [incorrectAnswer1, setIncorrectAnswer1] = useState('')
	const [incorrectAnswer2, setIncorrectAnswer2] = useState('')
	const [incorrectAnswer3, setIncorrectAnswer3] = useState('')
	const { TextArea } = Input
	const dispatch = useDispatch()
	const lessonId = useSelector(selectLessonId)
	const mediaInfo = useSelector(selectMediaId)
	const translatioInfo = useSelector(selectTranslationId)
	const mediaId = mediaInfo.payload.mediaId.mediaId
	const translationId = translatioInfo.payload.translationId.translationId
	const loading = useSelector(state => state.question.loading)
	// if (!translationId) {
	// 	return (
	// 		<h2
	// 			style={{
	// 				color: 'red',
	// 				height: '230px',
	// 				display: 'flex',
	// 				justifyContent: 'center',
	// 				alignItems: 'center',
	// 			}}
	// 		>
	// 			Create the translation first
	// 		</h2>
	// 	)
	// }
	const handleClick = async () => {
		const multiple_question = {
			content: question,
			answers_attributes: [
				{ content: correctAnswer, correct: true },
				{ content: incorrectAnswer1, correct: false },
				{ content: incorrectAnswer2, correct: false },
				{ content: incorrectAnswer3, correct: false },
			],
		}

		dispatch(addQuestion({ lessonId, mediaId, multiple_question }))
		dispatch(setLessonId(null))
		setQuestion('')
		setCorrectAnswer('')
		setIncorrectAnswer1('')
		setIncorrectAnswer2('')
		setIncorrectAnswer3('')
		setModalOpen(false)
		setCurrent(p => p - 2)
		dispatch(selectMediaId(null))
		dispatch(selectTranslationId(null))
	}
	return (
		<div className={styles.questions}>
			<h3>Create Question</h3>
			<TextArea
				placeholder='Question'
				value={question}
				onChange={e => setQuestion(e.target.value)}
				required={true}
			></TextArea>
			<Input
				placeholder='Enter correct answer'
				value={correctAnswer}
				onChange={e => setCorrectAnswer(e.target.value)}
			/>
			<Input
				placeholder='Enter incorrect answer'
				value={incorrectAnswer1}
				onChange={e => setIncorrectAnswer1(e.target.value)}
			/>
			<Input
				placeholder='Enter incorrect answer'
				value={incorrectAnswer2}
				onChange={e => setIncorrectAnswer2(e.target.value)}
			/>
			<Input
				placeholder='Enter incorrect answer'
				value={incorrectAnswer3}
				onChange={e => setIncorrectAnswer3(e.target.value)}
			/>
			<Button onClick={handleClick} loading={loading}>
				Create Question
			</Button>
		</div>
	)
}

export default Question
