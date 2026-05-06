const calculateDaysUntilRenewal = (nextBillingDate: string) => {
  const today = new Date();
  const renewalDate = new Date(nextBillingDate);

  // Calculate difference in milliseconds, then convert to days
  const diffTime = renewalDate.getTime() - today.getTime();
  const daysUntilRenewal = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return daysUntilRenewal;
};

export default function UsageInsights({
  isCancelled,
  nextBillingDate,
}: {
  isCancelled: boolean;
  nextBillingDate: string | null | undefined;
}) {
  if (isCancelled) return null;
  const daysUntilRenewal = nextBillingDate
    ? calculateDaysUntilRenewal(nextBillingDate)
    : null;

  return (
    <div className="mt-12 border-t border-white/10 pt-8">
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-white/5 p-4">
          {typeof daysUntilRenewal == "number" && (
            <div className="mb-1 text-2xl font-light">{daysUntilRenewal}</div>
          )}
          <div className="font-mono text-xs text-white/40">
            {typeof daysUntilRenewal == "number"
              ? `Days until renewal`
              : `No renewal scheduled`}
          </div>
        </div>
        <div className="rounded-xl bg-white/5 p-4">
          <div className="mb-1 text-2xl font-light">8/8</div>
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
