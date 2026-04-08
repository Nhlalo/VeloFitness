// components/CancelConfirmModal.jsx - Phase 1

export default function CancelConfirmModal() {
  return (
    <>
      <div>Backdrop</div>
      <div>
        <div>
          <div>
            <div>⚠️</div>
            <div>
              <h3>Cancel Subscription</h3>
              <p>This action cannot be undone</p>
            </div>
          </div>
          <div>
            <p>Are you sure you want to cancel your membership?</p>
            <div>
              <p>⚠️ You will lose access to:</p>
              <ul>
                <li>All remaining guest passes</li>
                <li>Class booking privileges</li>
                <li>Club access after 30 days</li>
              </ul>
            </div>
            <p>Your membership will remain active until [date].</p>
          </div>
          <div>
            <button>Keep Membership</button>
            <button>Yes, Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
