# AGENTS.md — ReqForge 项目总入口

> 本文件是 AI 代理进入 ReqForge 仓库的第一入口。优先阅读本文件，再读 DeerFlow 的 `.github/copilot-instructions.md`。

---

## 一、项目本质

ReqForge = **DeerFlow (底座)** + **SaucyClaw (治理资产)** = **企业交互式需求工程平台**

| 来源 | 角色 | 在仓库中的位置 |
|------|------|---------------|
| DeerFlow (上游) | Web UI、Agent编排(LangGraph)、Skills、Sandbox、Memory、IM | `frontend/` `backend/` `docker/` `skills/public/` |
| SaucyClaw (迁移中) | 本体建模、治理规则、证据追溯 | `mcp-servers/ontology-mcp/` `mcp-servers/governance-mcp/` `mcp-servers/evidence-mcp/` |
| ReqForge (新建) | 需求分析流程、文档解析、研发准备包 | `skills/custom/` `mcp-servers/docling-mcp/` `mcp-servers/mermaid-mcp/` `templates/artifacts/` |

**核心主张**：以类 ChatGPT/Manus 交互式工作台为入口，以 Harness 式智能体驾驭为底座，以行业需求本体和知识库为核心资产，将需求工作从"文档编写"升级为"可追溯、可评审、可生成、可复用的研发准备过程"。

---

## 二、分支策略（最关键）

```
upstream (bytedance/deer-flow)
  │
  ├── main  ───────────── [持续更新] ───→
  │   ↑ 定期 git merge
  │
origin (Omnithyn/ReqForge)
  │
  ├── main  ───────────── 永远等于 upstream/main，零改动
  │
  └── feat/reqforge-init  ── 所有 ReqForge 开发在此分支
                             (只 rebase，不 merge upstream)
```

### 日常操作

```bash
# 同步上游最新代码（每周执行）
git checkout main
git fetch upstream
git merge upstream/main
git push origin main

# 将上游更新合并到 ReqForge 开发分支
git checkout feat/reqforge-init
git rebase main
git push --force-with-lease origin feat/reqforge-init

# 或使用脚本
bash scripts/reqforge/sync-upstream.sh
```

---

## 三、哪里可以改，哪里不能改

### ✅ 可以改（ReqForge 自己的文件，不会与上游冲突）

| 文件/目录 | 用途 |
|-----------|------|
| `AGENTS.md` | 本文件（纯 ReqForge 新增） |
| `REQFORGE.md` | ReqForge 项目说明 |
| `README.md` | 可加 ReqForge banner（本分支 rebase，不改上游版本） |
| `config.reqforge.example.yaml` | ReqForge 专属配置 |
| `mcp-servers/` | 全部 MCP Server（本体、治理、证据、文档解析、流程图） |
| `skills/custom/` | ReqForge 领域 Skill |
| `scripts/reqforge/` | ReqForge 运维脚本 |
| `.reqforge/` | ReqForge 内部文档和迁移指南 |
| `templates/artifacts/` | 研发准备包模板 |

### ❌ 不能改（上游文件，会导致 rebase 冲突）

| 文件/目录 | 说明 |
|-----------|------|
| `backend/` | DeerFlow 后端核心 |
| `frontend/` | DeerFlow 前端 |
| `docker/` | DeerFlow Docker 配置 |
| `Makefile` | DeerFlow 构建入口 |
| `config.example.yaml` | DeerFlow 上游配置模板 |
| `skills/public/` | DeerFlow 内置 Skill |
| `scripts/` (除了 `scripts/reqforge/`) | DeerFlow 上游脚本 |
| `pyproject.toml`, `package.json` 等 | 上游依赖配置 |
| `.github/` | 上游 CI/CD 配置 |

> **原则**：如果需要扩展上游功能（如 Docker 中注册 MCP server），用 `.reqforge/patches/` 目录保存 diff，需要时 apply。

---

## 四、二次开发内容总览

### 当前阶段：Phase 0 — 基础框架搭建

