import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest, authHeaders } from "../api";
import AppNavbar from "../components/AppNavbar";

function RFQDetailsPage() {
  const { id } = useParams();

  const [rfq, setRfq] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [quotesError, setQuotesError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isSupplier = user?.role === "SUPPLIER";
  const isBuyer = user?.role === "BUYER";
  const isOwner = isBuyer && rfq?.buyerId === user?.id;

  useEffect(() => {
    const loadRFQ = async () => {
      try {
        const data = await apiRequest(`/rfqs/${id}`, {
          headers: authHeaders(),
        });

        setRfq(data);

        if (isBuyer) {
          try {
            const quoteData = await apiRequest(
              `/rfqs/${id}/quotations`,
              {
                headers: authHeaders(),
              }
            );

            setQuotations(quoteData);
          } catch (err) {
            setQuotesError(err.message);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRFQ();
  }, [id, isBuyer]);

  const handleCloseRFQ = async () => {
    setMessage("");
    setError("");

    try {
      const data = await apiRequest(`/rfqs/${id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          status: "CLOSED",
        }),
      });

      setRfq(data.rfq);
      setMessage("RFQ closed successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleQuotationSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      await apiRequest(`/rfqs/${id}/quotations`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          price: Number(price),
          deliveryTime,
          notes,
        }),
      });

      setMessage("Quotation submitted successfully!");
      setPrice("");
      setDeliveryTime("");
      setNotes("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="details-page">
        <AppNavbar />
        <div className="details-container">
          <p>Loading RFQ...</p>
        </div>
      </div>
    );
  }

  if (error && !rfq) {
    return (
      <div className="details-page">
        <AppNavbar />
        <div className="details-container">
          <p className="auth-error">{error}</p>
          <Link
            to={isSupplier ? "/supplier" : "/buyer"}
            className="secondary-btn"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      <AppNavbar />
      <div className="details-container">
        <div className="details-header">
          <div>
            <span className="status-badge">{rfq.status}</span>
            <h1>RFQ Details</h1>
            <p>Request for quotation information</p>
          </div>

          <Link
            to={isSupplier ? "/supplier" : "/buyer"}
            className="secondary-btn"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="rfq-details-card">
          <h2>Product / Service</h2>
          <p className="detail-value">{rfq.title}</p>

          <div className="detail-grid">
            <div>
              <span>Quantity</span>
              <strong>{rfq.quantity}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{rfq.location}</strong>
            </div>

            <div>
              <span>Deadline</span>
              <strong>
                {new Date(rfq.deadline).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </strong>
            </div>
          </div>

          <div className="description-section">
            <h3>Description</h3>
            <p>{rfq.description}</p>
          </div>
        </div>

        {isOwner && rfq.status === "OPEN" && (
          <div style={{ marginTop: "24px" }}>
            <button
              type="button"
              className="primary-btn"
              onClick={handleCloseRFQ}
            >
              Close RFQ
            </button>
          </div>
        )}

        {isBuyer && (
          <div className="quote-card">
            <h2>Supplier Quotations</h2>

            {quotesError && (
              <p className="auth-error">{quotesError}</p>
            )}

            {!quotesError && quotations.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">💬</div>
                <h3>No quotations received yet</h3>
                <p>
                  Supplier quotations will appear here when suppliers
                  respond to this RFQ.
                </p>
              </div>
            )}

            {quotations.length > 0 && (
              <div className="rfq-list">
                {quotations.map((quote) => (
                  <div className="rfq-card" key={quote.id}>
                    <div>
                      <h3>{quote.supplier.name}</h3>

                      <p>{quote.supplier.email}</p>

                      <div className="rfq-meta">
                        <span>Price: ₹{quote.price}</span>
                        <span>
                          Delivery: {quote.deliveryTime}
                        </span>
                      </div>

                      {quote.notes && (
                        <p>
                          <strong>Notes:</strong> {quote.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {isSupplier && rfq.status === "OPEN" && (
          <div className="quote-card">
            <h2>Submit Your Quotation</h2>
            <p>
              Interested suppliers can submit their quotation for this RFQ.
            </p>

            <form onSubmit={handleQuotationSubmit}>
              <label>Price</label>
              <input
                type="number"
                placeholder="Enter your price"
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <label>Delivery Time</label>
              <input
                type="text"
                placeholder="e.g. 15 days"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                required
              />

              <label>Additional Notes</label>
              <textarea
                rows="4"
                placeholder="Add any additional information..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>

              {error && <p className="auth-error">{error}</p>}

              {message && <p>{message}</p>}

              <button
                type="submit"
                className="primary-btn"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Quotation"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default RFQDetailsPage;