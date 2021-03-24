import React, { Component } from 'react';
import { Tag, Badge } from 'antd';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import { connect, history } from 'umi';
import { BellOutlined } from '@ant-design/icons';
import { downloadFileByUrl } from '@/utils';
import config from '../../../../config/defaultSettings';

// import HeaderDropdown from '../HeaderDropdown';
// import NoticeList from './NoticeList';

import styles from './index.less';

class NoticeIconView extends Component {
  refreshDownloadFilesFlag = -1;

  constructor(props) {
    super(props);
    this.state = {
      unreadNum: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      // TODO 待确认消息通知方案
      // dispatch({
      //   type: 'global/refreshDownloadFiles',
      // });
    }
    if ('WebSocket' in window) {
      // console.log(config)
      const socket = new WebSocket(`${config.wsUrl}/shdf/socket/admin`);

      socket.onopen = () => {
        // console.log('链接成功');
        // 处理一次消息请求
        dispatch({
          type: 'unReadMsg/getUnReadNum',
          payload: {
            id: 'admin',
          },
        });
      };
      socket.onmessage = msg => {
        if (msg.data.indexOf('登录') < 0 && msg.data.indexOf('连接') < 0) {
          const data = JSON.parse(msg.data);
          const { unreadNum } = data;
          this.setState({ unreadNum });
          // console.log(data,'sdfsdfsd');
        }
      };
      // socket.send('nihao')
    } else {
      // alertTip("该浏览器不支持WebSocket，请切换浏览器或升级后再试");
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
    // const { downloadFiles = [] } = this.props;
    // const count = downloadFiles.length;

    // spinning={refreshDownloadFiles}
    // const notificationBox = () => (
    //   <>
    //     <Spin spinning={false} delay={500}>
    //       {/* <Tabs className={styles.tabs}>
    //         <Tabs.TabPane tab="导出文件" key="exportFiles">
    //           <NoticeList
    //             data={downloadFiles}
    //             clearText="删除全部"
    //             onClick={this.downloadExportFile}
    //             onClear={this.deleteAllFiles}
    //           />
    //         </Tabs.TabPane>
    //         <Tabs.TabPane tab="未读消息" key="systemMessage">
    //           <NoticeList />
    //         </Tabs.TabPane>
    //       </Tabs> */}
    //     </Spin>
    //   </>
    // );

    const goDetail = () => {
      history.push(`/system-mgt/unread-msg`);
    };

    return (
      // <HeaderDropdown
      //   placement="bottomRight"
      //   overlay={notificationBox}
      //   overlayClassName={styles.popover}
      //   trigger={['click']}

      // >
      <>
        <span className={styles.notice} onClick={goDetail}>
          <Badge count={this.state.unreadNum} className={styles.badge}>
            <BellOutlined className={styles.bell} />
          </Badge>
        </span>
      </>
    );
  }
}

export default connect(({ global, loading }) => ({
  filesStatus: global.filesStatus, // 导出中：0， 导出完成： 1
  downloadFiles: global.downloadFiles,
  refreshDownloadFiles: loading.effects['global/refreshDownloadFiles'],
}))(NoticeIconView);
