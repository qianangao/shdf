import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { connect } from 'umi';
import { getCookie, USER_ORG_ID } from '@/utils/cookie';

/**
 * 单位多选组件
 * @param param0 出入参格式为： [{ name, id }]
 */
const OrgSelectInput = ({ value, dispatch, optionType = '2', onChange }) => {
  const [actionData, setActionData] = useState([]);
  const [valueName, setValueName] = useState([]);

  const getAssignedOrganization = () => {
    new Promise(resolve => {
      dispatch({
        type: 'global/getOrganization',
        payload: { orgId: getCookie(USER_ORG_ID) },
        resolve,
      });
    }).then(res => {
      const arr = [];
      res.forEach(item => {
        arr.push({ key: item.orgId, title: item.orgName });
      });
      setActionData(arr);
    });
    return () => {
      setActionData([]);
    };
  };

  const getCoOrganizerOrganization = () => {
    new Promise(resolve => {
      dispatch({
        type: 'global/getCoOrganizerOrganization',
        payload: { orgId: getCookie(USER_ORG_ID) },
        resolve,
      });
    }).then(res => {
      const arr = [];
      res.forEach(item => {
        if (item.orgId !== getCookie(USER_ORG_ID))
          arr.push({ key: item.orgId, title: item.orgName });
      });
      setActionData(arr);
    });
    return () => {
      setActionData([]);
    };
  };

  useEffect(() => {
    setActionData([]);
    setValueName([]);
    if (optionType === '1') {
      getAssignedOrganization();
    } else if (optionType === '2') {
      getCoOrganizerOrganization();
    }
  }, [optionType]);

  useEffect(() => {
    if (value && value.length > 0) {
      const nameArr: any[] = [];
      value.forEach(item => {
        nameArr.push(`${item.id}#*1!1*#${item.name}`);
      });
      setValueName(nameArr);
    } else {
      setValueName([]);
    }
  }, [value]);

  function handleChange(values) {
    const orgArr = [];
    values &&
      values.forEach(item => {
        const id = item.split('#*1!1*#')[0];
        const name = item.split('#*1!1*#')[1];
        orgArr.push({
          id,
          name,
        });
      });
    onChange && onChange(orgArr);
  }

  const singleChange = values => {
    const id = values.split('#*1!1*#')[0];
    const name = values.split('#*1!1*#')[1];
    onChange &&
      onChange([
        {
          id,
          name,
        },
      ]);
  };

  return (
    <>
      {optionType && optionType === '1' ? (
        <Select allowClear placeholder="请选择单位" onChange={singleChange} value={valueName}>
          {actionData &&
            actionData.map(item => (
              <Select.Option key={item.key} value={`${item.key}#*1!1*#${item.title}`}>
                {item.title}
              </Select.Option>
            ))}
        </Select>
      ) : (
        <Select
          allowClear
          placeholder="请选择单位"
          mode="multiple"
          onChange={handleChange}
          value={valueName}
        >
          {actionData &&
            actionData.map(item => (
              <Select.Option key={item.key} value={`${item.key}#*1!1*#${item.title}`}>
                {item.title}
              </Select.Option>
            ))}
        </Select>
      )}
    </>
  );
};

export default connect(() => ({}))(OrgSelectInput);
