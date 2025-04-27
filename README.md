# Alanto AI - Ego Genesis

A modern web application for creating AI twins. This project allows users to create their digital alter egos through an intuitive form interface.

## Features

- Modern, responsive UI with gradient animations
- Form validation and error handling
- Webhook integration for data submission
- Beautiful glass-morphism design elements
- Express server for handling form submissions

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Framer Motion
- Express.js (for the server component)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/shattrex/alanto-ego-genesis.git
cd alanto-ego-genesis
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development servers:
```bash
# Terminal 1 - Start the frontend
npm run dev
# or
yarn dev

# Terminal 2 - Start the backend server
node server.cjs
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend.
   The backend server will be running on [http://localhost:3001](http://localhost:3001).

## Environment Variables

Create a `.env` file in the root directory and add the following variables:
```
MAKE_WEBHOOK_URL=your_webhook_url
```

## Project Structure

- `src/` - Frontend React application
- `server.cjs` - Express server for handling form submissions
- `public/` - Static assets
- `components.json` - shadcn/ui configuration
- `tailwind.config.ts` - Tailwind CSS configuration

## Deployment

The frontend can be deployed on any static hosting service (Vercel, Netlify, etc.).
The backend server can be deployed on any Node.js hosting service (Railway, Render, etc.).

## License

MIT License - feel free to use this code for your own projects.
