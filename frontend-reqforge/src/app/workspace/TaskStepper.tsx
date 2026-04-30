'use client';

import { Card, Steps, Tag, Typography, Space } from 'antd';
import {
  FileTextOutlined, ApartmentOutlined, AuditOutlined,
  RocketOutlined, CheckCircleOutlined, LoadingOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const phases = [
  { key: 'document_parsing', title: '文档解析', icon: <FileTextOutlined />, description: '解析上传文档，提取章节、表格、规则' },
  { key: 'requirement_extraction', title: '需求抽取', icon: <LoadingOutlined />, description: '识别功能需求、非功能需求、业务规则' },
  { key: 'ontology_modeling', title: '本体建模', icon: <ApartmentOutlined />, description: '建立业务对象、属性和关系' },
  { key: 'quality_review', title: '质量评审', icon: <AuditOutlined />, description: '检查完整性、一致性、可追溯性' },
  { key: 'artifact_generation', title: '资产生成', icon: <RocketOutlined />, description: '生成 PRD、流程图、API 草案、测试用例' },
  { key: 'done', title: '完成', icon: <CheckCircleOutlined />, description: '研发准备包就绪' },
];

interface TaskStepperProps {
  currentPhase: string;
  tasks: Array<{ phase: string; status: string; title: string }>;
}

export function TaskStepper({ currentPhase, tasks }: TaskStepperProps) {
  const currentIndex = phases.findIndex(p => p.key === currentPhase);

  return (
    <Card title={<Title level={5}>需求分析进展</Title>} style={{ height: '100%' }}>
      <Steps
        direction="vertical"
        current={currentIndex}
        size="small"
        items={phases.map((phase) => ({
          title: phase.title,
          description: phase.description,
          icon: phase.icon,
        }))}
      />
      <div style={{ marginTop: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {tasks.map((task, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>{task.title}</Text>
              <Tag color={task.status === 'done' ? 'green' : task.status === 'running' ? 'blue' : 'default'}>
                {task.status === 'done' ? '已完成' : task.status === 'running' ? '进行中' : '待处理'}
              </Tag>
            </div>
          ))}
        </Space>
      </div>
    </Card>
  );
}
