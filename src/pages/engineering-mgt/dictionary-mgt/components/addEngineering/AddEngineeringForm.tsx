import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const AddEngineeringForm = ({ dispatch, form, visible }) => {
  // const [actionList, setActionList] = useState([]);
  // const [actionData, setActionData] = useState([]);
  // const [historyData, setHistoryData] = useState([]);
  // const [idVisible, setIdVisible] = useState(true);

  useEffect(() => {
    new Promise(resolve => {
      dispatch({
        type: 'specialAction/getSpecialActionTree',
        resolve,
      });
    }).then(res => {
      setActionList(res);
      const arr = [];
      res.forEach(item => {
        arr.push({ key: item.key, title: item.title });
      });
      setActionData(arr);
      setHistoryData([]);
    });
    return () => {
      setActionData([]);
      setHistoryData([]);
    };
  }, []);

  const formItems = [
    {
      label: '工程名称',
      name: 'enginerringName',
      span: 2,
      visible: !visible,
      rules: [
        { required: true, message: '请输入工程名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '工程编号',
      name: 'enginerringId',
      span: 2,
      visible: !visible,
      rules: [
        { required: true, message: '请输入工程编号!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '开始日期',
      name: 'startDate',
      span: 2,
      rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
      visible,
    },
    {
      label: '截止日期',
      name: 'endDate',
      span: 2,
      rules: [{ required: true, message: '请选择结束日期!' }],
      type: 'date',
      visible,
    },
    {
      label: '联系人',
      name: 'enginerringName',
      span: 2,
      rules: [
        { required: true, message: '请输入联系人!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '联系电话',
      name: 'enginerringName',
      span: 2,
      rules: [
        { required: true, message: '请输入联系电话!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      span: 2,
      rules: [{ required: true, message: '请选择保密等级' }],
      enumsLabel: 'subject_secrecy_level',
    },

    // { name: 'segmentation', type: 'segmentation' },
    {
      label: '工程描述',
      name: 'actionDescription',
      span: 4,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
      type: 'textarea',
    },

    {
      label: '牵头省份',
      name: 'enginerringName',
      span: 2,
      visible: !visible,
      rules: [
        { required: true, message: '请输入牵头省份!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '省份列表',
      name: 'specialTaskFeedbackList',
      span: 4,
      visible: !visible,
      // rules: [{ required: true, message: '请输入!' }],
      // render: (
      //   <SummaryFeedbackTable
      //     visible={visible}
      //     ref={feedRef}
      //     onChange={onChange}
      //     value={tableData}
      //     add
      //   />
      // ),
    },
    {
      label: '附件列表',
      name: 'fileIds',
      span: 4,
      type: 'upload',
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

AddEngineeringForm.useForm = AdvancedForm.useForm;

export default connect(() => ({}))(AddEngineeringForm);
