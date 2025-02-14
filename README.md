# Chatterbox

Chatterbox is a lightweight, fast, and intelligent AI-powered assistant built with Next.js, React, and Bun. It integrates multiple AI models and web search capabilities for enhanced responses.

## Features

- Supports multiple AI models (GPT-4o Mini, Gemini 2.0 Flash, etc.).
- Web search integration for real-time information.
- Trending topics component.
- Smooth UI with React and Tailwind CSS.

## Installation

### Prerequisites

- [Bun](https://bun.sh/) installed
- Node.js (if not using Bun)
- Git

### Clone the Repository

```sh
git clone git@github.com:jackkslash/chatterbox.git
cd chatterbox
```

### Install Dependencies

```sh
bun install
```

## Environment Variables

Create a `.env` file in the root directory and add the following:

```
OPENAI_API_KEY=your_openai_key
TAVILY_API_KEY=your_tavily_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_key
```

You can use the provided `.env.example` as a reference.

## Running the App

```sh
bun dev
```

## Building for Production

```sh
bun run build
bun run start
```
## License

This project is licensed under the MIT License.
