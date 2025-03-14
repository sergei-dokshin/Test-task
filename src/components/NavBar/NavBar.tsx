import styles from './NavBar.module.scss';

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navButtonsGroup}>
        <div className={styles.navButton}>
          <i className="bi bi-grid"></i>
        </div>
        <div className={styles.navButton}>
          <i className="bi bi-arrow-90deg-left"></i>
        </div>
        <div
          className={styles.navButton}
          style={{ borderBottom: '3px solid var(--font-color-main)' }}
        >
          <p>Просмотр</p>
        </div>
        <div className={styles.navButton}>
          <p>Управление</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
