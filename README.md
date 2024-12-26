<div align="center">
  <h1>ShopSphere Frontend</h1>
</div>

---

# ShopSphere E-Commerce Website Frontend

## Introduction

ShopSphere is an all-in-one e-commerce platform that allows users to browse products, manage orders, and connect with vendors. The frontend of ShopSphere provides a seamless user experience with features like advanced product filtering, cart management, and responsive design.

## Project Description

The ShopSphere frontend is built with Next.js and TypeScript, using Tanstack Query for state management and ShadCN for modern, customizable UI components. It integrates Context API for authentication and global state, ensuring a scalable and efficient architecture. TailwindCSS is utilized for a sleek, responsive design.

## Features

- User Features:
  - Browse products with advanced filtering and sorting options.
  - Add items to the cart and checkout with secure payment options.
  - View order history and leave reviews for purchased products.
  - Compare up to three products from the same category.
- Vendor Features:
  - Manage shops and products (add, edit, or delete).
  - View and respond to customer reviews.
  - Track order history for better inventory management.
- Admin Features:
  - Manage users, vendors, and product categories.
  - Monitor transactions and platform activities.
- Other Features:
  - Follow specific shops for personalized product prioritization.
  - Recent products page to view recently browsed items.
  - Responsive design for an optimized experience across devices.

## Technology Stack

- Next.js
- React
- TypeScript
- TailwindCSS
- ShadCN
- Tanstack Query
- React Hook Form
- Zod

## Installation Guideline

### Prerequisites

Before running the application, ensure you have the following installed:

- Node.js

### Installation Steps

1. Clone the repository to your local machine:

```bash
https://github.com/asifrkabir/batch-3-assignment-9-client-asifrkabir
```

2. Navigate to the project directory:

```bash
cd batch-3-assignment-9-client-asifrkabir
```

3. Install dependencies:

```bash
npm install
```

### Configuration

1. Create a `.env.local` file in the root directory of the project.
2. Add the following environment variables to the `.env.local` file:

```bash
NEXT_PUBLIC_BASE_API={}
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY={}
```

Adjust the values to match your application.

## Usage

To start the application, run the following command:

```bash
npm run dev
```

The application will be running at http://localhost:3000.
