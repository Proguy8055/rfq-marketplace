import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest, authHeaders } from "../api";
import AppNavbar from "../components/AppNavbar";

function MyQuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const data = await apiRequest("/quotations/mine", {
          headers: authHeaders(),
        });

        setQuotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuotes();
  }, []);

  if (loading) {
    return (
      <div className="app-shell">
        <AppNavbar />
        <div className="dashboard-page">
          <h1>My Quotations</h1>
          <p>Loading your quotations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <AppNavbar />
      <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>My Quotations</h1>
          <p>Track the quotations you have submitted to buyers.</p>
        </div>

        <Link to="/supplier" className="secondary-btn">
          Back to Dashboard
        </Link>
      </div>

      {error && <p className="auth-error">{error}</p>}

      <div className="dashboard-section">
        <h2>Submitted Quotations</h2>

        {quotes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>

            <h3>No quotations yet</h3>

            <p>
              Your submitted quotations will appear here once you respond to
              an RFQ.
            </p>

            <Link to="/supplier" className="primary-btn">
              Browse RFQs
            </Link>
          </div>
        ) : (
          <div className="rfq-list">
            {quotes.map((quote) => (
              <div className="rfq-card" key={quote.id}>
                <div>
                  <h3>{quote.rfq.title}</h3>

                  <p>
                    You submitted a quotation for {quote.rfq.quantity} units
                    in {quote.rfq.location}.
                  </p>

                  <div className="rfq-meta">
                    <span>Price: ₹{quote.price}</span>
                    <span>Delivery: {quote.deliveryTime}</span>
                    <span>Status: {quote.rfq.status}</span>
                  </div>

                  {quote.notes && (
                    <p>
                      <strong>Notes:</strong> {quote.notes}
                    </p>
                  )}
                </div>

                <Link
                  to={`/rfqs/${quote.rfq.id}`}
                  className="secondary-btn"
                >
                  View RFQ
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default MyQuotesPage;