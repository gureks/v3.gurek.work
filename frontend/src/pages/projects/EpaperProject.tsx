/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import type { ChatSequenceMessage } from '../ChatPage';

const imgHero = "/assets/projects/epaper/fd0b2da01413441fa046b98efad20c7c55b55f14.png";
const imgGallery1 = "/assets/projects/epaper/d4123ebfa4c539388d400a85481fcceb5e993461.png";
const imgGallery2 = "/assets/projects/epaper/41e09793433b45b9c8081456eadc21626c133ee4.png";
const imgGallery3 = "/assets/projects/epaper/fa4b546ba10e88a37dfcd800ea625d4f26be7742.png";
const imgNav = "/assets/projects/epaper/be2f1f08ea575301384326d28e5ab95ab0d5caf0.png";
const imgHover = "/assets/projects/epaper/869094679510620ff170af856c8d6337ca645458.png";
const imgDigital = "/assets/projects/epaper/72642e1920b10e67221a38960d3490cbcd93b3db.png";
const imgError = "/assets/projects/epaper/939ffb0cb7c493174be6a4f5f1306b2534efd507.png";
const imgPaywall = "/assets/projects/epaper/6d3767d3ca7ced56164686d306a4bdaca91ab849.png";
const imgTopBar = "/assets/projects/epaper/248f12bf961947638cee851c868e0210541c801c.png";
const imgCoach = "/assets/projects/epaper/8ebfe55f691ef331306334b37181b5d028ac1397.png";
const imgPageFlip = "/assets/projects/epaper/18b08b452d1ab29d4fa30e4b274d5e2d5a269c96.png";
const imgCta = "/assets/projects/epaper/c8ff4798b0bdf7b53de03a7016f987e3d712617d.png";
const imgFree = "/assets/projects/epaper/d47380dc4b7b2d68e37b0235deed9fa0a24496e3.png";
const imgPaywallFlow = "/assets/projects/epaper/5a6714049dae51216e0f5334531d0695c887ebcd.png";

// BubbleWrapper used for components that don't have a dedicated richContentType yet (like outcomes)
const BubbleWrapper = ({ children, noPadding }: { children: React.ReactNode, noPadding?: boolean }) => (
  <div
    className="text-foreground flex flex-col"
    style={{
      padding: noPadding ? '0' : 'var(--space-4)',
      borderRadius: '0 var(--radius-lg) var(--radius-lg) var(--radius-lg)',
      backgroundColor: 'var(--background-tooltip)',
      border: '1px solid var(--border)',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      width: '100%',
      overflow: 'hidden'
    }}
  >
    {children}
  </div>
);

