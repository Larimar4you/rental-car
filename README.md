# RentalCar

A car rental web application built with Next.js and TypeScript. Users can browse available cars, filter vehicles, load more results, view car details, and submit booking requests.

## Live Demo

## Live Demo

- **Live application:** https://rental-car-plum-three.vercel.app/
- **Source code:** https://github.com/Larimar4you/rental-car
- **API documentation:** https://car-rental-api.goit.study/api-docs/
- **Design:** [Figma](https://www.figma.com/design/A25LdVK3gZOPJaedrkTwWQ/Rental-Car)

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- TanStack Query (`useInfiniteQuery`)
- CSS Modules
- React Icons
- React Hot Toast

## Features

### Home Page

- Hero section with a call-to-action button.
- Navigation to the car catalog.

### Car Catalog

- Fetches available vehicles from the backend API.
- Server-side filtering by brand, rental price, and mileage.
- Independent minimum and maximum mileage filters.
- Load More pagination using TanStack Query.
- Opens car details in a new browser tab.
- Loading and empty-result states.

### Car Details

- Displays vehicle information, specifications, features, and rental conditions.
- Shows a vehicle image.
- Provides a booking request form.
- Validates form fields and displays error messages.
- Sends booking requests to the backend.
- Displays success and error notifications.

## Application Routes

| Route              | Description                             |
| ------------------ | --------------------------------------- |
| `/`                | Home page                               |
| `/catalog`         | Car catalog with filters and pagination |
| `/catalog/[carId]` | Individual car details and booking form |

## Architecture Overview

The application uses Next.js App Router for navigation and a component-based architecture.

- **Server Components:** Retrieve individual car details.
- **Client Components:** Handle interactive filters, pagination, and booking forms.
- **TanStack Query:** Manages catalog requests, pagination, and query caching.
- **API layer:** Centralizes HTTP requests in `lib/api.ts`.
- **CSS Modules:** Provide component-scoped styling.

### Data Flow

```text
Home
  |
  v
Catalog
  |
  +--> Filters --> API --> Filtered results
  |
  +--> Load More --> API --> Additional cars
  |
  v
Car Details
  |
  v
Booking Form --> API --> Success notification
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Larimar4you/rental-car.git
cd rental-car
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Backend API

The application uses the public Rental Car API.

Main endpoints:

- `GET /cars`
- `GET /cars/filters`
- `GET /cars/{id}`
- `POST /cars/{carId}/booking-requests`

API documentation: https://car-rental-api.goit.study/api-docs/

## Deployment

The application is deployed on Vercel.

**Production URL:** https://rental-car-plum-three.vercel.app/

## Author

**Lara Kosta**

GitHub: https://github.com/Larimar4you
