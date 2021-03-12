import React from 'react';
import RoleTree from './role-tree/index';

const RoleTreeLayout = ({ children }) => {
  return (
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
          padding: '30px 10px',
          flex: '0 0 260px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <RoleTree />
      </aside>
      <section style={{ marginLeft: 15, width: '100%', overflow: 'auto' }}>
        <main style={{ overflow: 'initial' }}>{children}</main>
      </section>
    </section>
  );
};

export default RoleTreeLayout;
