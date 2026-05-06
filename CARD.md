# ReqForge 项目名片

> 新 agent 进入仓库时，先读这张卡片，再读 AGENTS.md。

## 一句话

**ReqForge = DeerFlow (底座) + SaucyClaw (治理资产) = 企业交互式需求工程平台**

## 当前分支

`feat/reqforge-init` — 所有开发在此分支。`main` 只追踪上游 bytedance/deer-flow。

## 做了什么 (2026-04-30)

| 完成 | 内容 |
|------|------|
| ✅ | SaucyClaw 70% 代码已迁移到 3 个 MCP Server (22 files, ~3500 lines) |
| ✅ | ontology-mcp (4 tools) · governance-mcp (4 tools) · evidence-mcp (2 tools) |
| ✅ | 企业级前端 (26 files, 9819 lines): 深蓝侧边栏 + 13 导航 + P0 页面 |
| ✅ | 第一个领域 Skill: requirement-analysis |
| ✅ | upstream 同步脚本: scripts/reqforge/sync-upstream.sh |

## 下一步做什么

```
优先级 1 (本周必须):
  1. DeerFlow docker-start 启动验证
  2. docling-mcp server.py 实现 (文档解析)
  3. mermaid-mcp server.py 实现 (流程图生成)
  4. 端到端验证: PDF上传 → 解析 → 本体 → 流程图 → 前端展示

优先级 2 (下周):
  5. 前端对接真实 API (ChatPanel → DeerFlow Gateway)
  6. 更多领域 Skill (ontology-modeling, quality-review, etc.)
  7. 消除 SaucyClaw 资产浪费 (catalog.py/compiler.py/projection.py → MCP tools)
```

## 哪里能改，哪里不能改

```
✅ 可以改 (不会冲突上游):
   AGENTS.md  CARD.md  REQFORGE.md
   frontend-reqforge/  mcp-servers/  skills/custom/
   scripts/reqforge/  .reqforge/  templates/artifacts/

❌ 不能改 (上游文件):
   backend/  frontend/  docker/  Makefile  config.example.yaml
   skills/public/  scripts/ (除了 scripts/reqforge/)
   pyproject.toml  package.json  .github/
```

## 关键文件索引

| 文件 | 读它做什么 |
|------|-----------|
| `AGENTS.md` | 完整项目指南：架构、MCP模板、Phase计划、质量要求 |
| `REQFORGE.md` | 项目定位 + 快速开始 |
| `.reqforge/MIGRATION_LOG.md` | SaucyClaw 迁移日志 |
| `.reqforge/INTEGRATION.md` | 迁移指南（如需迁移更多 SaucyClaw 代码） |
| `.github/copilot-instructions.md` | DeerFlow 上游开发指南 (backend/frontend) |
| `config.reqforge.example.yaml` | ReqForge MCP + Skills 配置模板 |

## 日常命令

```bash
# 同步上游
bash scripts/reqforge/sync-upstream.sh --push

# 启动 ReqForge 前端
cd frontend-reqforge && pnpm install && pnpm dev
# → http://localhost:3001

# 查看项目状态
git log --oneline feat/reqforge-init -10
```
