import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import OrgInfoForm from './form/ApplySuperviseForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = OrgInfoForm.useForm();
  const [applySuperviseModalVisible, setModalVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);

  const showModal = items => {
    // 获取详情
    if (items) {
      setDetailData(items);
    }
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
    form.resetFields();
  };

  const dateFormat = (date , fmtont = "YYYY-mm-dd HH:MM:SS" ) => {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    // eslint-disable-next-line guard-for-in
    for (const k in opt) {
      ret = new RegExp(`(${  k  })`).exec(fmtont);
      if (ret) {
        // eslint-disable-next-line no-param-reassign
        fmtont = fmtont.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmtont;
  }

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        values.id = detailData.caseId;
        const DateObj = new Date();
        values.superviseStart = dateFormat(DateObj);
        values.superviseEnd = `${DateObj.getFullYear() + 2  }-12-31 23:59:59`;
        values.approvalCompany = 7000;
        values.approvalUser = 7001;
        return new Promise(resolve => {
          dispatch({
            type: `caseMgt/applySupervise`,
            payload: {
              ...values,
            },
            resolve,
          });
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
      title="申请督办"
      centered
      width={580}
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={applySuperviseModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <OrgInfoForm form={form} />
    </Modal>
  );
};

export default connect(({ caseMgt, loading }) => ({
  caseMgt,
  loading: loading.models.caseMgt,
}))(ModifyModal);
