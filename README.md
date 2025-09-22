# RiskCheck AI: Autonomous Outsourcing Risk & Compliance

This is a Next.js application built in Firebase Studio that demonstrates the power of autonomous AI agents for complex business workflows. This application, "RiskCheck AI," is designed for outsourcing risk and compliance management.

## Key Features

*   **Autonomous Risk Assessment:** Delegate complex risk assessments to an AI agent that analyzes outsourcing arrangements, quantifies risks across multiple domains (operational, compliance, data, regulatory), and determines the required level of review.
*   **Agentic Actions:** The AI agent doesn't just analyze—it acts. For high-risk scenarios, it can autonomously create action items in a tracker and generate draft formal review documents, streamlining the compliance workflow.
*   **Continuous Monitoring:** A second AI agent monitors the status of created action items, ensuring accountability and timely completion, and escalating when necessary.
*   **SLA Performance Monitoring:** Keep track of Service Level Agreements with outsourced providers, with AI-generated summaries to highlight breaches and prepare for review meetings.
*   **Centralized Hubs:** Manage all compliance-related documents and action items in dedicated, easy-to-use interfaces.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) with App Router
*   **AI/Generative:** [Genkit](https://firebase.google.com/docs/genkit) (Google's generative AI toolkit) with Gemini models
*   **UI:** [ShadCN UI](https://ui.shadcn.com/) & [Tailwind CSS](https://tailwindcss.com/)
*   **Deployment:** [Netlify](https://www.netlify.com/)

## Getting Started

To get started with the application, explore the different sections using the sidebar navigation:

1.  **Dashboard:** Get a high-level overview of key risk metrics.
2.  **Risk Assessment:** Interact with the autonomous AI agent to assess a new outsourcing arrangement.
3.  **SLA Monitor:** View the performance of your service providers.
4.  **Action Tracker:** See all open and closed action items.
5.  **Documents:** Manage your compliance-related documents.

## Local Development

To run this project locally, you will need to have Node.js and npm installed.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    The application runs two processes: the Next.js frontend and the Genkit AI flows.

    In one terminal, start the Next.js development server:
    ```bash
    npm run dev
    ```
    This will start the web application on [http://localhost:9002](http://localhost:9002).

    In a second terminal, start the Genkit development server:
    ```bash
    npm run genkit:watch
    ```
    This will start the AI flows and make them available to the application. It will also auto-reload on changes.

## Deployment to Netlify

This project is configured for easy deployment to Netlify.

1.  **Push your code to a Git provider** (GitHub, GitLab, Bitbucket).
2.  **Create a new site on Netlify** by importing your Git repository.
3.  **Configure Build Settings:** Netlify should automatically detect that this is a Next.js project and use the settings from the `netlify.toml` file.
    *   **Build command:** `npm run build`
    *   **Publish directory:** `.next`
4.  **Add Environment Variable:** This is the most important step for the AI features to work.
    *   Go to your site's dashboard on Netlify.
    *   Navigate to **Site configuration > Environment variables**.
    *   Click **Add a variable**.
    *   For the **Key**, enter `GEMINI_API_KEY`.
    *   For the **Value**, paste your actual Gemini API key.
5.  **Deploy:** Trigger a new deployment from the Netlify UI. Your site will be built and deployed with the AI functionality configured.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
