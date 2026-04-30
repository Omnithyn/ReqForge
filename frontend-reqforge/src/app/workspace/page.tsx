'use client';

import { Row, Col, Card, Typography, Tag, Button, Space } from 'antd';
import { PlusOutlined, HistoryOutlined } from '@ant-design/icons';
import { ChatPanel } from './ChatPanel';
import { TaskStepper } from './TaskStepper';

const { Title, Text } = Typography;

export default function WorkspacePage() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>需求工作台</Title>
          <Text type="secondary">通过对话式交互完成需求分析、本体建模和研发准备</Text>
        </div>
        <Space>
          <Button icon={<HistoryOutlined />}>历史任务</Button>
          <Button type="primary" icon={<PlusOutlined />}>新建需求任务</Button>
        </Space>
      </div>

      <Row gutter={16}>
        <Col span={14}>
          <ChatPanel />
        </Col>
        <Col span={10}>
          <TaskStepper
            currentPhase="document_parsing"
            tasks={[
              { phase: 'document_parsing', status: 'pending', title: '等待上传文档' },
              { phase: 'requirement_extraction', status: 'pending', title: '需求抽取' },
              { phase: 'ontology_modeling', status: 'pending', title: '本体建模' },
              { phase: 'quality_review', status: 'pending', title: '质量评审' },
              { phase: 'artifact_generation', status: 'pending', title: '研发准备包生成' },
            ]}
          />

          <Card title="MCP Server 状态" size="small" style={{ marginTop: 16 }}>
            {[
              { name: 'ontology-mcp', status: 'ready' },
              { name: 'governance-mcp', status: 'ready' },
              { name: 'evidence-mcp', status: 'ready' },
              { name: 'docling-mcp', status: 'pending' },
              { name: 'mermaid-mcp', status: 'pending' },
            ].map(s => (
              <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text>{s.name}</Text>
                <Tag color={s.status === 'ready' ? 'green' : 'orange'}>
                  {s.status === 'ready' ? '就绪' : '待实现'}
                </Tag>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
