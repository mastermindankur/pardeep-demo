import type { Assessment, Sla, ActionItem, Document } from './types';

export const assessments: Assessment[] = [
  {
    id: '1',
    service: 'Cloud Data Processing',
    provider: 'DataStax Inc.',
    date: '2024-07-15',
    riskScore: 85,
    isHighRisk: true,
  },
  {
    id: '2',
    service: 'Customer Support Chatbot',
    provider: 'Global AI Solutions',
    date: '2024-07-10',
    riskScore: 45,
    isHighRisk: false,
  },
  {
    id: '3',
    service: 'HR Payroll System',
    provider: 'PeopleFirst Corp',
    date: '2024-06-28',
    riskScore: 65,
    isHighRisk: false,
  },
  {
    id: '4',
    service: 'Network Security Monitoring',
    provider: 'CyberSafe Ltd.',
    date: '2024-06-20',
    riskScore: 92,
    isHighRisk: true,
  },
];

export const slas: Sla[] = [
  {
    id: 'sla-1',
    provider: 'DataStax Inc.',
    metric: 'API Uptime',
    target: '99.95%',
    actual: '99.91%',
    status: 'Breached',
  },
  {
    id: 'sla-2',
    provider: 'DataStax Inc.',
    metric: 'Data Processing Time',
    target: '< 100ms',
    actual: '95ms',
    status: 'Met',
  },
  {
    id: 'sla-3',
    provider: 'Global AI Solutions',
    metric: 'Chatbot Response Time',
    target: '< 2s',
    actual: '1.8s',
    status: 'Met',
  },
  {
    id: 'sla-4',
    provider: 'PeopleFirst Corp',
    metric: 'Payroll Accuracy',
    target: '99.99%',
    actual: '99.99%',
    status: 'Met',
  },
    {
    id: 'sla-5',
    provider: 'CyberSafe Ltd.',
    metric: 'Threat Detection Time',
    target: '< 5 min',
    actual: '4 min 30s',
    status: 'Met',
  },
    {
    id: 'sla-6',
    provider: 'CyberSafe Ltd.',
    metric: 'Incident Response Time',
    target: '< 15 min',
    actual: '16 min 20s',
    status: 'At Risk',
  },
];

export const actionItems: ActionItem[] = [
  {
    id: 'act-1',
    description: 'Review DataStax Inc. SLA breach for Q2.',
    assignedTo: 'Compliance Team',
    dueDate: '2024-08-01',
    status: 'In Progress',
  },
  {
    id: 'act-2',
    description: 'Finalize CyberSafe Ltd. contract renewal.',
    assignedTo: 'Legal Dept.',
    dueDate: '2024-07-30',
    status: 'Open',
  },
  {
    id: 'act-3',
    description: 'Complete audit of Global AI Solutions data handling.',
    assignedTo: 'Internal Audit',
    dueDate: '2024-07-25',
    status: 'Closed',
  },
  {
    id: 'act-4',
    description: 'Schedule Q3 review with PeopleFirst Corp.',
    assignedTo: 'Service Delivery',
    dueDate: '2024-08-15',
    status: 'Open',
  },
];

export const documents: Document[] = [
    {
        id: 'doc-1',
        name: 'DataStax_MSA_2024.pdf',
        type: 'PDF',
        size: '2.5 MB',
        lastModified: '2024-01-15'
    },
    {
        id: 'doc-2',
        name: 'CyberSafe_SOC2_Report.pdf',
        type: 'PDF',
        size: '5.1 MB',
        lastModified: '2024-03-20'
    },
    {
        id: 'doc-3',
        name: 'GlobalAI_DP_Agreement.docx',
        type: 'DOCX',
        size: '450 KB',
        lastModified: '2024-02-10'
    },
    {
        id: 'doc-4',
        name: 'Q2_SLA_Performance_Review.pptx',
        type: 'PPTX',
        size: '10.2 MB',
        lastModified: '2024-07-05'
    }
]
