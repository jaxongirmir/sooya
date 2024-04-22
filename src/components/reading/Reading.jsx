import { Button, Input } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addReading } from '../../slices/readingSlice'
import styles from './Reading.module.css'
const Reading = ({ id, setModalOpen }) => {
	const [text, setText] = useState('')
	const dispatch = useDispatch()
	const handClick = () => {
		dispatch(addReading({ id, text }))
		setText('')
	}
	return (
		<div className={styles.reading_form}>
			<h3>Create Reading</h3>
			<Input.TextArea
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder='Enter your text'
				autoSize={{
					minRows: 10,
				}}
			></Input.TextArea>
			<Button type='primary' onClick={handClick}>
				Submit
			</Button>
		</div>
	)
}

export default Reading
