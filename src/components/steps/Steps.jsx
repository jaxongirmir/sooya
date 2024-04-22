import { Steps as AntSteps, Button } from 'antd'
import React, { useState } from 'react'
import Media from '../media/Media'
import Question from '../question/Question'
import Reading from '../reading/Reading'
import Translations from '../translations/Translation'

const CustomSteps = ({ id, setModalOpen, reading }) => {
	const [current, setCurrent] = useState(0)
	console.log(reading)

	const steps = [
		{
			title: reading ? 'Reading' : 'Media',
			content: reading ? (
				<Reading id={id} />
			) : (
				<Media id={id} setCurrent={setCurrent} />
			),
		},
		{
			title: 'Translation',
			content: <Translations setCurrent={setCurrent} />,
		},
		{
			title: 'Question',
			content: <Question setModalOpen={setModalOpen} setCurrent={setCurrent} />,
		},
	]

	const next = () => {
		setCurrent(current + 1)
	}

	const prev = () => {
		setCurrent(current - 1)
	}

	const items = steps.map(item => ({
		key: item.title,
		title: item.title,
	}))

	const contentStyle = {
		padding: '30px 0 ',
	}

	return (
		<>
			<AntSteps current={current} items={items} style={{ width: '50%' }} />{' '}
			<div style={contentStyle}>{steps[current].content}</div>
			<div style={{ width: '50%' }}>
				{current < steps.length - 1 && (
					<Button type='primary' onClick={next}>
						Next
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button
						type='primary'
						onClick={() => {
							setModalOpen(false)
						}}
					>
						Done
					</Button>
				)}
				{current > 0 && (
					<Button style={{ margin: '0 8px' }} onClick={prev}>
						Previous
					</Button>
				)}
			</div>
		</>
	)
}

export default CustomSteps
