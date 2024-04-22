import styles from './Error.module.css'
const Error = ({ error }) => {
	return (
		<div className={styles.error}>
			<p>Error: {error}</p>
		</div>
	)
}

export default Error
