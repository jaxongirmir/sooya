import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import CreateUser from './components/createUser/CreateUser'
import Lessons from './components/lessons/Lessons'
import Login from './components/login/Login'
import Reading from './components/reading/Reading'

const App = () => {
	const [isAuth, setIsAuth] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			setIsAuth(true)
		}
	}, [])

	return (
		<div>
			<>
				<Routes>
					<Route path='/createUser' element={<CreateUser />} />
					<Route path='/lessons' element={<Lessons />} />
					<Route path='/reading' element={<Reading />} />
					<Route
						exact
						path='/'
						element={isAuth ? <Navigate to='/createUser' /> : <Login />}
					/>

					<Route
						path='/createUser'
						element={isAuth ? <CreateUser /> : <Navigate to='/' />}
					/>
				</Routes>
			</>
		</div>
	)
}

export default App
