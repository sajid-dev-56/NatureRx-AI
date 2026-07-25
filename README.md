<div align="center">
  
# 🌿 NatureRx AI

**An AI-Powered Organic Health & Wellness Assistant**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## 📖 Project Overview

**NatureRx AI** is an intelligent healthcare assistant designed to provide users with evidence-based natural remedies using herbs, plants, fruits, vegetables, and other commonly available household ingredients. Instead of immediately suggesting chemical-based products, the platform first recommends scientifically supported natural alternatives whenever appropriate.

**Disclaimer:** *The system does not replace doctors or emergency medical care. Its purpose is to educate users about safe home remedies, healthy lifestyle practices, preventive care, and natural wellness solutions.*

---

## 🎯 Problem Statement

Millions of people search the internet every day for natural remedies. Unfortunately:
- Many websites share unverified or misleading information.
- Social media is full of unsafe "home remedies."
- Users often cannot determine whether a remedy is scientifically supported.
- There is a lack of platforms capable of visually identifying plants and providing immediate medical benefits or warnings.

**NatureRx AI** bridges this gap by acting as a beautiful, interactive, and AI-driven portal to the natural world.

---

## ✨ Core Features & How They Work

### 1. 🎙️ Voice-Enabled AI Consultations (`/chat`)
- **How it works:** Users can text or use the **Web Speech API** to directly speak their symptoms into the platform. 
- **AI Logic:** The AI analyzes the symptoms and provides scientifically backed natural remedies (e.g., Ginger tea for a sore throat). It actively filters for emergency keywords (like "chest pain") and immediately advises seeking professional medical help.

### 2. 📸 AI Plant Image Analyzer (`/analyze`)
- **How it works:** Users can drag-and-drop or upload a photo of any plant or herb.
- **Visuals:** Features a premium "laser scanning" animation using `framer-motion` to simulate the AI analyzing the plant's genetics.
- **Results Dashboard:** Provides the plant's exact identification, a confidence score, medicinal benefits, and a dedicated **Precautions & Side Effects** section. It also performs a "Health Check" on the plant itself to detect diseases like powdery mildew or overwatering.

### 3. 📚 Plant Encyclopedia (`/encyclopedia`)
- **How it works:** A beautifully designed, searchable database of medicinal plants, trees, and herbs.
- Users can learn about the history, chemical properties, and safe usage of different plants. Includes an animated ❤️ **Favorite Button** to save plants to a personal library.

### 4. 🍵 Remedies Database (`/remedies`)
- **How it works:** A curated list of specific recipes (e.g., Turmeric Golden Milk) for common ailments. Each remedy displays its "Evidence Level" (e.g., Strong Evidence, Traditional Use) to ensure users are well-informed.

### 5. 🌓 Adaptive Glassmorphism UI
- **Design System:** The entire application is built with a stunning, modern **Glassmorphism** design aesthetic using Tailwind CSS. 
- **Dark Mode:** Supports seamless Dark/Light mode switching via `next-themes`, ensuring the UI looks gorgeous in any environment without flickering.

---

## 🛠️ Technology Stack

This project was built with modern web development best practices focusing on a premium user experience and high performance.

| Technology | Purpose |
| :--- | :--- |
| **Next.js 15 (App Router)** | Full-stack React framework for optimized routing and server-side rendering. |
| **React 19** | Component-based UI library. |
| **TypeScript** | Static typing for robust and error-free code. |
| **Tailwind CSS** | Utility-first CSS framework used for building the Glassmorphism UI and responsive layouts. |
| **Framer Motion** | Powerful animation library used for the AI scanning laser, page transitions, and micro-interactions (like the Favorite button). |
| **Lucide React** | Beautiful, consistent iconography used throughout the app. |
| **Next-Themes** | For flawless dark/light mode integration. |
| **Web Speech API** | Native browser API used for the voice-to-text functionality in the Chat interface. |

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sajid-dev-56/NatureRx-AI.git
   cd NatureRx-AI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the App:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🌐 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository.
2. Import the repository into your Vercel Dashboard.
3. Click **Deploy**. Vercel will automatically handle the build and hosting!

---

<div align="center">
  <i>Built with ❤️ for a healthier, natural world.</i>
</div>
