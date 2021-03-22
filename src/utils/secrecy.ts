import { message } from 'antd';

export const getSecrecyRowClassName = item => {
  if (item && !item.isSecrecyData) {
    message.warning({
      key: 'dataError',
      content: '部分数据完整性异常，已标出，请注意辨别',
      duration: 3,
    });

    setTimeout(() => {
      message.destroy('dataError');
    }, 3000);

    return 'secrecyDataWarningRow';
  }

  return '';
};
