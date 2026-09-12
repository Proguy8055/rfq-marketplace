# B2B RFQ Marketplace

A full-stack B2B Request for Quotation (RFQ) marketplace where buyers can post business requirements and suppliers can discover RFQs and submit quotations.

## Live Application

https://rfq-marketplace-two.vercel.app

## GitHub Repository

https://github.com/Proguy8055/rfq-marketplace

---

## Features

### Buyer

- Register and log in as a Buyer
- Create RFQs
- View submitted RFQs
- View RFQ details
- Edit RFQs
- Close RFQs
- View quotations submitted by suppliers
- View supplier details and quotation information

### Supplier

- Register and log in as a Supplier
- Browse open RFQs
- Search RFQs by product, description, or location
- View RFQ details
- Submit quotations
- View previously submitted quotations

### Authentication & Security

- JWT-based authentication
- Password hashing using bcrypt
- Role-based access control for Buyers and Suppliers
- Protected frontend routes
- Protected backend API endpoints
- Input validation using express-validator
- Users can only manage their own RFQs

### User Experience

- Responsive B2B dashboard interface
- Loading states
- Empty states
- Error messages
- Form validation
- Search functionality
- Buyer and Supplier specific dashboards

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- REST API
- JWT
- bcryptjs
- express-validator

### Database

- PostgreSQL
- Neon PostgreSQL
- Prisma ORM

### Deployment

- Vercel — Frontend
- Render — Backend API
- Neon — PostgreSQL database

---

## Project Structure

```text
rfq-marketplace/
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   └── src/
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── quotation.controller.js
│       │   ├── rfq.controller.js
│       │   └── user.controller.js
│       │
│       ├── middleware/
│       │   ├── auth.middleware.js
│       │   └── validation.middleware.js
│       │
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── quotation.routes.js
│       │   ├── rfq.routes.js
│       │   └── user.routes.js
│       │
│       ├── utils/
│       │   └── prisma.js
│       │
│       ├── app.js
│       └── server.js
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── api.js
│   ├── App.jsx
│   └── App.css
│
├── vercel.json
├── package.json
└── README.md