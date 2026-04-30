'use client';

import { Card, Typography, Tabs, Empty, Space, Tag, Button } from 'antd';
import { FileTextOutlined, ApiOutlined, ExperimentOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ArtifactsPage() {
  const tabItems = [
    { key: 'prd', label: <span><FileTextOutlined /> 需求说明书 PRD</span>,
      children: <Empty description="等待需求分析完成后生成 PRD" /> },
    { key: 'api', label: <span><ApiOutlined /> OpenAPI 草案</span>,
      children: <Empty description="等待接口生成完成后展示 API 草案" /> },
    { key: 'test', label: <span><ExperimentOutlined /> 测试用例</span>,
      children: <Empty description="等待测试用例生成" /> },
    { key: 'trace', label: '追溯矩阵',
      children: <Empty description="等待本体建模完成后生成追溯矩阵" /> },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>研发准备包</Title>
          <Text type="secondary">从需求分析到开发交付的完整资产包</Text>
        </div>
        <Button type="primary" icon={<DownloadOutlined />} disabled>导出全部</Button>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 3 }}>
          <Card>
            <Tabs items={tabItems} />
          </Card>
        </div>
        <div style={{ flex: 1 }}>
          <Card title="成果物清单" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              {[
                { name: '需求说明书 PRD', format: 'Markdown/DOCX', status: 'pending' },
                { name: '业务流程图', format: 'Mermaid', status: 'pending' },
                { name: '页面原型', format: 'Penpot/描述', status: 'pending' },
                { name: '数据字典', format: 'JSON', status: 'pending' },
                { name: 'OpenAPI 草案', format: 'YAML/JSON', status: 'pending' },
                { name: '测试用例', format: 'Markdown', status: 'pending' },
                { name: '追溯矩阵', format: 'CSV', status: 'pending' },
                { name: '研发任务包', format: 'JSON', status: 'pending' },
              ].map(item => (
                <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text>{item.name}</Text>
                    <br /><Text type="secondary" style={{ fontSize: 12 }}>{item.format}</Text>
                  </div>
                  <Tag color="default">待生成</Tag>
                </div>
              ))}
            </Space>
          </Card>
        </div>
      </div>
    </div>
  );
}
