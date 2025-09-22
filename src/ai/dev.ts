import { config } from 'dotenv';
config();

import '@/ai/flows/generate-sla-summary.ts';
import '@/ai/flows/assess-outsourcing-risk.ts';
import '@/ai/tools/compliance-actions.ts';
