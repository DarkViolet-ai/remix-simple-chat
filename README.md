# A simple chat demo app

This is a simple chat demo app built with remix, langchain, and redis.
This utilizes the remix template from https://github.com/EvanMarie/blank_remix_tailwind_template

## Features

User navigates to chat and begins chatting with a bot of your choosing. This project shows how to use DeepInfra, TogetherAI, or OpenAI as the chat llm provider.

There is a simple exmple at the route /chat that shows how to use the chatbot.

There is a slightly more complex example at the route /chat/with-terms-and-retrieval that shows how to use a chatbot that implements a user terms of service and a retrieval based chatbot.

You will need to define the following environment variables in a .env file in the root of the project:

```bash
REDIS_URL # a redis url, e.g. redis://localhost:6379
DEEP_INFRA_API_KEY # from https://deepinfra.com
TOGETHER_AI_API_KEY # from https://www.together.ai
COOKIE_SECRET # a random string
PINECONE_API_KEY # from https://www.pinecone.io
```

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
```

2. Install dependencies:

```bash
cd <project-directory>
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

Your project should now be running on [http://localhost:3000](http://localhost:3000).
