import React from 'react';
import { Tabs } from 'antd';
import styles from './index.less';

/**
 * TypeSelectLayout
 * @param tabs 传值则展示tab切换，不传隐藏
 */
const TypeSelectLayout = ({ children, tabs = [], onTabChange, style = {}, type }) => {
  const onTabChangeHander = id => {
    onTabChange && onTabChange(id);
  };

  const TabView = (
    <Tabs onChange={onTabChangeHander} type={type}>
      {tabs && tabs.map(item => <Tabs.TabPane tab={item.label} key={item.id} />)}
    </Tabs>
  );

  return (
    <div className={styles.typeSelectLayout} style={style}>
      <nav className={styles.typeSelectNav}>{TabView}</nav>
      <section style={{ overflow: 'initial' }}>{children}</section>
    </div>
  );
};

export default TypeSelectLayout;
