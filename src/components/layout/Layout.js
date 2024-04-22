import { ExclamationCircleFilled } from '@ant-design/icons'
import { Button, Modal, message } from 'antd'
import React, { useState } from 'react'
import { AiFillLeftCircle } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { teacher } from '../../utils/DataSidebar'
import './style.css'

const Layout = ({ children }) => {
	const [sideOpen, setSideOpen] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()

	const OpenSID = () => {
		setSideOpen(i => !i)
	}

	const { confirm } = Modal
	const showDeleteConfirm = () => {
		confirm({
			title: 'Tizimdan chiqmoqchimisiz?',
			icon: <ExclamationCircleFilled />,
			okText: 'Ha',
			okType: 'danger',
			cancelText: "Yo'q",
			onOk() {
				return new Promise((resolve, reject) => {
					setTimeout(Math.random() > 0.5 ? resolve : reject, 100)
					setTimeout(() => {
						localStorage.removeItem('token')
						message.success('Logout Successfully')
						window.location = '/'
					}, 100)
				}).catch(() => console.log('Oops errors!'))
			},
			onCancel() {
				console.log('Cancel')
			},
		})
	}

	return (
		<div className='Main-Lay'>
			<div className='Layout'>
				<div className='SidCont'>
					<div className={`Sidebar ${sideOpen ? 'sideOpen' : 'Sidebar'}`}>
						<div className='SidebarHeader'>
							<h6 className={` ${sideOpen ? 'LinkNone' : 'noneText'}`}>
								Teacher
							</h6>
							<button
								className={`OpenWindowSid ${sideOpen ? 'OpenWindowRight' : ''}`}
							>
								<AiFillLeftCircle onClick={() => OpenSID()} />
							</button>
							<p className='MobileSidText'>Teacher</p>
						</div>
						<div className='menu'>
							{teacher?.map((menu, inx) => {
								const isActive = location.pathname === menu.path
								return (
									<Link
										to={menu.path}
										key={inx}
										className={`menu-item ${isActive && 'active'}`}
									>
										<i className={menu.icon}></i>

										<div className={` ${sideOpen ? 'LinkNone' : 'noneText'}`}>
											{menu.name}
										</div>

										<p className='MobileSidText'>{menu.name}</p>
									</Link>
								)
							})}

							<Button
								className='menu-item log'
								onClick={showDeleteConfirm}
								type='dashed'
							>
								<i className='fa fa-sign-out'></i>

								<div className={`${sideOpen ? 'LinkNone' : 'noneText'}`}>
									Log out
								</div>
								<p className='MobileSidText'>Chiqish</p>
							</Button>
						</div>
					</div>
				</div>
				<div className='content'>
					<div className='MainNavbar'></div>

					<div className='body'>{children}</div>
				</div>
			</div>
		</div>
	)
}
export default Layout
