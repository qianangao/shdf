import React, { useState, useEffect } from 'react';
import { connect, useLocation } from 'umi';
import { Descriptions, Modal, Spin } from 'antd';
import { formatDateStr } from '@/utils/format';
import DetailInfoForm from './DetailInfoForm';

const useQuery = () => new URLSearchParams(useLocation().search);
const ModifyModal = ({ dispatch, actionRef, loading, announcementData, enums }) => {
  const query = useQuery();
  const [form]: any = DetailInfoForm.useForm();
  const [noticeId, setNoticeId] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [type, setType] = useState('publish');
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleRange, setVisibleRange] = useState([]);

  const showModal = (id: any, state: any, t: any) => {
    setType(t);
    setNoticeId(id);
    setStatus(state);
    setModalVisible(true);
    if (t === 'receive') {
      dispatch({
        type: 'soAnnouncementMgt/getReceiveDetail',
        payload: { readingId: id },
      });
    } else {
      dispatch({
        type: 'soAnnouncementMgt/getAnnouncementDetail',
        payload: { noticeId: id },
      });
    }
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }

    // @ts-ignore
    if (query.get('type') === 'modify' && query.get('id') && query.get('stateCode') === '1') {
      showModal(announcementData.readingId, announcementData.readingState, 'receive');
    }
  }, []);

  useEffect(() => {
    if (announcementData) {
      const range = announcementData.visibleRange && JSON.parse(announcementData.visibleRange);
      const names =
        range &&
        range.map((item: { realName: string }) => {
          return item.realName;
        });
      setVisibleRange(names && names.join(',  '));
      // announcementData.visibleRange = names && names.join(',  ');
    }
  }, [announcementData]);

  const hideModal = (): void => {
    dispatch({
      type: 'soAnnouncementMgt/removeAnnouncementDetail',
    });
    setModalVisible(false);
    form.resetFields();
    setNoticeId(undefined);
    setStatus(undefined);
    setVisibleRange([]);
  };

  const handleOk = (): void => {
    type === 'examine'
      ? form
          .validateFields()
          .then((values: any) => {
            delete values.auditUser;
            return new Promise(resolve => {
              dispatch({
                type: `soAnnouncementMgt/auditAnnouncement`,
                payload: {
                  ...values,
                  noticeId,
                },
                resolve,
              });
            });
          })
          .then(() => {
            hideModal();
          })
          .catch((info: any) => {
            console.error('Validate Failed:', info);
          })
      : hideModal();
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
        <Descriptions.Item label="????????????" span={3}>
          <div style={{ marginBottom: 20 }}>{views}</div>
        </Descriptions.Item>
      );
    }
    return <div style={{ marginBottom: 20 }} />;
  };

  const createItem = () => {
    if (type === 'publish') {
      switch (status) {
        case -3:
          return [
            <Descriptions title="????????????" column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}>
              <Descriptions.Item label="?????????">{announcementData.createUser}</Descriptions.Item>
              <Descriptions.Item label="????????????">
                {formatDateStr(announcementData.createTime, 'YYYY???MM???DD??? HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="?????????">{announcementData.publishUser}</Descriptions.Item>
              <Descriptions.Item label="????????????">
                {formatDateStr(announcementData.publishTime, 'YYYY???MM???DD??? HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="?????????">{announcementData.createUser}</Descriptions.Item>
              <Descriptions.Item label="????????????">
                {formatDateStr(announcementData.createTime, 'YYYY???MM???DD??? HH:mm')}
              </Descriptions.Item>
            </Descriptions>,
          ];
        case -1:
        case 3:
          return [
            <Descriptions title="????????????" column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}>
              <Descriptions.Item label="?????????">{announcementData.createUser}</Descriptions.Item>
              <Descriptions.Item label="????????????">
                {formatDateStr(announcementData.createTime, 'YYYY???MM???DD??? HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="????????????">
                {announcementData.secrecyLevel}
              </Descriptions.Item>
              <Descriptions.Item label="????????????" span={3}>
                {announcementData.createUser}
              </Descriptions.Item>
            </Descriptions>,
          ];
        case 7:
          return [
            <Descriptions title="????????????" column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}>
              <Descriptions.Item label="?????????">{announcementData.createUser}</Descriptions.Item>
              <Descriptions.Item label="????????????">
                {formatDateStr(announcementData.createTime, 'YYYY???MM???DD??? HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="?????????">{announcementData.publishUser}</Descriptions.Item>
              <Descriptions.Item label="????????????">
                {formatDateStr(announcementData.publishTime, 'YYYY???MM???DD??? HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="?????????">{announcementData.createUser}</Descriptions.Item>
              <Descriptions.Item label="????????????">
                {formatDateStr(announcementData.createTime, 'YYYY???MM???DD??? HH:mm')}
              </Descriptions.Item>
            </Descriptions>,
          ];
        default:
          return [];
      }
    }
    return [];
  };

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
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <Spin spinning={loading}>
        <Descriptions title="????????????" column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}>
          <Descriptions.Item label="????????????" span={3}>
            {announcementData.noticeTitle}
          </Descriptions.Item>
          <Descriptions.Item label="??????????????????">
            {formatDateStr(announcementData.createTime, 'YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="????????????">
            {enums.object_secrecy_level &&
              enums.object_secrecy_level[announcementData.secrecyLevel]}
          </Descriptions.Item>
          <Descriptions.Item label="????????????" span={1}>
            {announcementData.publishDept}
          </Descriptions.Item>
          <Descriptions.Item label="??????????????????" span={3}>
            {visibleRange}
          </Descriptions.Item>
          <Descriptions.Item label="????????????" span={3}>
            <div
              dangerouslySetInnerHTML={{
                __html: announcementData.noticeContent,
              }}
            />
          </Descriptions.Item>
          {fileList(announcementData.files)}
        </Descriptions>
        {createItem()}
        {type === 'publish' && status === 7 && (
          <Descriptions
            title="??????????????????"
            column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}
            style={{ marginTop: 30 }}
          >
            <div>??????</div>
          </Descriptions>
        )}
        {type === 'examine' && (
          <>
            <Descriptions title="??????????????????" style={{ marginTop: 30 }} />
            <DetailInfoForm form={form} />
          </>
        )}
        {type === 'receive' && announcementData.readingState === 1 && (
          <Descriptions
            title="????????????"
            column={{ xxl: 4, xl: 3, lg: 2 }}
            style={{ marginTop: 30 }}
          >
            <Descriptions.Item label="????????????" span={3}>
              {formatDateStr(announcementData.replyTime, 'YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="????????????" span={3}>
              <div
                style={{
                  border: '1px solid #f2f2f2',
                  padding: '5px 10px',
                  width: '100%',
                  minHeight: 80,
                }}
              >
                {announcementData.replyContent}
              </div>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Spin>
    </Modal>
  );
};

export default connect(({ loading, soAnnouncementMgt, global }) => ({
  loading: loading.models.soAnnouncementMgt,
  announcementData: soAnnouncementMgt.announcementData,
  enums: global.enums,
}))(ModifyModal);