export const epaperSequence: ChatSequenceMessage[] = [
  {
    role: 'assistant',
    content: '',
    richContentType: 'hero',
    richContentData: {
      title: "Making ePapers Actually Readable.",
      subtitle: " How we improved ET's ePaper experience for print-first readers in a digital world",
      imageUrl: imgHero
    },
    delayMs: 800
  },
  {
    role: 'assistant',
    content: '',
    richContentType: 'disclaimer',
    richContentData: "This is a showcase of a professional project undertaken under Times Internet Limited. \nI don’t own any of it, all sensitive information has been redacted or edited while ensuring accuracy.",
    delayMs: 500
  },
  {
    role: 'user',
    content: "Quick TL;DR first, please!",
    delayMs: 600
  },
  {
    role: 'assistant',
    content: "This project was about balancing print nostalgia with digital usability. By iterating across two levels of release, embedding editorial authenticity, and keeping 45+ readers at the center, we turned ET’s ePaper into a product that feels both modern yet familiar.",
    delayMs: 800
  },
  {
    role: 'assistant',
    content: '',
    richContentType: 'metrics',
    richContentData: [
      { value: '+37% ↑', label: 'Retention Rate', trend: 'positive' },
      { value: '- 40% ↓', label: 'Reported Friction', trend: 'negative' },
      { value: '+21% ↑', label: 'Subscription Conversion', trend: 'positive' }
    ],
    delayMs: 600
  },
  {
    role: 'assistant',
    content: "I led research, defined the core features, designed the interactions and the user interface, and produced prototypes to capture feedback and usability decisions, aligning improvements with retention goals, resolving technical bottlenecks.",
    delayMs: 800
  },
  {
    role: 'user',
    content: "How did the project initiate?",
    delayMs: 600
  },
  {
    role: 'assistant',
    content: "The Economic Times is India’s largest business daily with 4M+ readers. The ePaper is a flagship offering, designed to bring the print-reading experience online for loyal subscribers.",
    delayMs: 800
  },
  {
    role: 'assistant',
    content: "In 2023, we relaunched the ET ePaper as TIL acquired the digital extension of the iconic print from BCCL Group.",
    delayMs: 600
  },
  {
    role: 'assistant',
    content: "Initial Release:",
    richContentType: 'gallery',
    richContentData: [
      { imageUrl: imgGallery1, caption: 'Quick Launch ePaper Landing' },
      { imageUrl: imgGallery2, caption: 'Elements in Hover and Focus' },
      { imageUrl: imgGallery3, caption: 'Paywall Blocker' }
    ],
    delayMs: 1200
  },
  {
    role: 'assistant',
    content: '',
    richContentType: 'carousel',
    richContentData: [
      {
        image: imgGallery1,
        caption: "Coachmarks for first-time users",
        description: "Guided new readers: how to zoom, navigate, and download PDFs.\nReduced first-use confusion."
      },
      {
        image: imgGallery1,
        caption: "Coachmarks for first-time users",
        description: "Guided new readers: how to zoom, navigate, and download PDFs.\nReduced first-use confusion."
      },
      {
        image: imgGallery1,
        caption: "Coachmarks for first-time users",
        description: "Guided new readers: how to zoom, navigate, and download PDFs.\nReduced first-use confusion."
      }
    ],
    delayMs: 800
  },
  {
    role: 'user',
    content: "How did the users take it? What were the feedbacks?",
    delayMs: 600
  },
  {
    role: 'assistant',
    content: "The qualitative feedback was strong! The user’s didn’t accomodate with the suddent change!",
    delayMs: 800
  },
  {
    role: 'assistant',
    content: '',
    richContentType: 'feedback',
    richContentData: [
      { label: 'Covers most of the screen', subtitle: 'Just give us PDF download instead', type: 'critical' },
      { label: 'Abrupt paywall interruptions', subtitle: 'Takes forever to load', type: 'warning' },
      { label: 'Small fonts & clunky zoom', subtitle: 'Disrupts the “flipping a newspaper” expectation', type: 'critical' }
    ],
    delayMs: 800
  },
  {
    role: 'assistant',
    content: '',
    component: (
      <BubbleWrapper>
         <p className="text-[14px] m-0">We had to rollout a <span className="font-bold italic">Quick Hotfix</span></p>
      </BubbleWrapper>
    ),
    delayMs: 600
  },
  {
    role: 'assistant',
    content: "Improvements Introduced:",
    richContentType: 'gallery',
    richContentData: [
      { imageUrl: imgNav, caption: 'Navigation optimized for smaller screens' },
      { imageUrl: imgHover, caption: 'Improved Hover States' },
      { imageUrl: imgDigital, caption: 'Switchable Digital View' },
      { imageUrl: imgError, caption: 'Better Error & Empty States' },
      { imageUrl: imgPaywall, caption: 'Simpler Paywall Copywriting' }
    ],
    delayMs: 1200
  },
  {
    role: 'assistant',
    content: '',
    richContentType: 'carousel',
    richContentData: [
      {
        image: imgTopBar,
        caption: "Top bar navigation",
        description: "Inspired by actual newspaper headers: “Front Page”, “Times Nation”, “Times City”."
      },
      {
        image: imgCoach,
        caption: "Coachmarks for first-time users - Reduced first-use confusion.",
        description: "Guided new readers: how to zoom, navigate, and download PDFs."
      },
      {
        image: imgFree,
        caption: "Free Preview Refined - Paid vs free download states clearly differentiated.",
        description: "Timer bar showed free preview duration → added transparency."
      },
      {
        image: imgPaywallFlow,
        caption: "Paywall Flows Redefined - Clear value proposition, to conversion transfer",
        description: "Removed the redundant plans page causing additional confusion"
      },
      {
        image: imgPageFlip,
        caption: "Page Flip Navigation",
        description: "For users looking to skip directly to their page"
      },
      {
        image: imgTopBar,
        caption: "Bottom bar redesign - Aligned with accessibility for 45+ users.",
        description: "Larger, high-contrast icons for Search, Zoom, Download."
      },
      {
        image: imgCta,
        caption: "On-hover CTA simplified - Lower cognitive load.",
        description: "Replaced red overlay with a subtle grey highlight + “Read this Article” button."
      }
    ],
    delayMs: 800
  },
  {
    role: 'user',
    content: "So, what were the outcomes?",
    delayMs: 600
  },
  {
    role: 'assistant',
    content: "This project set a foundation rather than a finish line.",
    delayMs: 800
  },
  {
    role: 'assistant',
    content: "A targetted group user research of 40+ regular readers led to key insights into how people consume, curate, and access their daily knowledge.",
    delayMs: 800
  },
  {
    role: 'assistant',
    content: '',
    component: (
      <BubbleWrapper>
        <div className="flex flex-col gap-4">
          <div className="bg-[var(--background-elevated)] p-4 rounded-lg">
            <p className="m-0 font-bold">Users expect digital to behave like physical print paper</p>
            <p className="m-0 text-[var(--foreground-muted)]">Jakob’s Law of Familiarity</p>
          </div>
          <div className="bg-[var(--background-elevated)] p-4 rounded-lg">
            <p className="m-0 font-bold">Tiny buttons, hard to reach</p>
            <p className="m-0 text-[var(--foreground-muted)]">Fitt’s Law</p>
          </div>
          <div className="bg-[var(--background-elevated)] p-4 rounded-lg">
            <p className="m-0 font-bold">Print hierarchy must be preserved</p>
            <p className="m-0 text-[var(--foreground-muted)]">Navigation should mirror newspaper sections</p>
          </div>
          <div className="bg-[var(--background-elevated)] p-4 rounded-lg">
            <p className="m-0 font-bold">Paywall experiments</p>
            <p className="m-0 text-[var(--foreground-muted)]">System status invisible, abrupt paywalling caused frustration, especially with older readers.</p>
          </div>
        </div>
      </BubbleWrapper>
    ),
    suggestions: ["Back to projects", "Tell me about another project"],
    delayMs: 1000
  }
];
