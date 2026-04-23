export type UserRole = 'HR_Recruiter' | 'Hiring_Manager' | 'Founder_CXO' | 'Designer_Peer' | null;

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  template_id?: string;
  response_type?: 'page' | 'project_redirect' | 'faq' | string;
  metadata?: {
    slug?: string;
    page?: string;
    download_url?: string;
    [key: string]: unknown;
  };
  isTyping?: boolean;
}

export type GemCategory = 'AI Innovations' | 'Growth & UX' | 'Design Systems' | 'Leadership';
