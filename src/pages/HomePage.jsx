function HomePage() {
  return (
    <div className="home-page">
      <nav className="navbar">
        <a href="/" className="logo">
          RFQ<span>·</span>
        </a>

        <div className="nav-links">
          <a href="/login">Sign In</a>
          <a href="/register" className="signup-btn">
            Get Started <span>↗</span>
          </a>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <div className="badge">
            <span className="badge-dot"></span>
            B2B PROCUREMENT PLATFORM
          </div>

          <h1>
            Procurement,
            <br />
            <span>reimagined.</span>
          </h1>

          <p>
            Connect buyers with trusted suppliers, publish requirements,
            discover opportunities, and get competitive quotations — all in
            one streamlined marketplace.
          </p>

          <div className="hero-buttons">
            <a href="/register" className="primary-btn hero-primary">
              Start sourcing <span>↗</span>
            </a>

            <a href="/login" className="secondary-btn hero-secondary">
              Sign in
            </a>
          </div>

          <div className="hero-trust">
            <span>BUILT FOR BUSINESS</span>
            <i></i>
            <span>FAST</span>
            <i></i>
            <span>TRANSPARENT</span>
          </div>
        </div>
      </main>

      <section className="features">
        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>
            Everything you need to
            <br />
            <strong>move business forward.</strong>
          </h2>
        </div>

        <div className="feature-card">
          <div className="feature-number">01</div>
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M9 9h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <h3>Post Requirements</h3>
          <p>
            Create detailed RFQs with quantities, deadlines, locations and
            specific business requirements.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-number">02</div>
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <h3>Discover Opportunities</h3>
          <p>
            Suppliers can browse open requirements and find relevant business
            opportunities.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-number">03</div>
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 16v3M12 11v8M18 7v12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </div>
          <h3>Compare Quotations</h3>
          <p>
            Submit competitive offers and give buyers everything they need to
            make better sourcing decisions.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
