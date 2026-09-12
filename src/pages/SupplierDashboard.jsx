import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest, authHeaders } from "../api";
import AppNavbar from "../components/AppNavbar";

function SupplierDashboard() {
  const [rfqs, setRfqs] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [rfqData, quoteData] = await Promise.all([
          apiRequest("/rfqs", {
            headers: authHeaders(),
          }),
          apiRequest("/quotations/mine", {
            headers: authHeaders(),
          }),
        ]);

        setRfqs(rfqData);
        setQuotes(quoteData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const filteredRFQs = rfqs.filter((rfq) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      rfq.title.toLowerCase().includes(searchText) ||
      rfq.description.toLowerCase().includes(searchText) ||
      rfq.location.toLowerCase().includes(searchText)
    );
  });

  if (loading) {
    return (
      <div className="app-shell">
        <AppNavbar />
        <div className="dashboard-page">
          <h1>Supplier Dashboard</h1>
          <p>Loading opportunities...</p>
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
            <h1>Supplier Dashboard</h1>
            <p>
              Discover business opportunities and manage your quotations.
            </p>
          </div>

          <Link to="/supplier" className="secondary-btn">
            Browse RFQs
          </Link>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <div className="dashboard-stats">
          <div className="stat-card">
            <span>Available RFQs</span>
            <strong>{rfqs.length}</strong>
          </div>

          <div className="stat-card">
            <span>My Quotes</span>
            <strong>{quotes.length}</strong>
          </div>

          <div className="stat-card">
            <span>Accepted Quotes</span>
            <strong>0</strong>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <div>
              <h2>Available RFQs</h2>
              <p>Search by product, description, or location.</p>
            </div>
          </div>

          <input
            type="text"
            className="search-input"
            placeholder="Search RFQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {rfqs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔎</div>
              <h3>No RFQs available</h3>
              <p>
                New buyer requirements will appear here when they are posted.
              </p>
            </div>
          ) : filteredRFQs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No matching RFQs</h3>
              <p>Try searching for a different product or location.</p>
            </div>
          ) : (
            <div className="rfq-list">
              {filteredRFQs.map((rfq) => (
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

export default SupplierDashboard;