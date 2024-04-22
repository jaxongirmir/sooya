import { Button, Form, Input, Tabs } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, fetchUsers } from '../../slices/userSlice'
import Error from '../error/Error'
import Layout from '../layout/Layout'
import Loading from '../loading/Loading'
import User from '../users/User'
import './CreateUser.css'

function CreateUser() {
	const dispatch = useDispatch()
	const loading = useSelector(state => state.user.loading)
	const error = useSelector(state => state.user.error)
	useEffect(() => {
		dispatch(fetchUsers())
	}, [dispatch])

	const onFinish = values => {
		const body = {
			user: values,
		}
		dispatch(addUser(body))
	}
	if (error) {
		return <Error error={error} />
	}
	if (loading) {
		return <Loading />
	}
	return (
		<Layout>
			<Tabs>
				<Tabs.TabPane defaultActiveKey='0' tab='Studens' key={0}>
					<User />
				</Tabs.TabPane>

				<Tabs.TabPane defaultActiveKey='1' tab='Create' key={1}>
					<div className='createUser'>
						<Form onFinish={onFinish} layout='vertical' autoComplete='off'>
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
								<Button type='primary' htmlType='submit'>
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
