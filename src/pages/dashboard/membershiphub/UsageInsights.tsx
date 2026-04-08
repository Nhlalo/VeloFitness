const calculateDaysUntilRenewal = (nextBillingDate: string) => {
  const today = new Date();
  const lastDayOfMonth = new Date(nextBillingDate);
  const daysUntilRenewal = lastDayOfMonth.getDate() - today.getDate();

  return daysUntilRenewal;
};

export default function UsageInsights({
  isCancelled,
  nextBillingDate,
}: {
  isCancelled: boolean;
  nextBillingDate: string;
}) {
  if (isCancelled) return null;

  const daysUntilRenewal = calculateDaysUntilRenewal(nextBillingDate);
  return (
    <div className="mt-12 border-t border-white/10 pt-8">
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-white/5 p-4">
          <div className="mb-1 text-2xl font-light">{daysUntilRenewal}</div>
          <div className="font-mono text-xs text-white/40">
            Days until renewal
          </div>
        </div>
        <div className="rounded-xl bg-white/5 p-4">
          <div className="mb-1 text-2xl font-light">6/8</div>
          <div className="font-mono text-xs text-white/40">
            Guest passes remaining
          </div>
        </div>
        <div className="rounded-xl bg-white/5 p-4">
          <div className="mb-1 text-2xl font-light">∞</div>
          <div className="font-mono text-xs text-white/40">
            Classes this month
          </div>
        </div>
      </div>
    </div>
  );
}
