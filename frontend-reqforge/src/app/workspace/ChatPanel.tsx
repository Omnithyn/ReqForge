'use client';

import { Card, Input, Button, Space, Typography, Avatar, Spin } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Text, Paragraph } = Typography;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '👋 欢迎使用 ReqForge 需求工程工作台！上传业务文档或描述需求，我将帮你完成需求分析。' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '正在分析你的需求...（MCP Server 集成中，当前为 UI 预览）',
      }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <Card
      title="需求对话"
      extra={<Button icon={<UploadOutlined />}>上传文档</Button>}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ flex: 1, overflow: 'auto', padding: 12 }}
    >
      <div style={{ flex: 1, overflow: 'auto', marginBottom: 12, minHeight: 300 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 16, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
            <Avatar icon={msg.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
              style={{ backgroundColor: msg.role === 'user' ? '#1677ff' : '#52c41a' }} />
            <div style={{
              maxWidth: '70%',
              padding: '8px 12px',
              borderRadius: 8,
              background: msg.role === 'user' ? '#e6f4ff' : '#f6ffed',
            }}>
              <Paragraph style={{ margin: 0 }}>{msg.content}</Paragraph>
            </div>
          </div>
        ))}
        {loading && <Spin tip="正在分析..." />}
      </div>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onPressEnter={handleSend}
          placeholder="描述你的需求，或上传文档..."
        />
        <Button type="primary" icon={<SendOutlined />} onClick={handleSend} loading={loading}>
          发送
        </Button>
      </Space.Compact>
    </Card>
  );
}
