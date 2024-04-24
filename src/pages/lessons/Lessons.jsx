import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Popconfirm, Table, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/layout/Layout'
import LessonModal from '../../components/modal/Modal'
import { setLessonId } from '../../slices/lessonId'
import {
	deleteLesson,
	fetchLessons,
	updateLesson,
} from '../../slices/lessonSlice'
import CreateLesson from '../createLesson/CreateLesson'
import './Lesson.css'

function Lessons() {
	const [modalOpen, setModalOpen] = useState(false)
	const [id, setID] = useState(null)
	const [count, setCount] = useState(null)
	const [reading, setReading] = useState(false)
	const [form] = Form.useForm()
	const dispatch = useDispatch()
	const lessons = useSelector(state => state.lesson.lessons)
	const loading = useSelector(state => state.lesson.loading)
	const error = useSelector(state => state.lesson.error)

	useEffect(() => {
		dispatch(fetchLessons())
	}, [dispatch])

	const [open, setOpen] = useState(false)

	const handleDelete = lessonId => {
		dispatch(deleteLesson(lessonId))
	}

	const onFinish = values => {
		let lessonData = {
			...values,
		}

		dispatch(updateLesson({ id, lessonData }))
		setOpen(false)
	}

	const columns = [
		{
			title: 'id',
			dataIndex: 'id',
		},
		{
			title: 'index',
			dataIndex: 'index',
		},
		{
			title: 'title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'description',
			dataIndex: 'description',
			key: 'description',
		},

		{
			title: 'Show details',
			dataIndex: 'show details',
			key: 'show details',
			render: (_, item) => {
				return (
					<div className='btns'>
						<Button
							onClick={() => {
								setModalOpen(item.id)
								setID(item.id)
								const id = item.id
								dispatch(setLessonId(id))
								setReading(false)
							}}
						>
							Add media
						</Button>
						<Button
							onClick={() => {
								setModalOpen(item.id)
								setID(item.id)
								const id = item.id
								dispatch(setLessonId(id))
								setReading(true)
								setCount(0)
							}}
						>
							Add Reading
						</Button>
					</div>
				)
			},
		},
		{
			title: 'Controll',
			dataIndex: 'id',
			key: 'teacher',
			render: (_, item) => {
				return (
					<div className='userControll'>
						<Popconfirm
							title='Are you sure you want to delete this lesson ?'
							onConfirm={() => handleDelete(item.id)}
						>
							<DeleteOutlined style={{ color: 'crimson' }} />
						</Popconfirm>

						<EditOutlined
							onClick={() => {
								setOpen(item.id)
								setID(item.id)
								form.setFieldValue('title', item?.title)
								form.setFieldValue('index', item.index)
								form.setFieldValue('description', item.description)
								form.setFieldValue('score', item.score)
							}}
							style={{ color: 'green' }}
						/>
						<Modal title='Update lesson' open={open === item.id} footer={null}>
							<div>
								<Form
									onFinish={v => onFinish(v, item.id)}
									form={form}
									layout='vertical'
									autoComplete='off'
								>
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
											Update
										</Button>
									</Form.Item>
								</Form>
							</div>
						</Modal>
						<LessonModal
							setModalOpen={setModalOpen}
							modalOpen={modalOpen}
							item={item.id}
							reading={reading}
							count={count}
						/>
					</div>
				)
			},
		},
	]

	const items = [
		{
			key: '0',
			label: 'Lessons',
			children: (
				<Table
					pagination={false}
					size='smoll'
					bordered={true}
					dataSource={lessons}
					rowKey='id'
					columns={columns}
					className='lesson_table'
				/>
			),
		},
		{
			key: '1',
			label: 'Create lesson',
			children: <CreateLesson />,
		},
	]

	return (
		<Layout>
			<Tabs items={items} />
		</Layout>
	)
}

export default Lessons
