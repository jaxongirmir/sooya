import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteUser, updateUser } from '../../slices/userSlice'
import MAIN_URL from '../../url/Urls'
import './User.css'

function User() {
	const [users, setUsers] = useState([])
	const [form] = Form.useForm()
	const [id, setId] = useState(null)
	const dispatch = useDispatch()

	useEffect(() => {
		const token = localStorage.getItem('token')
		const headers = {
			Authorization: `Bearer ${token}`,
		}
		axios
			.get(MAIN_URL + '/users', { headers })
			.then(res => {
				setUsers(res.data)
			})
			.catch(err => console.log(err))
	}, [])

	const handleDelete = userId => {
		dispatch(deleteUser(userId))
	}

	const [open, setOpen] = useState(false)
	const [confirmLoading, setConfirmLoading] = useState(false)
	const handleOk = () => {
		setConfirmLoading(true)
		setTimeout(() => {
			setOpen(false)
			setConfirmLoading(false)
		}, 1000)
	}
	const handleCancel = () => {
		console.log('Clicked cancel button')
		setOpen(false)
	}

	const onFinish = values => {
		let body = {
			...values,
		}
		console.log(body)
		dispatch(updateUser({ id, userData: body }))
		handleCancel()
	}

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Surname',
			dataIndex: 'surname',
			key: 'surname',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Teacher',
			dataIndex: 'teacher',
			key: 'teacher',
			render: (_, item) => {
				// return item?.teacher || 'topilmadi'
				return item?.teacher ? (
					<p style={{ color: 'aqua' }}>Techaer</p>
				) : (
					<p style={{ color: 'red' }}>Student</p>
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
						{/* delete confirm */}
						<Popconfirm
							title="Ushbu userni o'chirmoqchimisiz?"
							onConfirm={() => handleDelete(item.id)}
						>
							<DeleteOutlined style={{ color: 'crimson' }} />
						</Popconfirm>

						{/* edit confirm */}
						<EditOutlined
							onClick={() => {
								setOpen(true)
								setId(item.id)
								form.setFieldValue('name', item.name)
								form.setFieldValue('surname', item.surname)
								form.setFieldValue('email', item.email)
								// form.setFieldValue("surname", item.surname);
							}}
							style={{ color: 'green' }}
						/>
						<Modal
							title=''
							open={open}
							onOk={handleOk}
							confirmLoading={confirmLoading}
							onCancel={handleCancel}
						>
							<Form
								form={form}
								onFinish={v => onFinish(v)}
								layout='vertical'
								autoComplete='off'
							>
								<h3 style={{ textAlign: 'center', marginBottom: '30px' }}>
									Update student
								</h3>
								<Form.Item
									label='Name'
									name='name'
									id='1'
									rules={[
										{
											required: true,
											message: 'Please input your name!',
										},
									]}
								>
									<Input autoComplete='off' />
								</Form.Item>

								<Form.Item
									label='Surname'
									name='surname'
									id='2'
									rules={[
										{
											required: true,
											message: 'Please input your surname',
										},
									]}
								>
									<Input autoComplete='off' />
								</Form.Item>

								<Form.Item
									label='Email'
									name='email'
									id='3'
									rules={[
										{
											required: true,
											message: 'Please input your email!',
										},
									]}
								>
									<Input autoComplete='off' />
								</Form.Item>

								{/* <Form.Item label='Password' name='password' id='4'>
									<Input.Password autoComplete='off' />
								</Form.Item>

								<Form.Item
									wrapperCol={{
										offset: 17,
										span: 16,
									}}> 
								</Form.Item>
							*/}
								<Button type='primary' htmlType='submit'>
									Update
								</Button>
							</Form>
						</Modal>
					</div>
				)
			},
		},
	]

	return (
		<div>
			<Table
				pagination={false}
				size='smoll'
				bordered={true}
				dataSource={users}
				rowKey='id'
				columns={columns}
			/>
		</div>
	)
}

export default User
