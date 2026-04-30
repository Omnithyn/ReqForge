'use client';

import { Card, Typography, Row, Col, Statistic, Button, Space } from 'antd';
import { RocketOutlined, FileTextOutlined, ApartmentOutlined, ExperimentOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text, Paragraph } = Typography;

export default function HomePage() {
  const router = useRouter();

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 32 }}>
        <Title level={2}>ReqForge 企业需求工程工作台</Title>
        <Paragraph type="secondary" style={{ fontSize: 16 }}>
          以交互式工作台为入口，以智能体驾驭为底座，将需求工作从文档编写升级为可追溯、可评审、可生成、可复用的研发准备过程。
        </Paragraph>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card hoverable onClick={() => router.push('/workspace')}>
            <Statistic title="需求工作台" value="开始" prefix={<RocketOutlined />} suffix="→" />
            <Text type="secondary">上传文档或描述需求</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable onClick={() => router.push('/ontology')}>
            <Statistic title="本体建模" value="查看" prefix={<ApartmentOutlined />} suffix="→" />
            <Text type="secondary">业务对象与关系管理</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable onClick={() => router.push('/review')}>
            <Statistic title="质量评审" value="查看" prefix={<FileTextOutlined />} suffix="→" />
            <Text type="secondary">需求质量评分与追溯</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable onClick={() => router.push('/artifacts')}>
            <Statistic title="研发准备包" value="查看" prefix={<ExperimentOutlined />} suffix="→" />
            <Text type="secondary">PRD、API、测试、追溯</Text>
          </Card>
        </Col>
      </Row>

      <Card title="MCP Server 状态" size="small" style={{ marginTop: 24 }}>
        <Space wrap>
          {[
            { name: 'ontology-mcp', ok: true },
            { name: 'governance-mcp', ok: true },
            { name: 'evidence-mcp', ok: true },
            { name: 'docling-mcp', ok: false },
            { name: 'mermaid-mcp', ok: false },
          ].map(s => (
            <Button key={s.name} size="small" type={s.ok ? 'primary' : 'default'} ghost={!s.ok}>
              {s.name} {s.ok ? '✅' : '⏳'}
            </Button>
          ))}
        </Space>
      </Card>
    </div>
  );
}
