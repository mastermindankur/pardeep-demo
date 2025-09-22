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
*   **Hosting:** Firebase App Hosting

## Getting Started

To get started with the application, explore the different sections using the sidebar navigation:

1.  **Dashboard:** Get a high-level overview of key risk metrics.
2.  **Risk Assessment:** Interact with the autonomous AI agent to assess a new outsourcing arrangement.
3.  **SLA Monitor:** View the performance of your service providers.
4.  **Action Tracker:** See all open and closed action items.
5.  **Documents:** Manage your compliance-related documents.

To run this project locally, take a look at `src/app/page.tsx`.
