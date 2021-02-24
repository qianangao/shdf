import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { message, Modal } from 'antd';
import OrgInfoForm from './form/AuthorizeForm';

const AddModal = ({ dispatch, actionRef, loading, caseMgt }) => {
  const [form] = OrgInfoForm.useForm();
  const [orgInfoData, setOrgInfoData] = useState(null);
  const [authorizeModalVisible, setModalVisible] = useState(false);
  const { authorizeData } = caseMgt;
  const showModal = items => {
    setOrgInfoData(items || null);

    // 获取详情
    dispatch({
      type: 'caseMgt/getAuthorize',
      payload: {
        id: items.caseId,
      },
    });
    setModalVisible(true);
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
    setModalVisible(false);
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
            message.error('请选择你要授权的人！');
          } else {
            const params = values.staff.map(item => {
              return {
                empowerTargetUser: item.id,
                caseDeptId: 700, // 部门id
              };
            });
            // console.log(params,'values----0')
            dispatch({
              type: `caseMgt/authorize`,
              payload: {
                params,
                id: orgInfoData.caseId,
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
      title="授权"
      centered
      width={580}
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={authorizeModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <OrgInfoForm form={form} orgInfoData={authorizeData} />
    </Modal>
  );
};

export default connect(({ caseMgt, loading }) => ({
  caseMgt,
  loading: loading.models.caseMgt,
}))(AddModal);