| 编号 | 任务 | 位置 | 状态 |
|------|------|------|------|
| P0-1 | Fork DeerFlow + 建立分支策略 | Git 仓库 | ✅ 完成 |
| P0-2 | 创建 AGENTS.md + REQFORGE.md | 根目录 | ✅ 完成 |
| P0-3 | 创建 MCP Server 骨架 (5个) | `mcp-servers/*/` | ✅ 完成 |
| P0-4 | 创建第一个领域 Skill | `skills/custom/requirement-analysis/` | ✅ 完成 |
| P0-5 | 创建 sync-upstream.sh 脚本 | `scripts/reqforge/` | ✅ 完成 |
| P0-6 | SaucyClaw 代码迁移 → MCP Server | `mcp-servers/ontology-mcp/src/` 等 | ✅ 完成 (40 files, 5891 lines) |
| P0-7 | DeerFlow 底座验证 (`make dev`) | — | ⏳ 待实施 |

### Phase 1：SaucyClaw 资产迁移（即将开始）

| 编号 | 源文件 (SaucyClaw) | 目标 (ReqForge) | 说明 |
|------|-------------------|-----------------|------|
| M1 | `ontology/schema.py` | `mcp-servers/ontology-mcp/src/schema.py` | 本体类型定义 |
| M2 | `ontology/mapping.py` | `mcp-servers/ontology-mcp/src/mapping.py` | 事件→本体映射 |
| M3 | `ontology/establishment.py` | `mcp-servers/ontology-mcp/src/establishment.py` | 事实建立 |
| M4 | `ontology/policy_binding.py` | `mcp-servers/ontology-mcp/src/policy_binding.py` | 策略评估 |
| M5 | `ontology/governance_loop.py` | `mcp-servers/ontology-mcp/src/governance_loop.py` | 治理循环 |
| M6 | `core/governance/matcher.py` | `mcp-servers/governance-mcp/src/matcher.py` | 规则匹配（修复 exists bug） |
| M7 | `core/governance/loader.py` | `mcp-servers/governance-mcp/src/loader.py` | YAML 规则加载 |
| M8 | `core/governance/explainer*.py` | `mcp-servers/governance-mcp/src/explainer.py` | 解释输出 |
| M9 | `core/evidence/generator.py` | `mcp-servers/evidence-mcp/src/generator.py` | 证据生成 |
| M10 | `schemas/governance/*.yaml` | `mcp-servers/governance-mcp/schemas/` | 治理规则 |

### Phase 2：文档解析 + 流程图

| 编号 | 任务 | 位置 | 依赖 |
|------|------|------|------|
| D1 | Docling MCP Server 实现 | `mcp-servers/docling-mcp/server.py` | docling>=2.0 |
| D2 | Mermaid MCP Server 实现 | `mcp-servers/mermaid-mcp/server.py` | — |
| D3 | 需求分析 Skill 完善 | `skills/custom/requirement-analysis/SKILL.md` | D1, D2, M1-M10 |
| D4 | 端到端验证：PDF → 需求 → 本体 → 流程图 | 集成测试 | 全部 |

### Phase 3：更多领域 Skill

| Skill | 路径 | 说明 |
|-------|------|------|
| ontology-modeling | `skills/custom/ontology-modeling/SKILL.md` | 本体建模专用 |
| document-parsing | `skills/custom/document-parsing/SKILL.md` | 文档解析专用 |
| api-spec-generation | `skills/custom/api-spec-generation/SKILL.md` | OpenAPI 草案生成 |
| test-case-generation | `skills/custom/test-case-generation/SKILL.md` | 测试用例生成 |
| quality-review | `skills/custom/quality-review/SKILL.md` | 质量评审 |
| artifact-packaging | `skills/custom/artifact-packaging/SKILL.md` | 研发准备包打包 |
| traceability-matrix | `skills/custom/traceability-matrix/SKILL.md` | 追溯矩阵 |

### Phase 4：前端定制（后续）

| 任务 | 位置 | 说明 |
|------|------|------|
| 任务推进面板 | `frontend/src/app/reqforge/TaskStepper.tsx` | 需求分析阶段可视化 |
| 本体关系图 | `frontend/src/app/reqforge/OntologyGraph.tsx` | D3.js 渲染本体关系 |
| 评审区 | `frontend/src/app/reqforge/ReviewPanel.tsx` | 待确认项 + 评分卡 |
| 研发准备包预览 | `frontend/src/app/reqforge/ArtifactPanel.tsx` | PRD/API/测试预览 |

---

## 五、MCP Server 架构说明

每个 MCP Server 是独立的 Python 包，通过 DeerFlow 的 MCP 协议与 Agent 通信：

