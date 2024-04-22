import { motion } from 'framer-motion'
import styles from './MyModal.module.css'
const MyModal = ({ children, setModalOpen }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className={styles.modal}
		>
			<div className={styles.content}>{children}</div>
			<div className={styles.dark} onClick={() => setModalOpen(false)}></div>
		</motion.div>
	)
}

export default MyModal
