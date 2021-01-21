import { Tag, List, Empty } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import React from 'react';
import classNames from 'classnames';
import styles from './NoticeList.less';

const NoticeList = ({
  data = [],
  onClick,
  onClear,
  onViewMore,
  emptyText,
  showClear = true,
  clearText,
  viewMoreText,
  showViewMore = false,
}) => {
  if (data.length === 0) {
    return (
      <div className={styles.notFound}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyText} />
      </div>
    );
  }
  return (
    <div>
      <List
        className={styles.list}
        dataSource={data}
        renderItem={(item, i) => {
          const itemCls = classNames(styles.item, {
            [styles.read]: item.read,
          });

          const leftIcon = <FileExcelOutlined className={styles.leftIcon} />;

          const StatusLabel = ({ status }) => {
            if (status === 0) {
              return <Tag color="gold">导出中...</Tag>;
            }
            if (status === 1) {
              return <Tag color="green">导出成功</Tag>;
            }
            if (status === 2) {
              return <Tag color="red">导出失败</Tag>;
            }

            return null;
          };

          return (
            <List.Item
              className={itemCls}
              key={item.key || i}
              onClick={() => onClick && onClick(item)}
            >
              <List.Item.Meta
                className={styles.meta}
                avatar={leftIcon}
                title={
                  <div className={styles.title}>
                    {item.fileName}
                    <div className={styles.extra}>
                      <StatusLabel status={item.status} />
                    </div>
                  </div>
                }
                description={
                  <div>
                    <div className={styles.description}>{item.description}</div>
                    <div className={styles.datetime}>{item.datetime}</div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
      <div className={styles.bottomBar}>
        {showClear ? <div onClick={onClear}>{clearText}</div> : null}
        {showViewMore ? (
          <div
            onClick={e => {
              if (onViewMore) {
                onViewMore(e);
              }
            }}
          >
            {viewMoreText}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NoticeList;
