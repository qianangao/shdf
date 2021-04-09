import React, { useState, useEffect } from 'react';
import { Button, Table, Popconfirm, Modal, message } from 'antd';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import './index.css';
import { getSecrecyRowClassName } from '@/utils/secrecy';

const SummaryFeedbackTable = ({ visible, summaryListData, disabled, onChange, add = false }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    if (add) {
      setDataSource([]);
    } else {
      setDataSource([...summaryListData]);
    }
  }, [summaryListData]);

  const [form] = AdvancedForm.useForm();
  const [id, setId] = useState(1);
  const confirmDelete = ids => {
    const data = dataSource;
    data.forEach(item => {
      if (item.id === ids) {
        data.splice(ids - 1, 1);
        setDataSource([...data]);
      }
    });
  };

  const addFeedback = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      setId(id + 1);
      values.id = id;
      values.feedbackType = '0';
      const arr = [];
      arr.push(values);
      setDataSource([...dataSource, ...arr]);
      onChange && onChange([...dataSource, ...arr]);
      message.success('新增反馈要求成功！');
      handleCancel();
    });
  };

  const checkStartDate = (rule, value, callback) => {
    const endValue = form.getFieldValue('endDate');
    if (endValue && endValue < value) {
      callback(new Error('开始日期应不晚于结束日期!'));
    } else {
      callback();
    }
  };
  const checkEndDate = (rule, value, callback) => {
    const startValue = form.getFieldValue('startDate');
    if (startValue && startValue > value) {
      callback(new Error('结束日期应不早于开始日期!'));
    } else {
      callback();
    }
  };

  const formItems = [
    {
      label: '名称',
      name: 'feedbackName',
      span: 4,
      rules: [
        { required: true, message: '请输入名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    // {
    //   label: '反馈类型',
    //   name: 'feedbackType',
    //   span: 4,
    //   rules: [{ required: true, message: '请选择反馈类型!' }],
    //   render: (
    //     <Radio.Group>
    //       <Radio value="0">总反馈</Radio>
    //       <Radio value="1">阶段反馈</Radio>
    //     </Radio.Group>
    //   ),
    // },
    {
      label: '开始日期',
      name: 'startDate',
      span: 4,
      rules: [
        { required: true, message: '请选择开始日期!' },
        {
          validator: checkStartDate,
        },
      ],
      type: 'date',
    },
    {
      label: '截止日期',
      name: 'endDate',
      span: 4,
      rules: [
        { required: true, message: '请选择截止日期!' },
        {
          validator: checkEndDate,
        },
      ],
      type: 'date',
    },
    {
      label: '反馈要求',
      name: 'feedbackRequire',
      span: 4,
      rules: [
        { required: true, message: '请新增反馈要求!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字!' },
      ],
      type: 'textarea',
    },
  ];

  const columns = [
    {
      title: '序号',
      render: (text, render, index) => `${index + 1}`,
      width: 64,
      align: 'center',
      dataIndex: 'id',
      key: 'id',
    },
    { title: '名称', align: 'center', dataIndex: 'feedbackName' },
    // {
    //   title: '反馈类型',
    //   align: 'center',
    //   dataIndex: 'feedbackType',
    //   render: text => <span>{text === '0' ? '总反馈' : '阶段反馈'}</span>,
    // },
    { title: '开始日期', align: 'center', dataIndex: 'startDate' },
    { title: '截止日期', align: 'center', dataIndex: 'endDate' },
    {
      title: '反馈要求',
      align: 'center',
      dataIndex: 'feedbackRequire',
      width: 200,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      className: add === true ? '' : 'notshow',
      render: (dom, data, index) => [
        <Popconfirm
          title="你确定要删除该反馈要求吗？"
          onConfirm={() => confirmDelete(index + 1)}
          okText="是"
          cancelText="否"
        >
          <Button type="link" size="small">
            {add && '删除'}
          </Button>
        </Popconfirm>,
        // <Button type="link" size="small" onClick={() => handleSelect(data.feedbackId)}>
        //   {select && '选择'}
        // </Button>,
      ],

      // render: (dom, data,index) => [
      //   <Popconfirm
      //     title="你确定要删除该反馈要求吗？"
      //     onConfirm={() => confirmDelete(index)}
      //     okText="是"
      //     cancelText="否"
      //   >
      //     <a key={`${data.id}del`}>
      //       {add && '删除'}
      //     </a>
      //   </Popconfirm>,
      //   <a key={`${data.id}sel`} onClick={() => handleSelect(data.feedbackId)}>
      //     {select && '选择'}
      //   </a>,
      // ],
    },
  ];

  return (
    <div>
      {visible && (
        <Button
          type="primary"
          onClick={() => addFeedback()}
          style={{ marginBottom: 8 }}
          disabled={disabled}
        >
          新增
        </Button>
      )}
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="taskId"
        rowClassName={getSecrecyRowClassName}
      />
      <Modal
        title="新增反馈要求"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width="580px"
        style={{ paddingBottom: 0 }}
        bodyStyle={{
          padding: '30px 60px',
        }}
        zIndex={3000}
      >
        <AdvancedForm fields={formItems} form={form} />
      </Modal>
    </div>
  );
};

export default connect(({ specialAction }) => ({
  summaryListData: specialAction.summaryListData,
  specialAction,
}))(SummaryFeedbackTable);
