import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest, authHeaders } from "../api";
import AppNavbar from "../components/AppNavbar";

function CreateRFQPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await apiRequest("/rfqs", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          title,
          description,
          quantity: Number(quantity),
          location,
          deadline: new Date(deadline).toISOString(),
        }),
      });

      navigate(`/rfqs/${data.rfq.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <AppNavbar />
      <div className="form-container">
        <h1>Create a New RFQ</h1>
        <p>
          Tell suppliers what you need and receive competitive quotations.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Product / Service Name</label>
          <input
            type="text"
            placeholder="e.g. Office Chairs"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            placeholder="Describe your requirements..."
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <label>Quantity</label>
          <input
            type="number"
            placeholder="Enter quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <label>Location</label>
          <input
            type="text"
            placeholder="e.g. Chennai"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label>Quotation Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish RFQ"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRFQPage;