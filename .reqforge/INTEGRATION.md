# SaucyClaw → ReqForge 迁移指南

> 目标：将 SaucyClaw 的核心治理能力（本体建模、规则匹配、证据追溯）以 MCP Server 形式注入 ReqForge。

---

## 一、迁移策略

```
SaucyClaw (源)                         ReqForge (目标)
─────────────────                      ─────────────────

ontology/
  ├── schema.py         ──复制──→      mcp-servers/ontology-mcp/src/schema.py
  ├── mapping.py        ──复制──→      mcp-servers/ontology-mcp/src/mapping.py
  ├── establishment.py  ──复制──→      mcp-servers/ontology-mcp/src/establishment.py
  ├── policy_binding.py ──复制──→      mcp-servers/ontology-mcp/src/policy_binding.py
  ├── governance_loop.py──复制──→      mcp-servers/ontology-mcp/src/governance_loop.py
  └── loader.py         ──复制──→      mcp-servers/ontology-mcp/src/loader.py

core/governance/
  ├── matcher.py        ──复制+修复→   mcp-servers/governance-mcp/src/matcher.py
  ├── loader.py         ──复制──→      mcp-servers/governance-mcp/src/loader.py
  ├── explainer.py      ──复制──→      mcp-servers/governance-mcp/src/explainer.py
  └── explainer_bundle.py ──复制──→   mcp-servers/governance-mcp/src/explainer_bundle.py

core/evidence/
  └── generator.py      ──复制──→      mcp-servers/evidence-mcp/src/generator.py

schemas/governance/
  ├── rules.yaml        ──复制──→      mcp-servers/governance-mcp/schemas/rules.yaml
  ├── roles.yaml        ──复制──→      mcp-servers/governance-mcp/schemas/roles.yaml
  └── task_types.yaml   ──复制──→      mcp-servers/governance-mcp/schemas/task_types.yaml
```

## 二、迁移步骤

### Step 1: 复制源文件

```bash
SAUCYCLAW=/Users/yaochunyang/tools/AIGC/agent/SaucyClaw
REQFORGE=/Users/yaochunyang/tools/AIGC/agent/ReqForge

# Ontology
cp $SAUCYCLAW/ontology/schema.py $REQFORGE/mcp-servers/ontology-mcp/src/
cp $SAUCYCLAW/ontology/mapping.py $REQFORGE/mcp-servers/ontology-mcp/src/
cp $SAUCYCLAW/ontology/establishment.py $REQFORGE/mcp-servers/ontology-mcp/src/
cp $SAUCYCLAW/ontology/policy_binding.py $REQFORGE/mcp-servers/ontology-mcp/src/
cp $SAUCYCLAW/ontology/governance_loop.py $REQFORGE/mcp-servers/ontology-mcp/src/
cp $SAUCYCLAW/ontology/loader.py $REQFORGE/mcp-servers/ontology-mcp/src/

# Governance
cp $SAUCYCLAW/core/governance/matcher.py $REQFORGE/mcp-servers/governance-mcp/src/
cp $SAUCYCLAW/core/governance/loader.py $REQFORGE/mcp-servers/governance-mcp/src/
cp $SAUCYCLAW/core/governance/explainer.py $REQFORGE/mcp-servers/governance-mcp/src/
cp $SAUCYCLAW/core/governance/explainer_bundle.py $REQFORGE/mcp-servers/governance-mcp/src/

# Evidence
cp $SAUCYCLAW/core/evidence/generator.py $REQFORGE/mcp-servers/evidence-mcp/src/

# Schemas
cp $SAUCYCLAW/schemas/governance/*.yaml $REQFORGE/mcp-servers/governance-mcp/schemas/
```

### Step 2: 修复已知 Bug

**修复 `exists` 操作符语义错误**

文件: `mcp-servers/governance-mcp/src/matcher.py`，`_evaluate_field()` 函数中：

```python
# Bug (原代码):
if field_name not in input_data:
    return condition.op == "exists"  # 字段不存在时返回 True（错误）

# Fix:
if field_name not in input_data:
    return False  # 字段不存在，exists 和任何其他操作符都应返回 False
```

### Step 3: 替换 import 路径

迁移后的代码需要更新 import 路径：

```python
# 原 SaucyClaw import:
from core.governance.models import Condition, GovernanceRule
from stores.protocols import Evidence, GateResult

# 改为 ReqForge 本地 import:
from src.models import Condition, GovernanceRule  # 需要也迁移 models.py
from src.protocols import Evidence, GateResult
```

### Step 4: 编写 MCP Server 入口

每个 MCP Server 需要 `server.py` 作为入口，将 SaucyClaw 函数包装为 MCP Tool。

示例：`mcp-servers/ontology-mcp/server.py` 应提供：
- `map_event_to_ontology` → 调用 `src/mapping.py::map_raw_event_to_ontology()`
- `establish_facts` → 调用 `src/establishment.py::establish_fact_from_event()`
- `evaluate_policy` → 调用 `src/policy_binding.py::evaluate_policy_on_ontology()`

### Step 5: 运行测试验证

```bash
# 每个 MCP Server 运行测试
cd mcp-servers/ontology-mcp && uv run pytest
cd mcp-servers/governance-mcp && uv run pytest
cd mcp-servers/evidence-mcp && uv run pytest
```

## 三、SaucyClaw 保留清单

以下 SaucyClaw 文件**不迁移**，仅保留归档：

| 文件/目录 | 原因 |
|-----------|------|
| `adapters/` | ReqForge 用 MCP 替代 adapter 层 |
| `agents/` | ReqForge 用 DeerFlow Skills 替代 Agent 角色 |
| `core/engine/orchestrator.py` | DeerFlow 的 LangGraph 替代了编排 |
| `core/events/normalizer.py` | DeerFlow 有自己的事件系统 |
| `core/meta_model/` | 功能被 ontology/ 覆盖 |
| `stores/file/` | DeerFlow 有自己的持久化 |
| `stores/memory/` | 空目录 |
| `system/` | 保留归档，设计参考 |

SaucyClaw 仓库操作：
```bash
cd /Users/yaochunyang/tools/AIGC/agent/SaucyClaw
git tag v1.0-archived -m "Archived: core assets migrated to ReqForge"
# 更新 README.md 添加归档说明
```
