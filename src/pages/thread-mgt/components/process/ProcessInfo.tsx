import React, { useEffect } from 'react';
import { Descriptions, List } from 'antd';
import { connect } from 'umi';
import { formatDateStr } from '@/utils/format';

const ProcessInfo = ({ dispatch, clueId, circulationId, processListData, enums, title }) => {
  useEffect(() => {
    dispatch({
      type: 'emClueManagement/getProcessInfoList',
      payload: { clueId, circulationId },
    });
  }, [clueId]);

  const createDiv = (item: any) => {
    switch (item.circulationType) {
      case 1:
      case 2:
        return (
          <>
            <div style={{ width: '100%', justifyContent: 'start', display: 'flex', marginTop: 15 }}>
              <span style={{ marginTop: 5, whiteSpace: 'nowrap' }}>转办单位：</span>
              <span style={{ border: '1px solid #f2f2f2', padding: '5px 20px', width: '100%' }}>
                {item.targetUnit
                  .map((unit: string) => {
                    return JSON.parse(unit).name;
                  })
                  .join(' ,  ')}
              </span>
            </div>
            <div style={{ width: '100%', justifyContent: 'start', display: 'flex', marginTop: 15 }}>
              <span style={{ marginTop: 5, whiteSpace: 'nowrap' }}>转办要求：</span>
              <span
                style={{
                  border: '1px solid #f2f2f2',
                  padding: '5px 20px',
                  width: '100%',
                  minHeight: 60,
                }}
              >
                {item.circulationContent}
              </span>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div style={{ width: '100%', justifyContent: 'start', display: 'flex', marginTop: 15 }}>
              <span style={{ marginTop: 5, whiteSpace: 'nowrap' }}>工作内容：</span>
              <span
                style={{
                  border: '1px solid #f2f2f2',
                  padding: '5px 20px',
                  width: '100%',
                  minHeight: 60,
                }}
              >
                {item.circulationContent}
              </span>
            </div>
            <div style={{ marginTop: 10 }}>
              <span style={{ whiteSpace: 'nowrap' }}>
                是否满足立案条件：{item.satisfyCase === 1 ? '是' : '否'}
              </span>
              <span style={{ marginLeft: 50, whiteSpace: 'nowrap' }}>
                是否涉足敏感事件：{item.involveSensitive === 1 ? '是' : '否'}
              </span>
            </div>
            {item.fileList && (
              <div style={{ marginTop: 10 }}>
                <span>相关附件：</span>
                {fileList(item.fileList)}
              </div>
            )}
          </>
        );
      case 5:
        return (
          <div style={{ width: '100%', justifyContent: 'start', display: 'flex', marginTop: 15 }}>
            <span style={{ marginTop: 5, whiteSpace: 'nowrap' }}>备注：</span>
            <span
              style={{
                border: '1px solid #f2f2f2',
                padding: '5px 20px',
                width: '100%',
                minHeight: 60,
              }}
            >
              {item.circulationContent}
            </span>
          </div>
        );
      case 7:
      case 9:
      default:
        return '';
    }
  };

  const fileList = (files: any[]) => {
    if (files && files.length > 0) {
      const views = files.map(item => {
        return (
          <div style={{ display: 'block', whiteSpace: 'nowrap', width: '60%' }}>
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
              {formatDateStr(item.createTime, 'YYYY年MM月DD日 HH:mm')}
            </div>
          </div>
        );
      });

      return <div style={{ marginBottom: 10, marginTop: 10 }}>{views}</div>;
    }
    return <div style={{ marginBottom: 10, marginTop: 10 }} />;
  };

  return (
    <>
      <Descriptions title={title || '办理信息'} column={{ xxl: 4, xl: 3, lg: 2 }} />
      {processListData && (
        <List
          style={{ background: '#fff', padding: '0px 10px 30px 10px' }}
          split={false}
          dataSource={processListData}
          renderItem={item => (
            <List.Item
              key={item.circulationId}
              style={{ flexDirection: 'row', alignItems: 'start' }}
            >
              <div style={{ fontSize: 16, fontWeight: 500, width: '20%' }}>{item.sourceUnit}</div>

              <div style={{ flexDirection: 'column', marginLeft: 30, width: '80%' }}>
                <div>
                  <span style={{ fontWeight: 700 }}>{item.createUser}</span> 进行了{' '}
                  <span style={{ fontWeight: 700 }}>
                    线索
                    {enums &&
                      enums.clue_circulation_type &&
                      enums.clue_circulation_type[item.circulationType]}
                  </span>
                </div>
                <div>{formatDateStr(item.createTime, 'YYYY-MM-DD HH:mm:ss')}</div>
                {createDiv(item)}
              </div>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default connect(({ emClueManagement, global }) => ({
  processListData: emClueManagement.processListData,
  enums: global.enums,
}))(ProcessInfo);
