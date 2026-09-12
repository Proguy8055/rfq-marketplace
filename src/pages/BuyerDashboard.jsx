import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest, authHeaders } from "../api";
import AppNavbar from "../components/AppNavbar";

function BuyerDashboard() {
  const [rfqs, setRfqs] = useState([]);
  const [quotesReceived, setQuotesReceived] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await apiRequest("/rfqs/mine", {
          headers: authHeaders(),
        });

        setRfqs(data);

        const quotationResults = await Promise.all(
          data.map((rfq) =>
            apiRequest(`/rfqs/${rfq.id}/quotations`, {
              headers: authHeaders(),
            })
          )
        );

        const totalQuotes = quotationResults.reduce(
          (total, quotations) => total + quotations.length,
          0
        );

        setQuotesReceived(totalQuotes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const openRFQs = rfqs.filter((rfq) => rfq.status === "OPEN");

  if (loading) {
    return (
      <div className="app-shell">
        <AppNavbar />
        <div className="dashboard-page">
          <h1>Buyer Dashboard</h1>
          <p>Loading your RFQs...</p>
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
          <h1>Buyer Dashboard</h1>
          <p>Manage your RFQs and review supplier quotations.</p>
        </div>

        <Link to="/rfqs/new" className="primary-btn">
          + Create New RFQ
        </Link>
      </div>
      

      {error && <p className="auth-error">{error}</p>}

      <div className="dashboard-stats">
        <div className="stat-card">
          <span>Total RFQs</span>
          <strong>{rfqs.length}</strong>
        </div>

        <div className="stat-card">
          <span>Open RFQs</span>
          <strong>{openRFQs.length}</strong>
        </div>

        <div className="stat-card">
          <span>Quotes Received</span>
          <strong>{quotesReceived}</strong>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>My RFQs</h2>

        {rfqs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No RFQs yet</h3>
            <p>Create your first Request for Quotation to get started.</p>

            <Link to="/rfqs/new" className="primary-btn">
              Create an RFQ
            </Link>
          </div>
        ) : (
          <div className="rfq-list">
            {rfqs.map((rfq) => (
              <div className="rfq-card" key={rfq.id}>
                <div>
                  <h3>{rfq.title}</h3>
                  <p>{rfq.description}</p>

                  <div className="rfq-meta">
                    <span>Quantity: {rfq.quantity}</span>
                    <span>Location: {rfq.location}</span>
                    <span>Status: {rfq.status}</span>
                  </div>
                </div>

                <Link
                  to={`/rfqs/${rfq.id}`}
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

export default BuyerDashboard;