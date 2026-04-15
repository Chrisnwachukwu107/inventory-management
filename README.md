# Inventory Management System

A modern, full-stack inventory management solution built with Next.js and TypeScript. Track products, monitor stock levels, and gain valuable insights into your inventory in real-time.

## Features

### Core Functionality

- **User Authentication**: Secure authentication using Stack Auth with user-specific inventory management
- **Product Management**: Add, view, update, and delete products with detailed information including name, price, quantity, SKU, and custom stock level alerts
- **Real-Time Inventory Tracking**: Monitor stock levels across all products with automatic categorization (in stock, low stock, out of stock)
- **Advanced Search**: Search products by name with case-insensitive filtering
- **Pagination**: Efficient product listing with customizable pagination (5 items per page)

### Dashboard Analytics

- **Key Metrics Dashboard**: Display total products, low stock count, and total inventory value
- **Stock Level Visualization**: Visual breakdown of product distribution (in stock, low stock, out of stock percentages)
- **Weekly Trend Charts**: ReCharts-powered visualizations showing product creation trends over the past 12 weeks
- **Recent Products**: Quick view of 5 most recently added products
- **Low Stock Alerts**: Automatic alerts for products below custom thresholds

### User Experience

- **Responsive Design**: Mobile-first approach with Tailwind CSS for seamless experience across all devices
- **Loading States**: Skeleton loaders for improved perceived performance
- **Intuitive Navigation**: Sidebar-based navigation with dashboard, inventory, and settings pages
- **Empty States**: Helpful prompts when no products exist

## Tech Stack

- **Frontend**: Next.js 16.1 (App Router), React 19, TypeScript 5
- **Backend**: Node.js with Edge compatibility via PostgreSQL Adapter
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS 4 with PostCSS
- **Authentication**: Stack Auth
- **Charts**: ReCharts for data visualization
- **Validation**: Zod for schema validation
- **Icons**: Lucide React
- **Linting**: ESLint

## Installation & Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Set up environment variables
# Create a .env.local file with your PostgreSQL connection string

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```
