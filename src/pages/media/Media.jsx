import { Button, Form, Input, Select, notification } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMediaId } from '../../slices/mediaId'
import { addMedia, fetchMedias } from '../../slices/mediaSlice'
import { IMG_URL } from '../../url/Urls'
import styles from './Media.module.css'

const Media = ({ id, setCurrent }) => {
	const [selectedFile, setSelectedFile] = useState(null)
	const [home, setHome] = useState([])
	const [url, setUrl] = useState('')
	const [type, setType] = useState('image')
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchMedias({ id }))
	}, [dispatch])
	const media = useSelector(state => state.media.medias)
	// const id = media[0].lesson_id
	// const mediaId = media[0].id
	// const link = dispatch(fetchMedia({ id, mediaId }))
	// console.log(link)

	const loading = useSelector(state => state.media.loading)
	const error = useSelector(state => state.media.error)

	const handleFileChange = event => {
		setSelectedFile(event.target.files[0])
	}

	const handleUpload = async () => {
		if (type === 'image' && !selectedFile) {
			notification.warning({
				message: 'Media Warning',
				description: 'At first select file.',
			})
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
				console.log(res.payload.id)
				dispatch(selectMediaId(res.payload.id))
				setSelectedFile(null)
				setUrl('')
				setType('image')
				setCurrent(p => p + 1)
			})
			.catch(err => console.log(err))
	}
	// console.log(MAIN_URL + media[0].media_link)

	return (
		<>
			{!media.length >= 1 ? (
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
						<Button type='primary' onClick={handleUpload} loading={loading}>
							Upload
						</Button>
					</Form>
				</div>
			) : (
				<div className={styles.img}>
					<img src={`${IMG_URL}${media[0]?.media_link}`} alt='media image' />
				</div>
			)}
		</>
	)
}

export default Media
