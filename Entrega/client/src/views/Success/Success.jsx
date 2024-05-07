import { Link } from 'react-router-dom'
import styles from './Success.module.css'

const Cancelled = () => {
  return (
    <div>
        <Link to="/home" className={styles.button}>
          Inicio
        </Link>
      <div className={styles.body}>

        <div className={styles.card}>
          <div className={styles.circle}>
            <i className={styles.checkmark}>✓</i>
          </div>
          <h1 className={styles.success}>Exitoso</h1>
          <p className={styles.text}>
            Pago realizado con
            <br /> exito!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Cancelled
