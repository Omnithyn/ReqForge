#!/usr/bin/env bash
# sync-upstream.sh — ReqForge 上游同步脚本
#
# 用途: 将 bytedance/deer-flow 上游最新代码同步到 ReqForge
# 策略:
#   1. main 分支永远追踪 upstream/main（零改动）
#   2. feat/reqforge-init 分支 rebase 到最新 main
#   3. 因为 ReqForge 不改动上游文件，rebase 极少冲突
#
# 使用方法:
#   bash scripts/reqforge/sync-upstream.sh
#   bash scripts/reqforge/sync-upstream.sh --push   # 同步后自动推送

set -euo pipefail

PUSH=false
if [[ "${1:-}" == "--push" ]]; then
    PUSH=true
fi

echo "=== ReqForge 上游同步 ==="
echo ""

# ── 1. 检查当前状态 ──
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "main" ]] && [[ "$CURRENT_BRANCH" != "feat/reqforge-init" ]]; then
    echo "⚠️  当前分支: $CURRENT_BRANCH"
    echo "   建议先切到 main 或 feat/reqforge-init"
    echo "   git checkout main"
    exit 1
fi

# 检查是否有未提交的改动
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "❌ 有未提交的改动，请先 commit 或 stash"
    git status --short
    exit 1
fi

# ── 2. 更新 upstream ──
echo "📡 拉取上游更新..."
git fetch upstream main
UPSTREAM_HEAD=$(git rev-parse upstream/main)
LOCAL_MAIN=$(git rev-parse main)

if [[ "$UPSTREAM_HEAD" == "$LOCAL_MAIN" ]]; then
    echo "✅ main 已是最新 (upstream/main = $UPSTREAM_HEAD)"
else
    echo "🔄 上游有新版本，合并到 main..."
    git checkout main
    git merge upstream/main -m "chore: sync upstream $(git rev-parse --short upstream/main)"
    echo "✅ main 已更新到 $(git rev-parse --short HEAD)"

    if $PUSH; then
        echo "📤 推送 main..."
        git push origin main
    fi
fi

# ── 3. Rebase 开发分支 ──
echo ""
echo "🔄 更新 feat/reqforge-init 分支..."
git checkout feat/reqforge-init

# 检查是否需要 rebase
MERGE_BASE=$(git merge-base main feat/reqforge-init)
if [[ "$MERGE_BASE" == "$(git rev-parse main)" ]]; then
    echo "✅ feat/reqforge-init 已基于最新 main，无需 rebase"
else
    echo "🔧 正在 rebase..."
    if git rebase main; then
        echo "✅ rebase 成功"

        if $PUSH; then
            echo "📤 推送 feat/reqforge-init..."
            git push --force-with-lease origin feat/reqforge-init
        fi
    else
        echo "❌ rebase 冲突！"
        echo ""
        echo "   冲突处理步骤:"
        echo "   1. 查看冲突文件: git diff --name-only --diff-filter=U"
        echo "   2. 解决冲突后:   git add <file>"
        echo "   3. 继续 rebase:  git rebase --continue"
        echo "   4. 或放弃 rebase: git rebase --abort"
        echo ""
        echo "   ⚠️  如果冲突发生在 README.md，这是因为你在分支上改了它"
        echo "   💡 考虑: 只改 REQFORGE.md，不动上游 README"
        exit 1
    fi
fi

# ── 4. 显示最终状态 ──
echo ""
echo "=== 同步完成 ==="
echo "分支状态:"
git log --oneline --graph --all -8

echo ""
if ! $PUSH; then
    echo "💡 运行 'bash scripts/reqforge/sync-upstream.sh --push' 来自动推送"
fi
