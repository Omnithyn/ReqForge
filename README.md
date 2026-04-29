# 🏗️ ReqForge — 企业软件交互式需求设计与知识工程平台

> Forked from [bytedance/deer-flow](https://github.com/bytedance/deer-flow) (MIT License)
> 上游同步: `git fetch upstream && git merge upstream/main`
> 治理资产来源: SaucyClaw (ontology + governance + evidence)

ReqForge 是一个面向企业软件服务的交互式需求工程工作台，基于 DeerFlow 的 Super Agent Harness 构建，注入 SaucyClaw 的本体建模、治理约束和证据追溯能力。

## 核心主张

以类 ChatGPT / Manus 的交互式工作台为入口，以 Harness 式智能体驾驭机制为执行底座，以行业需求本体和知识库为核心资产，将企业软件需求从"文档编写"升级为"可追溯、可评审、可生成、可复用的研发准备过程"。

## ReqForge = DeerFlow + SaucyClaw

| 能力 | 来源 | 状态 |
|------|------|------|
| Web UI (ChatGPT式交互) | DeerFlow | ✅ 已就绪 |
| Agent编排 (LangGraph) | DeerFlow | ✅ 已就绪 |
| Skills扩展体系 | DeerFlow | ✅ 已就绪 |
| 子Agent隔离执行 | DeerFlow | ✅ 已就绪 |
| Memory + Sandbox | DeerFlow | ✅ 已就绪 |
| IM多平台集成 | DeerFlow | ✅ 已就绪 |
| **本体建模引擎** | **SaucyClaw** | ⏳ 迁移中 (mcp-servers/ontology-mcp) |
| **治理规则引擎** | **SaucyClaw** | ⏳ 迁移中 (mcp-servers/governance-mcp) |
| **证据追溯链** | **SaucyClaw** | ⏳ 迁移中 (mcp-servers/evidence-mcp) |
| 文档解析 (Docling) | 新建 | ⏳ 开发中 (mcp-servers/docling-mcp) |
| 流程图生成 (Mermaid) | 新建 | ⏳ 开发中 (mcp-servers/mermaid-mcp) |
| 需求分析 Skill | 新建 | ✅ v0.1 |
| 质量评审 Skill | 新建 | 🔜 待开发 |
| 研发准备包生成 | 新建 | 🔜 待开发 |

## 快速开始

```bash
cd /Users/yaochunyang/tools/AIGC/agent/ReqForge
make setup          # DeerFlow 配置向导
make doctor         # 验证环境
make docker-start   # 启动 (推荐)
# 或
make dev            # 本地开发模式
# 访问 http://localhost:2026
```

## 项目结构

```
ReqForge/
├── frontend/              ← DeerFlow Next.js 前端 (后续定制)
├── backend/               ← DeerFlow Python/LangGraph 后端
├── skills/custom/         ← ReqForge 领域 Skill
│   └── requirement-analysis/SKILL.md
├── mcp-servers/           ← MCP Server (SaucyClaw + 新工具)
│   ├── ontology-mcp/      ← 本体建模
│   ├── governance-mcp/    ← 规则匹配 + 证据
│   ├── evidence-mcp/      ← 证据存储 + 追溯
│   ├── docling-mcp/       ← 文档解析
│   └── mermaid-mcp/       ← 流程图生成
├── templates/artifacts/   ← 研发准备包模板
├── docker/                ← 服务编排 (含 MCP servers)
└── config.reqforge.example.yaml ← ReqForge 专属配置
```

## 上游同步

ReqForge 只在 `skills/`、`mcp-servers/`、`templates/` 中有专属改动，**永不修改 DeerFlow 核心代码**。

```bash
git fetch upstream
git merge upstream/main
```

## 许可证

MIT License (继承自 DeerFlow)
