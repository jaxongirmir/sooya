import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Popconfirm, Table, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLessonId } from '../../slices/lessonId'
import {
	deleteLesson,
	fetchLessons,
	updateLesson,
} from '../../slices/lessonSlice'
import CreateLesson from '../createLesson/CreateLesson'
import Error from '../error/Error'
import Layout from '../layout/Layout'
import Loading from '../loading/Loading'
import LessonModal from '../modal/Modal'
import './Lesson.css'

function Lessons() {
	const [modalOpen, setModalOpen] = useState(false)
	const [id, setID] = useState(null)
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
	const [confirmLoading, setConfirmLoading] = useState(false)

	if (!lessons || lessons.length === 0) {
		return (
			<div>
				<Loading />
			</div>
		)
	}
	if (loading) {
		return <Loading />
	}

	if (error) {
		return <Error error={error} />
	}
	const handleDelete = lessonId => {
		dispatch(deleteLesson(lessonId))
	}

	const handleOk = () => {
		setConfirmLoading(true)
		setTimeout(() => {
			setOpen(false)
			setConfirmLoading(false)
		}, 1000)
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
			// render: (inx, item) => inx,
		},
		{
			title: 'index',
			dataIndex: 'index',
			// render: (inx, item) => inx,
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
			// render: (_, item) => {
			//   return item?.teacher || "topilmadi";
			// },
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
								setModalOpen(true)
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
								setModalOpen(true)
								setID(item.id)
								const id = item.id
								dispatch(setLessonId(id))
								setReading(true)
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
								setOpen(true)
								setID(item.id)
								form.setFieldValue('title', item?.title)
								form.setFieldValue('index', item.index)
								form.setFieldValue('description', item.description)
								form.setFieldValue('score', item.score)
							}}
							style={{ color: 'green' }}
						/>
						<Modal
							title=''
							open={open}
							onOk={handleOk}
							confirmLoading={confirmLoading}
							onCancel={() => setOpen(false)}
						>
							<div>
								<Form
									onFinish={v => onFinish(v, item.id)}
									form={form}
									layout='vertical'
									autoComplete='off'
								>
									<h3 style={{ textAlign: 'center', marginBottom: '30px' }}>
										Update lesson
									</h3>
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
										<Button type='primary' htmlType='submit'>
											Update
										</Button>
									</Form.Item>
								</Form>
							</div>
						</Modal>
						<LessonModal
							setModalOpen={setModalOpen}
							modalOpen={modalOpen}
							item={id}
							reading={reading}
						/>
					</div>
				)
			},
		},
	]

	return (
		<Layout>
			<Tabs>
				<Tabs.TabPane defaultActiveKey='0' tab='Lessons' key={0}>
					<Table
						pagination={false}
						size='smoll'
						bordered={true}
						dataSource={lessons}
						rowKey='id'
						columns={columns}
						className='lesson_table'
					/>
				</Tabs.TabPane>

				<Tabs.TabPane defaultActiveKey='1' tab='Create lesson' key={1}>
					<CreateLesson />
				</Tabs.TabPane>
			</Tabs>
		</Layout>
	)
}

export default Lessons
