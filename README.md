# ✈️ Flight Booking Wizard

A modern and elegant flight booking wizard built with Next.js 14, TypeScript, and Tailwind CSS. The project implements a multi-step form for flight reservations, featuring real-time validation and a smooth user experience.

[Live Demo](https://avila-tek-test-front.vercel.app/)

## 🏗️ Architecture

The project is structured following Atomic Design principles:

```
src/
  ├── components/
  │   ├── atoms/        # Base components (Button, Input, Select, etc.)
  │   ├── molecules/    # Combinations of atoms (DateRangePicker, FlightClassSelect)
  │   ├── organisms/    # Complete sections (TravelInfoForm, TravelersForm)
  │   └── templates/    # Page layouts and structures
  ├── app/             # Next.js pages and routes
  └── types/           # TypeScript definitions
```

## 🚀 Core Technologies

- **Next.js 14**: React framework with App Router and Server Components
- **TypeScript**: Static typing for better maintainability
- **Tailwind CSS**: CSS utilities for modern and responsive design
- **React Hook Form**: Efficient form handling with validation
- **React Use Wizard**: Step navigation control for the wizard

## ✨ Features

- Multi-step form with real-time validation
- Responsive and mobile-first design
- Destination selection with autocomplete
- Custom date picker
- Traveler, pet, and luggage management
- Automatic cost calculation
- Detailed booking summary
- Beautiful UI with smooth transitions
- Form state persistence between steps

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd avila-tek-test-front
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Start the development server:

```bash
yarn dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Demo

Check out the live demo at:
[https://avila-tek-test-front.vercel.app/](https://avila-tek-test-front.vercel.app/)

## 👨‍💻 Author

**Angel Morante**

- Email: morante413@gmail.com
- Portfolio: [https://bento.me/angel-morante](https://bento.me/angel-morante)

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
