# Technical Test - Frontend Application

This project is a frontend application built using Next.js, developed as part of a technical assessment. It demonstrate management of a task list.

## Table of Contents

-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Environment Variables](#environment-variables)
    -   [Installation](#installation)
    -   [Running the Development Server](#running-the-development-server)
-   [Dependencies](#dependencies)
-   [Contact](#contact)

## Features

-   **Create Tasks:** Users can create new tasks with a title and optional description.
-   **View Task List:** Users can view a list of all created tasks.
-   **Mark Tasks as Complete:** Users can mark tasks as complete, visually distinguishing them from incomplete tasks.
-   **Delete Tasks:** Users can delete tasks from the list.
-   **Browser Notification:** Users will receive a notification via the browser when a task is due that day.
-   **Responsive Design:** The application is designed to be responsive and work well on various screen sizes (desktops, tablets, and mobile devices).
-   **Database Storage Persistence:** Task data is persisted in the database's storage, so tasks are not lost when the page is refreshed.
- **Authentication:** User can login and logout to the application using google acount.

## Getting Started

This section will guide you through setting up and running the project locally.

### Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js:** - [https://nodejs.org/](https://nodejs.org/)
-   **npm** (usually comes with Node.js) or **yarn** or **pnpm** or **bun**
-   **Git** (for cloning the repository)

### Environment Variables

This project requires environment variables to be set for proper functionality, especially for authentication.

1.  **Create a `.env.local` file:** In the root directory of the project (`technical-test-fe-app`), create a file named `.env.local`.

2.  **Add the following variables:**

    ```bash
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_random_secret_key
    NEXT_PUBLIC_BASE_API_URL=http://localhost:5000/api
    ```

    *   **`GOOGLE_CLIENT_ID`:** Your Google OAuth Client ID.
    *   **`GOOGLE_CLIENT_SECRET`:** Your Google OAuth Client Secret.
    *   **`NEXTAUTH_SECRET`:** A secret string used to encrypt the NextAuth.js JWT. Generate a strong random string for this.
    * **`NEXTAUTH_URL`:** The base URL of your application. For local development, it's usually `http://localhost:3000`.
    * **`DATABASE_URL`:** The connection string for your database.

3.  **Obtain Google Credentials:**
    *   Go to the Google Cloud Console (https://console.cloud.google.com/).
    *   Create a new project or select an existing one.
    *   Go to "APIs & Services" -> "Credentials."
    *   Create OAuth 2.0 credentials and configure the consent screen.
    *   Copy the Client ID and Client Secret and paste them into your `.env.local` file.

4.  **Restart the Development Server:** After creating and configuring the `.env.local` file, restart the development server for the changes to take effect.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/mrafid01/technical-test-fe-app.git
    cd technical-test-fe-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```



### Running the Development Server

Once the dependencies are installed, you can start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Dependencies

This project utilizes the following key dependencies:

*   **React:** The core library for building user interfaces.
*   **Next.js:** The React framework for building the application.
*   **Next-Auth:** The Authentication library for Next.js that supports multiple authentication providers.
*   **Tailwind CSS:** Tailwind CSS for styling.
*   **Axios:** Axios for making API requests.
*   **And so on...**

## Contact

Muhammad Rafid - rafid.muhammad12@gmail.com
