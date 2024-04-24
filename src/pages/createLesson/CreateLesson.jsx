import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLesson } from '../../slices/lessonSlice'

function CreateLesson() {
	const [comleted, setCompleted] = useState(false)
	const [file, setFile] = useState(null)
	const dispatch = useDispatch()
	const loading = useSelector(state => state.lesson.loading)
	const error = useSelector(state => state.lesson.error)

	const onFinish = values => {
		// const formData = new FormData()
		// formData.append('lesson[index]', values.index)
		// formData.append('lesson[title]', values.title)
		// formData.append('lesson[description]', values.description)
		// formData.append('lesson[score]', values.score)
		// formData.append('lesson[completed]', completed)
		// formData.append('lesson[iframe_url]', values.iframe_url)
		// formData.append('lesson[photo_file]', file)

		// dispatch(addLesson(formData))

		let body = {
			lesson: {
				...values,
				comleted,
			},
		}
		console.log(body)
		dispatch(addLesson(body))
	}
	return (
		<div className='createUser'>
			<Form onFinish={onFinish} layout='vertical' autoComplete='off'>
				<h3 style={{ textAlign: 'center', marginBottom: '30px' }}>
					Create lesson
				</h3>
				<Form.Item
					label='Index'
					name='index'
					rules={[
						{
							required: true,
							message: 'Please, enter lesson index!',
						},
					]}
				>
					<Input type='number' />
				</Form.Item>
				<Form.Item
					label='Title'
					name='title'
					rules={[
						{
							required: true,
							message: 'Please, enter lesson title!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Description'
					name='description'
					rules={[
						{
							required: true,
							message: 'Please, enter lesson description!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Score'
					name='score'
					rules={[
						{
							required: true,
							message: 'Please, enter lesson score!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					wrapperCol={{
						offset: 17,
						span: 16,
					}}
				>
					<Button type='primary' htmlType='submit' loading={loading}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default CreateLesson
