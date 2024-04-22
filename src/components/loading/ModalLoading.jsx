import styles from './ModalLoading.module.css'
const ModalLoading = ({ height }) => {
	return (
		<div className={styles.layout_loatder} style={{ height: `${height}px` }}>
			<div className={styles.loader}></div>
		</div>
	)
}

export default ModalLoading
