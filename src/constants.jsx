import {
  Compass,
  ShieldCheck,
  FileText,
  GraduationCap,
  Settings,
  Type,
  MessageSquare,
  BookOpenCheck,
  BrainCircuit,
} from "lucide-react";
import visualOverview from "./assets/img/InnovationMaturityScale.png";
import selfAssessment from "./assets/self-assessment.svg";
import crossFunctionalRoles from "./assets/cross-functional-roles.svg";
import dataStrategy from "./assets/data-strategy.svg";
import innovativeEngine from "./assets/innovative-engine.svg";
import innovativeLab from "./assets/innovative-lab.svg";
import female1 from "./assets/female1.svg";
import female2 from "./assets/female2.svg";
import male1 from "./assets/male1.svg";
import male2 from "./assets/male2.svg";
// import male3 from "./assets/male3.svg";
import female3 from "./assets/female3.svg";

export const leveledReports = [
  {
    id: 1,
    title: "Level 1 Report & Pathway",
    description: "Foundation overview & next steps.",
    label: "Download PDF",
    url: "#1",
  },
  {
    id: 2,
    title: "Level 2 Report & Pathway",
    description: "Process alignment & adoption.",
    label: "Download PDF",
    url: "#2",
  },
  {
    id: 3,
    title: "Level 3 Report & Pathway",
    description: "Data integration & training.",
    label: "Download PDF",
    url: "#3",
  },
  {
    id: 4,
    title: "Level 4 Report & Pathway",
    description: "Measurement & optimization.",
    label: "Download PDF",
    url: "#4",
  },
  {
    id: 5,
    title: "Level 5 Report & Pathway",
    description: "Scale & continuous improvement.",
    label: "Download PDF",
    url: "#5",
  },
];

export const generativeAiToolkit = [
  {
    id: 1,
    title: "Where to Begin: White Paper",
    description: "Foundational overview of readiness & ethical guardrails.",
    label: "Open",
    url: "https://drive.google.com/file/d/10Qjb4Z0uEjBiFwm-reM-s1vxa7zzWzb6/view",
    icon: Compass,
  },
  {
    id: 2,
    title: "Beginners’ Safety AI Guide",
    description: "Practical tips for safe, policy-aligned use of AI tools.",
    label: "Open",
    url: "https://drive.google.com/file/d/1eZUrxA-WH1yqyz4eTxjguAI8crdQK-QX/view?usp=drive_link",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "AI Use and Security Policy (Template)",
    description: "Customizable policy template for organizations.",
    label: "Open",
    url: "https://docs.google.com/document/d/1TEy7RC9VXCe6n3oVdWUzXLJwlrXyVDkk/edit?usp=drive_link&ouid=107551734381166809249&rtpof=true&sd=true",
    icon: FileText,
  },
  {
    id: 4,
    title: "Staff Training: AI Guidelines (Deck)",
    description: "Onboard teams to responsible AI.",
    label: "Open",
    url: "https://docs.google.com/presentation/d/1M9AHgIctEl9zTz9fc-4pYubtPoMBiKgk/edit?usp=drive_link&ouid=107551734381166809249&rtpof=true&sd=true",
    icon: GraduationCap,
  },
  {
    id: 5,
    title: "Customizing AI: White Paper",
    description: "Tailor AI to workflows without sacrificing safety.",
    label: "Open",
    url: "https://drive.google.com/file/d/169mPw220AwQlaY6HBcEp3k_u5p-3LoiP/view?usp=sharing",
    icon: Settings,
  },
  {
    id: 6,
    title: "AI Style Guide",
    description: "Tone, voice, and formatting for AI-assisted writing.",
    label: "Open",
    url: "https://drive.google.com/file/d/1rWQC4K4qrJl1Yyd_pme5Wdnnb3qrY7-V/view?usp=sharing",
    icon: Type,
  },
  {
    id: 7,
    title: "AI Prompt Guide",
    description: "Reference for crafting effective prompts.",
    label: "Open",
    url: "https://drive.google.com/file/d/1OjXjLoB82ASPSpYUdLMcbnTkx7OSR9Sz/view?usp=sharing",
    icon: MessageSquare,
  },
  {
    id: 8,
    title: "Mini Prompt Workbook (Interactive)",
    description: "Hands-on exercises to level up prompting.",
    label: "Open",
    url: "https://drive.google.com/file/d/1ZYdPQgGY_z8tkc3-vEIOj13AEuNavQ0N/view?usp=sharing",
    icon: BookOpenCheck,
  },
  {
    id: 9,
    title: "AI Prompt Use Cases",
    description: "Curated examples for senior living.",
    label: "Open",
    url: "https://drive.google.com/file/d/1U8jLjiCKf073isOP8qybNh_9Z0GmSGI3/view?usp=sharing",
    icon: BrainCircuit,
  },
];

export const innovationRoadmapStrategicPlanning = [
  {
    id: 1,
    title: "Roadmap & Strategic Plan Overview",
    description: "Visual overview of the innovation journey.",
    label: "Download PDF",
    url: "#1",
  },
  {
    id: 2,
    title: "Case Study: Scaling AI Across Sites",
    description: "How multi-site deployments took hold.",
    label: "Read Case Study",
    url: "#2",
  },
  {
    id: 3,
    title: "AI Impact Measurement Toolkit",
    description: "Executive toolkit for value tracking.",
    label: "Download PDF",
    url: "#3",
  },
  {
    id: 4,
    title: "AI Governance Refresh Checklist",
    description: "Keep policies current and actionable.",
    label: "Download Checklist",
    url: "#4",
  },
  {
    id: 5,
    title: "Future of Generative AI: White Paper",
    description: "Trends, risks, and opportunities ahead.",
    label: "Download PDF",
    url: "#5",
  },
  {
    id: 6,
    title: "Innovation Showcase Webinar",
    description: "Replay & resources.",
    label: "Watch Replay",
    url: "#6",
  },
];

