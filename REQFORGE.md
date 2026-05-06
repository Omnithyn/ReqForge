# 🏗️ ReqForge — 企业软件交互式需求设计与知识工程平台

> Forked from [bytedance/deer-flow](https://github.com/bytedance/deer-flow) (MIT License)
> 所有 ReqForge 改动在独立文件和目录中，不与上游冲突

ReqForge 在 DeerFlow（Super Agent Harness）基础上，注入 SaucyClaw 的本体建模、治理约束和证据追溯能力，构建面向企业软件服务的交互式需求工程工作台。

## 核心主张

以类 ChatGPT / Manus 的交互式工作台为入口，以 Harness 式智能体驾驭为执行底座，以行业需求本体和知识库为核心资产，将需求工作从"文档编写"升级为"可追溯、可评审、可生成、可复用的研发准备过程"。

## ReqForge = DeerFlow + SaucyClaw

| 能力 | 来源 | 位置 |
|------|------|------|
| Web UI, Agent编排, Skills, Sandbox, IM | DeerFlow | `frontend/`, `backend/`, `docker/` |
| 本体建模引擎 | SaucyClaw → | `mcp-servers/ontology-mcp/` |
| 治理规则引擎 | SaucyClaw → | `mcp-servers/governance-mcp/` |
| 证据追溯链 | SaucyClaw → | `mcp-servers/evidence-mcp/` |
| 文档解析 | 新建 | `mcp-servers/docling-mcp/` |
| 需求分析工作流 | 新建 | `skills/custom/` |

## 上游同步策略

```
main                    ← 永远等于 upstream/main（零改动）
feat/reqforge-init      ← 所有 ReqForge 开发在此分支
```

```bash
# 同步上游最新代码
git checkout main
git fetch upstream
git merge upstream/main
git push origin main

# 将上游更新合并到 ReqForge 开发分支
git checkout feat/reqforge-init
git rebase main
```

> ReqForge 不改动任何上游文件，所有扩展通过 `mcp-servers/`、`skills/custom/`、`templates/` 等独立目录完成。上游 README.md 保留原样。

## 快速开始

```bash
# 1. 启动 DeerFlow 底座
cd /Users/yaochunyang/tools/AIGC/agent/ReqForge
make setup && make doctor && make docker-start

# 2. 安装 ReqForge MCP Servers
cd mcp-servers/ontology-mcp && uv sync
cd ../governance-mcp && uv sync
cd ../evidence-mcp && uv sync

# 3. 将 config.reqforge.example.yaml 内容合并到 config.yaml
# 4. 访问 http://localhost:2026
```

## 项目结构

```
ReqForge/
├── REQFORGE.md                     ← 本文件（ReqForge 总入口）
├── config.reqforge.example.yaml    ← ReqForge 专属配置
├── .reqforge/                      ← ReqForge 内部文档
│   └── INTEGRATION.md              ← SaucyClaw 迁移指南
├── frontend-reqforge/               ← 🆕 ReqForge 独立企业级前端 (Next.js 16 + Ant Design 5, port 3001)
│   ├── src/app/workspace/           ← 对话工作台
│   ├── src/app/artifacts/           ← 研发准备包
│   └── src/app/                     ← 首页 + 8 骨架页面
├── mcp-servers/                    ← 全部 ReqForge MCP Server
│   ├── ontology-mcp/               ← SaucyClaw ontology/ 迁移
│   ├── governance-mcp/             ← SaucyClaw core/governance/ 迁移
│   ├── evidence-mcp/               ← SaucyClaw core/evidence/ 迁移
│   ├── docling-mcp/                ← 文档解析（新建）
│   └── mermaid-mcp/                ← 流程图生成（新建）
├── skills/custom/                  ← ReqForge 领域 Skill
├── templates/artifacts/            ← 研发准备包模板
│
├── README.md                       ← 上游 DeerFlow README（不改动）
├── frontend/                       ← 上游 DeerFlow 前端（不改动）
├── backend/                        ← 上游 DeerFlow 后端（不改动）
├── docker/                         ← 上游 Docker 配置（不改动）
└── ...                             ← 其余上游文件（不改动）
```

## 许可证

MIT License (继承自 DeerFlow)
