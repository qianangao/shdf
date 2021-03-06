import React, { useState, useEffect } from 'react';
import { connect, useLocation } from 'umi';
import { Descriptions, Modal, Spin } from 'antd';
import { formatDateStr } from '@/utils/format';
import ProTable from '@ant-design/pro-table';
import ProcessInfo from '../../process/ProcessInfo';

const useQuery = () => new URLSearchParams(useLocation().search);
const DetailModal = ({
  dispatch,
  actionRef,
  loading,
  clueDetailData,
  enums,
  cueAssociationList,
}) => {
  const query = useQuery();
  const [clueId, setClueId] = useState(undefined);
  const [circulationId, setCirculationId] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (id: any, sourceClueId: any) => {
    setClueId(id);
    setCirculationId(sourceClueId);
    setModalVisible(true);
    dispatch({
      type: 'emClueManagement/getClueDetail',
      payload: { clueId: id },
    });
    dispatch({
      type: 'emClueManagement/getCueAssociation',
      payload: { clueId: id },
    });
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }

    if (
      query.get('type') === 'modify' &&
      query.get('id') &&
      (query.get('status') === '0' || query.get('status') === '-1')
    ) {
      showModal(query.get('id'), clueDetailData.sourceClueId);
    }
  }, []);

  const hideModal = (): void => {
    setClueId(undefined);
    setCirculationId(undefined);
    dispatch({
      type: 'emClueManagement/removeProcessDetail',
    });
    dispatch({
      type: 'emClueManagement/removeClueDetail',
    });
    dispatch({
      type: 'emClueManagement/removeClueAssociation',
    });

    setModalVisible(false);
  };

  const handleOk = (): void => {
    hideModal();
  };

  const fileList = (files: any[]) => {
    if (files && files.length > 0) {
      const views = files.map(item => {
        return (
          <div style={{ display: 'block', whiteSpace: 'nowrap', width: '100%' }}>
            {' '}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', width: '70%', paddingBottom: 5 }}
            >
              {item.fileName}
            </a>
            <div style={{ width: '30%', display: 'inline-block', textAlign: 'center' }}>
              {formatDateStr(item.createTime, 'YYYY???MM???DD??? HH:mm')}
            </div>
          </div>
        );
      });

      return (
        <Descriptions.Item label="????????????">
          <div style={{ marginBottom: 20 }}>{views}</div>
        </Descriptions.Item>
      );
    }
    return <div style={{ marginBottom: 20 }} />;
  };

  const columns = [
    {
      title: '??????',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    {
      title: '????????????',
      dataIndex: 'clueNumber',
      align: 'center',
      width: 140,
      hideInSearch: true,
    },

    {
      title: '????????????',
      align: 'center',
      dataIndex: 'clueName',
    },
    {
      title: '????????????',
      align: 'center',
      dataIndex: 'clueType',
      hideInSearch: true,
      valueEnum: enums.clue_type,
    },
    {
      title: '????????????/??????/??????',
      align: 'center',
      dataIndex: 'reportedObjectName',
      hideInSearch: true,
    },
    {
      title: '????????????',
      align: 'center',
      dataIndex: 'region',
      hideInSearch: true,
    },
  ];

  return (
    <Modal
      title="????????????"
      centered
      width="90vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modalVisible}
      onOk={handleOk}
      destroyOnClose
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <Spin spinning={loading}>
        <Descriptions
          title="????????????"
          column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
          style={{ marginBottom: 30 }}
        >
          <Descriptions.Item label="????????????">{clueDetailData.clueName}</Descriptions.Item>
          <Descriptions.Item label="????????????">
            {formatDateStr(clueDetailData.createTime, 'YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="??????">{clueDetailData.clueRemarks}</Descriptions.Item>
          <Descriptions.Item label="????????????">{clueDetailData.clueNumber}</Descriptions.Item>
          <Descriptions.Item label="????????????">
            {enums.clue_type && enums.clue_type[clueDetailData.clueType]}
          </Descriptions.Item>
          <Descriptions.Item label="????????????">{clueDetailData.clueNumber}</Descriptions.Item>
          <Descriptions.Item label="????????????">
            {enums.clue_source && enums.clue_source[clueDetailData.clueSource]}
          </Descriptions.Item>
          <Descriptions.Item label="????????????">
            {enums.clue_importance && enums.clue_importance[clueDetailData.importance]}
          </Descriptions.Item>
          <Descriptions.Item label="????????????">
            {enums.object_secrecy_level && enums.object_secrecy_level[clueDetailData.secrecyLevel]}
          </Descriptions.Item>
          <Descriptions.Item label="????????????">
            {enums.urgent_level && enums.urgent_level[clueDetailData.urgency]}
          </Descriptions.Item>
          <Descriptions.Item label="????????????">
            {formatDateStr(clueDetailData.receivingTime, 'YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="????????????">{clueDetailData.region}</Descriptions.Item>
          <Descriptions.Item label="???????????????">
            {clueDetailData.relatedPublications}
          </Descriptions.Item>
          {/* <Descriptions.Item label="????????????" span={3}>
            {clueDetailData.clueRemarks}
          </Descriptions.Item> */}
        </Descriptions>
        <Descriptions
          title="????????????"
          column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
          style={{ marginBottom: 30 }}
        >
          <Descriptions.Item label="???????????????">{clueDetailData.reportName}</Descriptions.Item>
          <Descriptions.Item label="???????????????">
            {enums.dict_sex && enums.dict_sex[clueDetailData.reportSex]}
          </Descriptions.Item>
          <Descriptions.Item label="???????????????">{clueDetailData.reportAddress}</Descriptions.Item>
          <Descriptions.Item label="???????????????">{clueDetailData.reportMailbox}</Descriptions.Item>
          <Descriptions.Item label="???????????????">{clueDetailData.reportPhone}</Descriptions.Item>
          <Descriptions.Item label="???????????????">{clueDetailData.reportPostcode}</Descriptions.Item>
          <Descriptions.Item label="?????????????????????">
            {clueDetailData.reportedObjectName}
          </Descriptions.Item>
          <Descriptions.Item label="?????????????????????">
            {enums.clue_reported_object_type &&
              enums.clue_reported_object_type[clueDetailData.reportedObjectType]}
          </Descriptions.Item>
          <Descriptions.Item label="??????????????????">
            {clueDetailData.reportedObjectPhone}
          </Descriptions.Item>
          <Descriptions.Item label="?????????????????????">
            {clueDetailData.reportedObjectAddress}
          </Descriptions.Item>
          <Descriptions.Item label="????????????" span={3}>
            {clueDetailData.reportContent}
          </Descriptions.Item>
          <Descriptions.Item label="????????????" span={3}>
            {clueDetailData.open === 0 ? '???' : '???'}
          </Descriptions.Item>
          {fileList(clueDetailData.fileList)}
        </Descriptions>

        {cueAssociationList && cueAssociationList.length > 0 && (
          <>
            <Descriptions title="??????????????????" />
            <ProTable
              search={false}
              toolBarRender={false}
              pagination={false}
              rowKey="clueId"
              scroll={{ x: 'max-content' }}
              dataSource={cueAssociationList}
              columns={columns}
              style={{ marginBottom: 30 }}
            />
          </>
        )}

        <ProcessInfo clueId={clueId} circulationId={circulationId} title="????????????????????????" />
      </Spin>
    </Modal>
  );
};

export default connect(({ loading, emClueManagement, global }) => ({
  loading: loading.models.emClueManagement,
  clueDetailData: emClueManagement.clueDetailData,
  cueAssociationList: emClueManagement.cueAssociationList,
  enums: global.enums,
}))(DetailModal);
