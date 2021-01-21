import React, { Component } from 'react';
import { Tag, Badge, Spin, Tabs } from 'antd';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import { connect } from 'umi';
import { BellOutlined } from '@ant-design/icons';
import { downloadFileByUrl } from '@/utils';

import HeaderDropdown from '../HeaderDropdown';
import NoticeList from './NoticeList';

import styles from './index.less';

class NoticeIconView extends Component {
  refreshDownloadFilesFlag = -1;

  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'global/refreshDownloadFiles',
      });
    }
  }

  UNSAFE_componentWillUpdate() {
    const { dispatch, filesStatus } = this.props;

    if (this.refreshDownloadFilesFlag > -1) {
      clearTimeout(this.refreshDownloadFilesFlag);
      this.refreshDownloadFilesFlag = -1;
    }

    // 状态为导出中重新刷新
    if (dispatch && filesStatus === 0) {
      this.refreshDownloadFilesFlag = setTimeout(() => {
        dispatch({
          type: 'global/refreshDownloadFiles',
        });
      }, 500);
    }
  }

  changeReadState = clickedItem => {
    const { id } = clickedItem;
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'global/changeNoticeReadState',
        payload: id,
      });
    }
  };

  getNoticeData = () => {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  };

  downloadExportFile = item => {
    if (item.status === 1) {
      downloadFileByUrl(item.fileUrl, item.fileName).then(_ => {
        this.deleteFilesById(item.id);
      });
    } else if (item.status === 2) {
      this.deleteFilesById(item.id);
    }
  };

  deleteFilesById = id => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'global/deleteDownloadFiles',
        payload: {
          ids: [id],
        },
      });
    }
  };

  deleteAllFiles = () => {
    const { dispatch, downloadFiles = [] } = this.props;
    if (dispatch) {
      const deleteIds = downloadFiles.map(file => file.id);
      dispatch({
        type: 'global/deleteDownloadFiles',
        payload: {
          ids: deleteIds,
        },
      });
    }
  };

  render() {
    const { downloadFiles = [] } = this.props;
    const count = downloadFiles.length;
    // spinning={refreshDownloadFiles}
    const notificationBox = () => (
      <>
        <Spin spinning={false} delay={500}>
          <Tabs className={styles.tabs}>
            <Tabs.TabPane tab="导出文件" key="exportFiles">
              <NoticeList
                data={downloadFiles}
                clearText="删除全部"
                onClick={this.downloadExportFile}
                onClear={this.deleteAllFiles}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="系统消息" key="systemMessage">
              <NoticeList />
            </Tabs.TabPane>
          </Tabs>
        </Spin>
      </>
    );

    return (
      <HeaderDropdown
        placement="bottomRight"
        overlay={notificationBox}
        overlayClassName={styles.popover}
        trigger={['click']}
      >
        <span className={styles.notice}>
          <Badge count={count} className={styles.badge}>
            <BellOutlined className={styles.bell} />
          </Badge>
        </span>
      </HeaderDropdown>
    );
  }
}

export default connect(({ global, loading }) => ({
  filesStatus: global.filesStatus, // 导出中：0， 导出完成： 1
  downloadFiles: global.downloadFiles,
  refreshDownloadFiles: loading.effects['global/refreshDownloadFiles'],
}))(NoticeIconView);
