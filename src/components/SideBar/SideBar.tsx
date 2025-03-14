import { useState } from 'react';
import styles from './SideBar.module.scss';

const SideBar = () => {
  const menuList = [
    'По проекту',
    'Объекты',
    'РД',
    'МТО',
    'СМР',
    'График',
    'МиМ',
    'Рабочие',
    'Капвложения',
    'Бюджет',
    'Финансирование',
    'Панорамы',
    'Камеры',
    'Поручения',
    'Контрагенты'
  ];
  const [active, setActive] = useState('СМР');
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHead}>
        <div className={styles.projectInfo}>
          <p className={styles.projectName}>Название проекта</p>
          <p className={styles.projectAbbrv}>Аббревиатура</p>
        </div>
        <i className={`bi bi-chevron-down ${styles.chevronDown}`}></i>
      </div>
      <div className={styles.sidebarMenu}>
        {menuList.map((item) => (
          <div
            className={`${styles.menuButton} ${active === item ? styles.activeTab : ''}`}
            key={item}
            onClick={() => setActive(item)}
          >
            <i className="bi bi-grid-1x2-fill"></i>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
