import { Button, Form, Input, Select } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMediaId } from '../../slices/mediaId'
import { addMedia } from '../../slices/mediaSlice'
import Error from '../error/Error'
import ModalLoading from '../loading/ModalLoading'
import styles from './Media.module.css'

const Media = ({ id, setCurrent }) => {
	const [selectedFile, setSelectedFile] = useState(null)
	const [url, setUrl] = useState('')
	const [type, setType] = useState('image')
	const dispatch = useDispatch()

	const loading = useSelector(state => state.media.loading)
	const error = useSelector(state => state.media.error)

	const handleFileChange = event => {
		setSelectedFile(event.target.files[0])
	}

	const handleUpload = async () => {
		if (type === 'image' && !selectedFile) {
			alert('Please select a file.')
			return
		}

		const formData = new FormData()
		formData.append('media_item[media_type]', type)
		if (selectedFile) {
			formData.append('media_item[media_link]', selectedFile || null)
		} else {
			formData.append('media_item[media_link]', url || '')
		}

		dispatch(addMedia({ id, formData }))
			.then(res => {
				dispatch(selectMediaId(res.payload.id))
				setSelectedFile(null)
				setUrl('')
				setType('image')
				setCurrent(p => p + 1)
			})
			.catch(err => console.log(err))
	}
	if (loading) {
		return <ModalLoading />
	}
	if (error) {
		return <Error error={error} />
	}

	return (
		<div className={styles.media}>
			<Form layout='vertical' autoComplete='off'>
				<h3>Create Media</h3>
				<Form.Item label='Media type' name='media_type'>
					<Select onChange={setType} defaultValue={'image'}>
						<Select.Option value='image'>Img or Video</Select.Option>
						<Select.Option value='link'>Url</Select.Option>
					</Select>
				</Form.Item>
				{type === 'image' ? (
					<Form.Item label='Video or Img' name='video_img'>
						<Input type='file' onChange={handleFileChange} />
					</Form.Item>
				) : (
					<Form.Item label='Url' name='link'>
						<Input
							type='text'
							value={url}
							onChange={e => setUrl(e.target.value)}
						/>
					</Form.Item>
				)}
				<Button type='primary' onClick={handleUpload}>
					Upload
				</Button>
			</Form>
		</div>
	)
}

export default Media
