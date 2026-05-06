# CLAUDE.md — ReqForge

> ⚠️ 本仓库是 [bytedance/deer-flow](https://github.com/bytedance/deer-flow) 的 Fork。
> 在 DeerFlow 基础上注入了 SaucyClaw 治理能力，构建企业需求工程平台。
>
> **先读 [AGENTS.md](./AGENTS.md)**（完整项目指南），再读 [CARD.md](./CARD.md)（快速名片）。

## 一句话

ReqForge 在 DeerFlow 的 Super Agent Harness 上，通过 MCP Server 注入 SaucyClaw 的本体建模、治理约束和证据追溯能力，构建面向企业软件服务的交互式需求工程工作台。

## 当前分支

`feat/reqforge-init` — ReqForge 所有开发。`main` 只追踪上游。

## 核心原则

1. **不改上游文件**：`backend/` `frontend/` `docker/` `Makefile` 等永远不动
2. **所有扩展在独立目录**：`mcp-servers/` `frontend-reqforge/` `skills/custom/` `scripts/reqforge/`
3. **用 MCP 做治理**：SaucyClaw 代码已迁移为 3 个 MCP Server
4. **前端独立部署**：`frontend-reqforge/` 是独立 Next.js 应用 (port 3001)

## 入口文档

| 优先级 | 文件 | 用途 |
|--------|------|------|
| 1 | `CARD.md` | 3秒速览：什么、在哪、下一步 |
| 2 | `AGENTS.md` | 完整指南：架构、模板、Phase 计划 |
| 3 | `REQFORGE.md` | 项目定位 + 快速开始 |

## 开发命令

```bash
# 同步上游
bash scripts/reqforge/sync-upstream.sh --push

# 启动 ReqForge 前端
cd frontend-reqforge && pnpm install && pnpm dev

# 后端 (DeerFlow)
make setup && make docker-start
```