export const pillars = [
  {
    id: 1,
    title: "AI Readiness: Data & Systems",
    description:
      "Begin here. Assess your current state, understand the innovation journey, and unlock a tailored pathway before exploring the toolkit.",
    subcontents: [
      {
        id: 1,
        title: "Innovation Maturity Scale (Visual Overview)",
        description:
          "A high-level view of the stages from Foundation to Scale. Use this to orient leadership and teams.",
        img: visualOverview,
        href: "",
        type: "",
        label: "View Overview", // 👈 dynamic button label
        url: "https://drive.google.com/file/d/18SncT2B5sH7klUFvtvViVws5_dgbn6Lb/view", // 👈 link for button
        items: [],
      },
      {
        id: 2,
        title: "AI Readiness & Data Maturity Self Assessment",
        description:
          "Gauge your current maturity to unlock a tailored Level 1–5 pathway report.",
        img: selfAssessment,
        href: "",
        type: "",
        component: true, // 👈 indicates this subcontent uses a component (not a link)
        items: [],
      },
      {
        id: 3,
        title: "Leveled Reports",
        description: "",
        items: leveledReports,
      },
      // {
      //   id: 4,
      //   title: "Platform Excellence Committees",
      //   description:
      //     "Define cross‑functional roles and rituals to sustain innovation momentum and governance.",
      //   img: crossFunctionalRoles,
      //   href: "",
      //   type: "",
      //   items: [],
      // },
      // {
      //   id: 5,
      //   title: "",
      //   description: "",
      //   img:"",
      //   // title: "Data Strategy Playbook",
      //   // description:
      //   //   "A practical roadmap for data governance, quality, and interoperability to enable AI at scale.",
      //   // img: dataStrategy,
      //   href: "",
      //   type: "",
      //   items: [],
      // },
      // {
      //   id: 6,
      //   title: "Innovation Engine",
      //   description:
      //     "Bright Solutions’ methodology for moving from pilots to scalable, measurable outcomes across sites.",
      //   img: innovativeEngine,
      //   href: "",
      //   type: "",
      //   items: [],
      // },
      {
        id: 7,
        title: "Innovation Lab",
        description:
          "A sandbox to pilot solutions, test assumptions, and accelerate adoption with real‑world feedback loops.",
        img: innovativeLab,
        href: "",
        type: "",
        items: [],
      },
    ],
  },
  {
    id: 2,
    title: "Generative AI Toolkit Overview",
    description:
      "Practical resources for day‑to‑day AI use. Each item links out to its full content.",
    subcontents: generativeAiToolkit,
  },
  // {
  //   id: 3,
  //   title: "Innovation Roadmap & Strategy",
  //   description:
  //     "Turn pilots into practice with governance, measurement and culture.",
  //   subcontents: innovationRoadmapStrategicPlanning,
  // },
];

export const assessmentQuestions = [
  {
    id: 1,
    question: "Data & Technology Foundation",
    options: [
      { id: 1, grade: 1, text: "A. Manual processes / paper records" },
      { id: 2, grade: 2, text: "B. Some digital systems, limited connections" },
      { id: 3, grade: 3, text: "C. Most data in digital systems" },
      {
        id: 4,
        grade: 4,
        text: "D. Integrated platfrms, data driven decisions",
      },
      { id: 5, grade: 5, text: "E. Fully integrated tech + real-time data" },
    ],
  },
  {
    id: 2,
    question: "AI Awareness and Vision",
    options: [
      { id: 1, grade: 1, text: "A. Little AI knowledge" },
      { id: 2, grade: 2, text: "B. Interested but no formal plan" },
      { id: 3, grade: 3, text: "C. AI vision + leadership buy-in" },
      { id: 4, grade: 4, text: "D. Actively pilotong AI use-cases" },
      { id: 5, grade: 5, text: "E. Rolling out multiple AI org-wide" },
    ],
  },
  {
    id: 3,
    question: "Data Quality, Security & Strategy",
    options: [
      { id: 1, grade: 1, text: "A. No rules / data standards" },
      { id: 2, grade: 2, text: "B. Informal procedures (early stage)" },
      { id: 3, grade: 3, text: "C. Guard trails / formal framework" },
      { id: 4, grade: 4, text: "D. Robust evolving framework" },
      { id: 5, grade: 5, text: "E. Large, secure data hub + AI-ready" },
    ],
  },
];

export const userTestimonials = [
  {
    id: 1,
    name: "Maria Santos",
    avatar: female1,
    rating: 5,
    message:
      "The service exceeded my expectations! Everything was smooth and on time.",
  },
  {
    id: 2,
    name: "John Rivera",
    avatar: male1,
    rating: 4,
    message:
      "Amazing experience. The team was very professional and helpful throughout the process.",
  },
  {
    id: 3,
    name: "Alyssa Tan",
    avatar: female2,
    rating: 2.5,
    message:
      "I highly recommend them. Customer support was responsive and friendly.",
  },
  {
    id: 4,
    name: "Kevin Dela Cruz",
    avatar: male2,
    rating: 1,
    message:
      "Smooth transaction from start to finish. Will definitely book again!",
  },
  {
    id: 5,
    name: "Sarah Lim",
    avatar: female3,
    rating: 3,
    message:
      "Great value and reliable service. My items arrived earlier than expected.",
  },
];
