# AI 资产管家

面向个人及家庭用户的智能资产管理与财富规划产品。MVP 主链路是：**资产盘点 → 财富诊断 → 目标规划 → 方案比较 → 情景推演 → 行动建议**。

## 本地开发

前置条件：Node.js 20+、pnpm 10+。

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

访问 <http://localhost:3000>。提交前运行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## 文档

- [MVP 实施计划](docs/mvp-implementation-plan.md)
- [系统架构与关键决策](docs/architecture.md)

## 工程原则

- 金额、比例、阈值、状态和情景数值由确定性规则引擎计算；AI 只负责解释、排序与生成可选规划思路。
- 所有结论保留来源和计算证据；`AI_GENERATED` 内容不得冒充用户确认事实。
- 上游数据变化立即更新底账，并将诊断、规划、推演及行动标记为 `STALE`，成功重算后再覆盖。
- 金额使用最小货币单位的整数存储，禁止使用浮点数进行财务计算。

