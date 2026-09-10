const stages = ["资产盘点", "财富诊断", "目标规划", "方案比较", "情景推演", "行动建议"];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
      <span className="mb-5 w-fit rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
        MVP 环境已就绪
      </span>
      <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950">
        看清资产，让每一笔钱服务于人生目标
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        AI 资产管家将完整财富底账、可解释诊断与多方案规划连接起来，帮助个人和家庭做出更清晰的财富决策。
      </p>
      <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stages.map((stage, index) => (
          <li key={stage} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-emerald-700">STEP {index + 1}</span>
            <p className="mt-2 text-lg font-medium text-slate-900">{stage}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-sm text-slate-500">当前为工程基线；实施范围与里程碑见 docs/mvp-implementation-plan.md。</p>
    </main>
  );
}

