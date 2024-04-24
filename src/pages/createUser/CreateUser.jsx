import { Button, Form, Input, Tabs, notification } from 'antd'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/layout/Layout'
import { addUser, fetchUsers } from '../../slices/userSlice'
import User from '../users/User'
import './CreateUser.css'

function CreateUser() {
	const dispatch = useDispatch()
	const formRef = useRef(null)
	const loading = useSelector(state => state.user.loading)

	useEffect(() => {
		dispatch(fetchUsers())
	}, [dispatch])

	const onFinish = values => {
		const body = {
			user: values,
		}
		dispatch(addUser(body))
			.then(() => {
				notification.success({
					message: 'User Created',
					description: 'The user has been successfully created.',
				})
				formRef.current.resetFields()
				formRef.current.setFieldsValue({
					email: '',
					password: '',
				})
			})
			.catch(error => {
				notification.error({
					message: 'Error',
					description: 'There was an error while creating the user.',
				})
			})
	}

	return (
		<Layout>
			<Tabs>
				<Tabs.TabPane defaultActiveKey='0' tab='Students' key={0}>
					<User />
				</Tabs.TabPane>

				<Tabs.TabPane defaultActiveKey='1' tab='Create' key={1}>
					<div className='createUser'>
						<Form
							ref={formRef}
							onFinish={onFinish}
							layout='vertical'
							autoComplete='off'
						>
							<h3 style={{ textAlign: 'center', marginBottom: '30px' }}>
								Create student
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
									{
										type: 'email',
										message: 'The input is not a valid email!',
									},
								]}
							>
								<Input autoComplete='off' />
							</Form.Item>

							<Form.Item
								label='Password'
								name='password'
								id='4'
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
									{
										min: 6,
										message: 'Password must be at least 6 characters long.',
									},
								]}
							>
								<Input.Password autoComplete='off' />
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
				</Tabs.TabPane>
			</Tabs>
		</Layout>
	)
}

export default CreateUser
