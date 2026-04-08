export default function CancellationBanner() {
  return (
    <div>
      <div>
        <div>⚠️</div>
        <div>
          <h3>Membership Cancelled</h3>
          <p>
            Your membership was cancelled on [date]. You will have access until
            [date].
          </p>
          <p>Click "Reactivate Membership" to restore your benefits.</p>
        </div>
      </div>
    </div>
  );
}
