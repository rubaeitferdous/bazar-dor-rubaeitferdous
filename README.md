# বাজার দর | BazarDor

BazarDor is a responsive Bangla grocery and commodity price marketplace built with Next.js. The app helps users explore daily market prices, filter products by category, view price trends, and access protected product detail pages. It also includes login/signup flows with BetterAuth and a clean, mobile-friendly UI.

## Project Description

This project was created to match the assignment requirements in the public instruction file. It presents a marketplace-style interface for everyday essentials such as rice, vegetables, fish, and other household goods, with a Bengali-first design and price-sensitive product browsing.

## Technologies Used

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- DaisyUI
- BetterAuth
- MongoDB
- React Hot Toast

## Key Features

1. Responsive navbar with category navigation, auth actions, and animated price ticker.
2. Hero banner section with CTA linking to the all-products section on the same page.
3. Price trend sections for products whose prices increased or decreased today.
4. Dynamic product grid with category filtering, sorting, and loading skeletons.
5. Protected product detail pages with market summaries and bazar-based pricing information.
6. Authentication pages for sign in and sign up using email and social login options.
7. User profile and update information flow.
8. 404 page, friendly empty states, and toast notifications for error and success messages.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

### Production build

```bash
npm run build
npm run start
```

## Project Structure

```text
src/
  app/            # App Router pages and routes
  components/     # Reusable UI components
  lib/            # Auth, utilities, and shared logic
public/
  instruction.md  # Assignment instructions
  images/        # Project assets
```

## Notes

- The app is designed to be mobile, tablet, and desktop friendly.
- The design follows the provided Bengali marketplace concept and assignment requirements.
- The project includes a complete authentication flow, protected routes, and category/product browsing experience.
