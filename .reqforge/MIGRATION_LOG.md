# SaucyClaw → ReqForge 迁移日志

## 2026-04-30: Phase 0 基础框架 + Phase 1 源码迁移

### 迁移内容

**ontology-mcp/ (9 files + schemas)**
- src/schema.py — OntologySchema, EventType, ContextType, FactType, PolicyBinding
- src/instances.py — EntityInstance, EventInstance, ContextSnapshot, FactRecord
- src/facts.py — FactEvidenceBinding, EvidenceChain, FactEstablishment
- src/mapping.py — map_raw_event_to_ontology, map_raw_event_with_package
- src/establishment.py — establish_fact_from_event, establish_fact_with_package
- src/policy_binding.py — evaluate_policy_on_ontology, PolicyJudgment
- src/loader.py — load_ontology_schema, validate_ontology_schema
- src/governance_loop.py — run_ontology_governance_loop, run_package_driven_governance
- src/authoring_package.py — AuthoringPackage, RuntimePackage, CompilationReport
- schemas/ — event_types.yaml, context_types.yaml, fact_types.yaml, studio_manifest.yaml
- src/stubs.py — RelationType stub (required by authoring_package.py)
- 额外复制: edge_semantics.py, roundtrip.py, semantic_surface.py, visual_model.py, runtime_readiness.py

**governance-mcp/ (5 files + schemas)**
- src/models.py — Condition, GovernanceRule, RoleDefinition, TaskType
- src/matcher.py — evaluate_rule, match_rules (exists bug FIXED)
- src/loader.py — load_rules, load_roles, load_task_types, load_governance
- src/explainer.py — RuleExplanation, explain_matched_rules
- src/explainer_bundle.py — ExplanationBundle, bundle_explanations
- schemas/ — rules.yaml, roles.yaml, task_types.yaml
- src/protocol_stubs.py — NormalizedEvent, Evidence stubs

**evidence-mcp/ (1 file)**
- src/generator.py — EvidenceGenerator, summarize_governance_action
- src/protocol_stubs.py — NormalizedEvent, Evidence stubs

### Bug 修复
- ✅ matcher.py L31: `exists` 操作符语义错误 — 字段不存在时不再错误返回 True

### Import 路径修复
- ✅ ontology-mcp: `from ontology.xxx → from src.xxx`
- ✅ governance-mcp: `from core.governance.xxx → from src.xxx`
- ✅ evidence-mcp: `from core.governance.models → from src.models`
- ✅ 所有 `from stores.protocols → from src.protocol_stubs`
- ✅ 所有 `from core.meta_model.models import RelationType → from src.stubs import RelationType`

### 待完成
- ⏳ MCP server.py 入口实现（当前为 stub）
- ⏳ evidence-mcp server.py 创建
- ⏳ docling-mcp server.py 实现
- ⏳ mermaid-mcp server.py 实现
- ⏳ 前端工作台设计（企业化 UI）
- ⏳ 集成测试
