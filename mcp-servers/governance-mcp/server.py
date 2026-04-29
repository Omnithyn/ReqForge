from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent
import json

server = Server("reqforge-governance-mcp")

@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(name="load_rules", description="加载治理规则",
             inputSchema={"type":"object","properties":{"yaml_path":{"type":"string"}},"required":["yaml_path"]}),
        Tool(name="match_rules", description="匹配事件与规则",
             inputSchema={"type":"object","properties":{"event_data":{"type":"object"},"rules":{"type":"array","items":{"type":"object"}}},"required":["event_data","rules"]}),
        Tool(name="explain_decisions", description="生成规则匹配解释",
             inputSchema={"type":"object","properties":{"triggered_rules":{"type":"array","items":{"type":"object"}}},"required":["triggered_rules"]}),
        Tool(name="quality_review", description="需求质量评审",
             inputSchema={"type":"object","properties":{"requirements":{"type":"array","items":{"type":"object"}}}},
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    handlers = {
        "load_rules": lambda: {"status": "stub", "source": "SaucyClaw core/governance/loader.py"},
        "match_rules": lambda: {"status": "stub", "source": "SaucyClaw core/governance/matcher.py"},
        "explain_decisions": lambda: {"status": "stub", "source": "SaucyClaw core/governance/explainer.py"},
        "quality_review": lambda: {"status": "stub", "source": "SaucyClaw governance + ReqForge rubric"},
    }
    handler = handlers.get(name)
    if not handler:
        return [TextContent(type="text", text=f"Unknown: {name}")]
    return [TextContent(type="text", text=json.dumps(handler(), ensure_ascii=False, indent=2))]

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream, server.create_initialization_options())

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
