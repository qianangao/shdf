import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { message, Modal } from 'antd';
import OrgInfoForm from './DistributeForm';

const AddModal = ({ readModalVisible, dispatch, actionRef, loading, caseMgt }) => {
  const [form] = OrgInfoForm.useForm();
  const [orgInfoData, setOrgInfoData] = useState(null);
  const { receivingDetailData } = caseMgt;
  const showModal = items => {
    setOrgInfoData(items || null);
    // 获取详情
    dispatch({
      type: 'caseMgt/getDetail',
      payload: {
        id: items.receiptId,
      },
    });
    dispatch({
      type: 'caseMgt/save',
      payload: {
        readModalVisible: true,
      },
    });
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    dispatch({
      type: 'caseMgt/save',
      payload: {
        readModalVisible: false,
      },
    });
    setOrgInfoData(null);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          // 处理数据
          // 请选择你要分发传阅的人
          if (
            !values ||
            !values.staff ||
            values.staff === 'undefined' ||
            values.staff.length <= 0
          ) {
            message.error('请选择你要分发传阅的人！');
          } else {
            const params = values.staff.map(item => {
              return {
                readingAccount: item.id,
                readingOrg: '',
              };
            });
            // console.log(receivingDetailData,'values----0')
            dispatch({
              type: `caseMgt/distribute`,
              payload: {
                params,
                id: receivingDetailData.receiptId,
              },
              resolve,
            });
          }
        });
      })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="分发传阅"
      centered
      width={580}
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={readModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <OrgInfoForm form={form} orgInfoData={orgInfoData} />
    </Modal>
  );
};

export default connect(({ caseMgt, loading }) => ({
  caseMgt,
  readModalVisible: caseMgt.readModalVisible,
  loading: loading.models.caseMgt,
}))(AddModal);
