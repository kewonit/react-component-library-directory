# React Component Libraries Directory

A curated directory of the best React component libraries

## Features

- Browse and filter libraries by category and search query
- View previews, descriptions, and tags for each library
- Open library homepages directly from component cards
- Responsive design with sticky filters and lazy-loaded images

## Getting Started

### Prerequisites

- Node.js >= 14.x
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/kewonit/react-component-library-directory.git
cd react-component-library-directory
# Install dependencies
npm install  # or yarn install
```

### Development

```bash
# Start development server
npm run dev
```

Navigate to http://localhost:3000 to view the app.

### Build & Production

```bash
npm run build
npm start
```

## Project Structure

```
app/                # Next.js App Router pages and layout
	components/       # Shared UI components (Footer, ComponentCard, etc.)
	page.tsx          # Home directory page with filters
lib/                # Data and utility functions
public/             # Static assets (icons, images)
types/              # TypeScript type definitions
components.json     # shadcn UI config
next.config.ts      # Next.js configuration
README.md           # This file
```

## Contributing

Thank you for your interest in contributing! To get started:

1. Fork this repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to your fork: `git push origin feature/your-feature`
5. Open a Pull Request against the `main` branch

Please ensure your code follows the existing style (Prettier, ESLint) and include meaningful commit messages.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
