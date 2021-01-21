import { getMenuData, getPageTitle, MenuDataItem } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, connect, ConnectProps } from 'umi';
import React from 'react';

import BasicFooter from './BasicFooter';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

export type UserLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  title?: string;
} & Partial<ConnectProps>;

const UserLayout: React.FC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
    formatMessage({ id }) {
      const titleRoute = Object.values(breadcrumb).find(item => id === item.locale);
      return titleRoute && titleRoute.remark;
    },
  });

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>{props.title}</span>
              </Link>
            </div>
            {/* <div className={styles.desc}>{props.description}</div> */}
          </div>
          {children}
        </div>
        <BasicFooter />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
