# MVP 系统架构与关键决策

## 1. 技术基线

首版采用模块化单体，降低跨服务事务与运维成本，同时通过清晰领域边界保留后续拆分能力。

| 层 | 选择 | 职责 |
| --- | --- | --- |
| Web | Next.js + React + TypeScript | 页面、Server Actions/API、鉴权边界 |
| 校验 | Zod | 表单、API、AI 结构化输出校验 |
| 数据库（下一迭代接入） | PostgreSQL + Prisma | 结构化财富数据、版本与审计记录 |
| 规则计算 | 纯 TypeScript domain functions | 金额、比例、评分、状态、压力测试 |
| AI 编排 | 服务端 adapter | 提示词版本、结构化输出、超时与降级 |
| 测试 | Vitest + Playwright（页面形成后接入） | 单元、集成与关键旅程测试 |

## 2. 模块边界

```text
identity/profile ─┐
ledger ───────────┼─> calculation snapshot ─> diagnosis ─┐
goals ────────────┘                                      ├─> plans ─> scenarios ─> actions
                                                        └─> dashboard
```

- **Profile**：基础信息、家庭状态、主币种、用户确认的风险等级。
- **Ledger**：资产、负债、收入、支出；写操作形成审计记录。
- **Calculation**：不可变计算快照，保存输入版本、公式版本、结果与不可计算原因。
- **Diagnosis**：五维规则状态、证据链、风险排序与 AI 解释。
- **Goals**：目标约束、已绑定资产、未来投入与覆盖情况。
- **Plans**：当前路径及 A/B/C 方案；AI 提议必须经规则引擎复算。
- **Scenarios**：针对某个方案快照运行预设压力参数，不预测概率。
- **Actions**：来自选中方案的任务及状态机；用户完成不等于系统验证完成。

## 3. 核心数据约束

1. 金额采用 `{ amountMinor: bigint, currency: ISO-4217 }`；MVP 仅汇总主币种，未提供汇率时外币结果为 `UNKNOWN`。
2. 每条输入及生成数据带 `source`、`asOf`、`createdAt`、`updatedAt`；AI 推断另带模型和提示词版本。
3. 软删除保留审计轨迹；只有有效记录进入计算。
4. 计算结果关联 `inputVersion` 与 `formulaVersion`。任一依赖版本变化即进入 `STALE`。
5. 写操作与 stale 标记处于同一数据库事务；重算任务须幂等，旧版本结果不得覆盖新版本。
6. 用户敏感财务数据服务端加密传输、最小授权访问，日志禁止记录原始金额、账户标识和 AI 提示全文。

## 4. AI 安全边界

AI 输入是脱敏后的结构化事实和规则结果；AI 输出先通过 schema 校验，再校验金额引用与事实引用，最后才展示。AI 不直接写资产底账、不决定财富健康分、不提供收益保证。超时、格式错误或证据不足时保留确定性结果，解释区显示降级状态并允许重试。

规划采用“两阶段”流程：AI 生成约束明确的候选参数，规则引擎计算每套方案的目标完成、现金流、风险、流动性及调整金额；AI 再只基于这些结果解释获得与牺牲。这样避免语言模型修改系统事实。

## 5. 状态与可观测性

主要资源统一支持 `LOADING / EMPTY / NORMAL / PARTIAL / ERROR / STALE`。服务端记录 request ID、输入版本、规则版本、提示词版本、耗时及错误类别，不记录敏感原文。关键漏斗埋点沿用 PRD 名称，并增加 `recalculation_started/completed/failed` 和 `ai_fallback_shown`。

## 6. 首版非目标

- 自动交易、自动调仓和账户直连。
- 实时行情承诺、市场预测或事件概率预测。
- 完整保险规划、税务或法律建议。
- P0 阶段的公开金融产品搜索。
- 将用户点击“已完成”视作资产已经变化。

