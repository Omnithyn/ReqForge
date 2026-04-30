'use client';

import { Layout, Menu, Typography } from 'antd';
import {
  AppstoreOutlined, ApartmentOutlined, AuditOutlined,
  FileTextOutlined, SettingOutlined, ExperimentOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

const { Sider, Content } = Layout;
const { Text } = Typography;

const menuItems = [
  { key: '/workspace', icon: <AppstoreOutlined />, label: '需求工作台' },
  { key: '/ontology', icon: <ApartmentOutlined />, label: '本体建模' },
  { key: '/review', icon: <AuditOutlined />, label: '质量评审' },
  { key: '/artifacts', icon: <FileTextOutlined />, label: '研发准备包' },
  { type: 'divider' as const },
  { key: '/settings', icon: <SettingOutlined />, label: '配置' },
];

export function ReqForgeLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const selectedKey = pathname === '/' ? '/workspace' :
    menuItems.filter(i => i.key && pathname.startsWith(i.key)).map(i => i.key)[0] || '/workspace';

  return (
    <Layout className="reqforge-shell">
      <Sider width={220} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
          <Text strong style={{ fontSize: 18 }}>🏗️ ReqForge</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>企业需求工程工作台</Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Content style={{ overflow: 'auto', background: '#f5f5f5' }}>
        {children}
      </Content>
    </Layout>
  );
}
