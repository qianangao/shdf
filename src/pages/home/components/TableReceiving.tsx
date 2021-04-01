import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect, history } from 'umi';
import { ProfileFilled } from '@ant-design/icons';
import moment from 'moment';
import { getSecrecyRowClassName } from '@/utils/secrecy';

const Table = ({ dispatch }) => {
  const formatterTime = val => {
    return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '';
  };

  const columns = [
    {
      title: '公文标题',
      dataIndex: 'documentTitle',
      align: 'center',
    },
    { title: '发布人', align: 'center', dataIndex: 'publishUser' },
    { title: '状态', align: 'center', dataIndex: 'readingState' },
    {
      title: '发布时间',
      align: 'center',
      dataIndex: 'publishTime',
      render: formatterTime,
    },
  ];

  const getDictList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'documentMgt/getReceiveList',
        payload: {
          ...params,
          isReading: 0,
        },
        resolve,
      });
    });

  const goDetail = (id, status) => {
    history.push(
      `/synergy-office/document-mgt/receive-management?id=${id}&type=modify&status=${status}`,
    );
  };

  return (
    <ProTable
      rowKey="id"
      onRow={record => {
        return {
          onClick: () => {
            goDetail(record.documentId, record.readingState);
          },
        };
      }}
      style={{ cursor: 'pointer' }}
      headerTitle={
        <div>
          <ProfileFilled style={{ color: '#6DA76C' }} /> 公文待阅
        </div>
      }
      size="small"
      search={false}
      rowClassName={getSecrecyRowClassName}
      options={false}
      pagination={{ simple: true, defaultPageSize: 10 }}
      request={async params => getDictList(params)}
      columns={columns}
    />
  );
};

export default connect(({ home, global }) => ({
  home,
  enums: global.enums,
}))(Table);
