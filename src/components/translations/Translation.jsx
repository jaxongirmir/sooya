import { DeleteOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLessonId } from '../../slices/lessonId'
import { selectMediaId } from '../../slices/mediaId'
import { selectTranslationId } from '../../slices/translationId'
import { addTranslation } from '../../slices/translationSlice'
import Error from '../error/Error'
import ModalLoading from '../loading/ModalLoading'
import styles from './Translation.module.css'

const Translation = ({ setCurrent }) => {
	const [uzb, setUzb] = useState([''])
	const [eng, setEng] = useState([''])
	const [id, setId] = useState('')
	const dispatch = useDispatch()
	const lessonId = useSelector(selectLessonId)
	const mediaInfo = useSelector(selectMediaId)
	const loading = useSelector(state => state.translation.loading)
	const error = useSelector(state => state.translation.error)
	const mediaId = mediaInfo.payload.mediaId.mediaId
	if (!mediaId) {
		return (
			<h2
				style={{
					color: 'red',
					height: '230px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				Create the media first
			</h2>
		)
	}

	const handleAddInput = () => {
		setUzb([...uzb, { id: uzb.length }])
		setEng([...eng, { id: eng.length }])
	}
	const array_of_objects = uzb.map((el, index) => ({
		[el.value]: eng[index].value,
	}))

	const handleRemoveInput = id => {
		const updatedUzb = uzb.filter(input => input.id !== id)
		const updatedEng = eng.filter(input => input.id !== id)
		setUzb(updatedUzb)
		setEng(updatedEng)
	}

	const handleInputChange = (id, value) => {
		const updatedInputs = uzb.map(input =>
			input.id === id ? { ...input, value } : input
		)
		setUzb(updatedInputs)
	}

	const handleInputChangeEng = (id, value) => {
		const updatedInputs = eng.map(input =>
			input.id === id ? { ...input, value } : input
		)
		setEng(updatedInputs)
	}

	const handleRemoveBothInputs = id => {
		handleRemoveInput(id)
		handleRemoveInput(id)
	}
	const handleClick = () => {
		dispatch(addTranslation({ lessonId, mediaId, array_of_objects }))
			.then(res => {
				setId(res.payload.id)
				dispatch(selectTranslationId(res.payload.id))
				setCurrent(p => p + 1)
			})
			.catch(err => console.log(err))
	}
	if (loading) {
		return <ModalLoading />
	}
	if (error) {
		return <Error error={error} />
	}
	return (
		<div>
			<div className={styles.inputs}>
				<div className={styles.uzb}>
					<p>uzb</p>
					{uzb.map(input => (
						<div key={input.id}>
							<Input
								type='text'
								value={input.value || ''}
								onChange={e => handleInputChange(input.id, e.target.value)}
							/>
							<Button
								onClick={() => handleRemoveBothInputs(input.id)}
								className={styles.remove}
							>
								<DeleteOutlined />
							</Button>
						</div>
					))}
				</div>
				<div className={styles.eng}>
					<p>eng</p>
					{eng.map(input => (
						<div key={input.id}>
							<Input
								type='text'
								value={input.value || ''}
								onChange={e => handleInputChangeEng(input.id, e.target.value)}
							/>
							<button
								onClick={() => handleRemoveBothInputs(input.id)}
								className={styles.hidden}
							>
								Remove
							</button>
						</div>
					))}
				</div>
			</div>
			<Button onClick={handleClick}>Create</Button>
			<Button onClick={handleAddInput} className={styles.add_btn}>
				Add Input
			</Button>
		</div>
	)
}

export default Translation
