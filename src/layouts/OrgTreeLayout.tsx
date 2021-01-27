import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import OrgTree from '@/components/OrgTree';

const OrgTreeLayout = ({ children, onOrgSelect }) => {
  return (
    <PageHeaderWrapper>
      <section
        style={{
          display: 'flex',
          flex: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <aside
          style={{
            background: '#fff',
            minHeight: 'calc(100vh - 186px)',
            maxHeight: '100vh',
            padding: 10,
            flex: '0 0 300px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <OrgTree onChange={onOrgSelect} />
        </aside>
        <section style={{ marginLeft: 10, width: '100%', overflow: 'auto' }}>
          <main style={{ overflow: 'initial' }}>{children}</main>
        </section>
      </section>
    </PageHeaderWrapper>
  );
};

export default OrgTreeLayout;