```
DeerFlow Lead Agent (LangGraph)
  │
  ├── MCP Client ──→ ontology-mcp (stdio transport)
  │                    ├── map_event_to_ontology
  │                    ├── establish_facts
  │                    ├── evaluate_policy
  │                    └── query_ontology_graph
  │
  ├── MCP Client ──→ governance-mcp (stdio transport)
  │                    ├── load_rules
  │                    ├── match_rules
  │                    ├── explain_decisions
  │                    └── quality_review
  │
  ├── MCP Client ──→ evidence-mcp (stdio transport)
  │                    └── generate_evidence / trace
  │
  ├── MCP Client ──→ docling-mcp (stdio transport)
  │                    └── parse_document
  │
  └── MCP Client ──→ mermaid-mcp (stdio transport)
                       └── generate_flowchart / sequence / state
```

### 新增 MCP Server 模板

```python
# mcp-servers/my-new-mcp/server.py
from mcp.server import Server, stdio_server
from mcp.types import Tool, TextContent

server = Server("my-new-mcp")

@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(name="my_tool", description="What this tool does",
             inputSchema={"type":"object","properties":{},"required":[]}),
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    ...

async def main():
    async with stdio_server() as (read, write):
        await server.run(read, write, server.create_initialization_options())
```

### 注册 MCP Server（在 config.yaml 中）

```yaml
mcp_servers:
  my-new-mcp:
    command: uv
    args: ["run", "--directory", "mcp-servers/my-new-mcp", "server.py"]
    description: "My new tool"
```

### 新增 Skill 模板

```markdown
---
name: my-skill
description: One-line description
mcp_servers: [ontology-mcp, governance-mcp]
---

# My Skill

## 适用场景
When user asks for X.

## 工作流
1. Step one
2. Step two

## 输出规范
...

## 约束
- Constraint one
- Constraint two
```

---

## 六、当前 MCP Server 实现状态

| Server | pyproject.toml | server.py | 实际功能 | 来源 |
|--------|---------------|-----------|---------|------|
| ontology-mcp | ✅ | ✅ (调用真实代码) | ✅ Phase 1 迁移完成 | SaucyClaw |
| governance-mcp | ✅ | ✅ (调用真实代码, exists bug fixed) | ✅ Phase 1 迁移完成 | SaucyClaw |
| evidence-mcp | ✅ | ✅ (调用真实代码) | ✅ Phase 1 迁移完成 | SaucyClaw |
| docling-mcp | ✅ | ❌ (无 server.py) | ⏳ 待实现 | 新建 |
| mermaid-mcp | ✅ | ❌ (无 server.py) | ⏳ 待实现 | 新建 |

---

## 七、上游参考文件

| 文件 | 用途 |
|------|------|
| `.github/copilot-instructions.md` | DeerFlow 的上游开发指南 |
| `backend/CLAUDE.md` | DeerFlow 后端架构 |
| `backend/README.md` | DeerFlow 后端 API 参考 |
| `backend/docs/CONFIGURATION.md` | DeerFlow 配置指南（含 Sandbox、MCP） |
| `backend/docs/MCP_SERVER.md` | DeerFlow MCP Server 集成指南 |

---

## 八、SaucyClaw 迁移指南

详见 `.reqforge/INTEGRATION.md`。关键点：
- SaucyClaw 的 `ontology/` 模块迁移到 `mcp-servers/ontology-mcp/src/`
- SaucyClaw 的 `core/governance/` 迁移到 `mcp-servers/governance-mcp/src/`
- SaucyClaw 的 `core/evidence/` 迁移到 `mcp-servers/evidence-mcp/src/`
- 迁移时修复 `core/governance/matcher.py` 中的 `exists` 操作符 Bug
- SaucyClaw 仓库保留归档，不删除

---

## 九、质量要求

### 代码规范
- MCP Server: Python 3.12+, 类型注解, 遵循 DeerFlow 后端规范
- Skills: Markdown 格式，必需 frontmatter (name, description)
- Shell 脚本: `set -euo pipefail`, 注释说明功能

### 测试要求
- 每个 MCP Server 至少有一个 smoke test
- SaucyClaw 迁移代码必须通过原有测试
- Skill 修改后需要端到端验证

### 提交规范
```
type(scope): description

feat(ontology): migrate SaucyClaw mapping to MCP Server
fix(governance): fix exists operator in matcher
docs(readme): update ReqForge banner
chore(sync): add upstream sync script
```
