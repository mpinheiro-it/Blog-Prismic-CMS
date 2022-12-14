import Link from 'next/link';
import commonStyles from '../../styles/common.module.scss';
import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={commonStyles.containerCenter}>
        <Link href="/">
          <img src="/logo.png" alt="logo" />
        </Link>
      </div>
    </header>
  )
}
