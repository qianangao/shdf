import React, { useState, useEffect } from 'react';
import { Button, Table, Popconfirm, Modal, Radio } from 'antd';
// import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const SummaryFeedbackTable = ({
  dispatch,
  visible,
  feedListData,
  disabled,
  onChange,
  select = false,
  add = false,
}) => {
  // const { visible, feedListData, disabled,,onChange,add } = props
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  // const [selectData, setSelectData] = useState([]);
  useEffect(() => {
    if (add) {
      setDataSource([]);
    }
    // else if (feed){
    //   setDataSource([...value])
    // }
    else {
      setDataSource([...feedListData]);
    }
  }, [feedListData]);
  // const [arr, setArr] = useState([]);
  const [form] = AdvancedForm.useForm();
  const [id, setId] = useState(1);
  //   const { tableRef } = specialAction;
  // 通过forwardRef转发ref到DOM
  // 使用useImperativeHandle自定义ref暴露
  // useImperativeHandle(refInstance,()=>({
  //   handleQuery
  // }))

  // // 需要暴露的函数
  // const handleQuery=()=>{
  //   return dataSource
  // }

  const confirmDelete = ids => {
    const data = dataSource;
    data.forEach(item => {
      if (item.id === ids) {
        data.splice(ids - 1, 1);
        setDataSource([...data]);
      }
    });
  };
  const handleSelect = ids => {
    const data = dataSource;
    data.forEach(item => {
      if (item.feedbackId === ids) {
        const arr = [];
        arr.push(item);
        onChange && onChange(arr);
        dispatch({
          type: `specialAction/selectFeedbackData`,
          payload: arr,
        });
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
      const arr = [];
      arr.push(values);
      setDataSource([...dataSource, ...arr]);
      onChange && onChange([...dataSource, ...arr]);
    });
    handleCancel();
  };

  const formItems = [
    {
      label: '名称',
      name: 'feedbackName',
      span: 2,
      rules: [
        { required: true, message: '请输入名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '反馈类型',
      name: 'feedbackType',
      span: 2,
      rules: [{ required: true, message: '请选择!' }],
      render: (
        <Radio.Group>
          <Radio value="0">总反馈</Radio>
          <Radio value="1">阶段反馈</Radio>
        </Radio.Group>
      ),
    },
    {
      label: '开始日期',
      name: 'startDate',
      span: 2,
      rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
    },
    {
      label: '截止日期',
      name: 'endDate',
      span: 2,
      rules: [{ required: true, message: '请选择截止日期!' }],
      type: 'date',
    },
    {
      label: '反馈要求',
      name: 'feedbackRequire',
      span: 4,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
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
    // { title: '序号', align: 'center', dataIndex: 'id', hideInSearch: true },
    { title: '名称', align: 'center', dataIndex: 'feedbackName' },
    { title: '反馈类型', align: 'center', dataIndex: 'feedbackType' },
    { title: '开始日期', align: 'center', dataIndex: 'startDate' },
    { title: '截止日期', align: 'center', dataIndex: 'endDate' },
    { title: '反馈要求', align: 'center', dataIndex: 'feedbackRequire' },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      // visible:false,
      render: (dom, data, index) => [
        <Popconfirm
          title="你确定要删除该反馈要求吗？"
          onConfirm={() => confirmDelete(index + 1)}
          okText="是"
          cancelText="否"
        >
          <Button type="link" size="small">
            {/*  disabled={!add} */}
            {add && '删除'}
          </Button>
        </Popconfirm>,
        <Button type="link" size="small" onClick={() => handleSelect(data.feedbackId)}>
          {select && '选择'}
        </Button>,
      ],
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
      <Table dataSource={dataSource} columns={columns} rowKey="taskId" />
      <Modal
        title="阶段反馈要求"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width="40vw"
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
  feedListData: specialAction.feedListData,
  specialAction,
}))(SummaryFeedbackTable);