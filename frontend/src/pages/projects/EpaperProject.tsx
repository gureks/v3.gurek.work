import React, { useEffect } from 'react';
import { ProjectSection } from '../../components/case-study/ProjectSection';
import { ProjectHero } from '../../components/case-study/ProjectHero';
import { ProjectMetrics } from '../../components/case-study/ProjectMetrics';
import { ProjectGallery } from '../../components/case-study/ProjectGallery';
import { Carousel } from '../../components/case-study/Carousel';
import { useChatStore } from '../../store/useChatStore';
import { useLocation } from 'react-router-dom';

const imgImage = "/assets/projects/epaper/hero.png";
const imgImage6 = "/assets/projects/epaper/gallery1.png";
const imgImage5 = "/assets/projects/epaper/gallery2.png";
const imgImage7 = "/assets/projects/epaper/gallery3.png";

export const EpaperProject: React.FC = () => {
  const location = useLocation();
  const { setActiveSession } = useChatStore();

  useEffect(() => {
    setActiveSession(location.pathname);
  }, [location.pathname, setActiveSession]);

  return (
    <div className="w-full h-full flex flex-col bg-[var(--background)]">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-[800px] mx-auto px-4 py-8 flex flex-col gap-6">
          
          {/* 1. Hero Bubble */}
          <ProjectSection role="system">
            <ProjectHero 
              title="Making ePapers Actually Readable."
              subtitle=" How we improved ET's ePaper experience for print-first readers in a digital world"
              imageUrl={imgImage}
            />
          </ProjectSection>

          {/* 2. Disclaimer */}
          <ProjectSection role="system">
            <div className="flex gap-3 items-start">
              <div className="shrink-0 size-5 text-[var(--foreground-muted)] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-1A6 6 0 1 0 8 2a6 6 0 0 0 0 12zM7 7h2v5H7V7zm1-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
              </div>
              <p className="text-[12px] leading-[16px] text-[var(--foreground-muted)] m-0">
                This is a showcase of a professional project undertaken under Times Internet Limited. <br />
                I don’t own any of it, all sensitive information has been redacted or edited while ensuring accuracy.
              </p>
            </div>
          </ProjectSection>

          {/* 3. User Bubble */}
          <ProjectSection role="user">
            <p className="m-0">Quick TL;DR first, please!</p>
          </ProjectSection>

          {/* 4. Intro Text */}
          <ProjectSection role="system">
            <p className="m-0">This project was about balancing print nostalgia with digital usability. By iterating across two levels of release, embedding editorial authenticity, and keeping 45+ readers at the center, we turned ET’s ePaper into a product that feels both modern yet familiar.</p>
          </ProjectSection>

          {/* 5. Metrics */}
          <ProjectSection role="system" noPadding>
            <ProjectMetrics 
              metrics={[
                { value: '+37% ↑', label: 'Retention Rate', trend: 'positive' },
                { value: '- 40% ↓', label: 'Reported Friction', trend: 'negative' },
                { value: '+21% ↑', label: 'Subscription Conversion', trend: 'positive' }
              ]}
            />
          </ProjectSection>

          {/* 6. My Role */}
          <ProjectSection role="system">
            <p className="m-0">I led research, defined the core features, designed the interactions and the user interface, and produced prototypes to capture feedback and usability decisions, aligning improvements with retention goals, resolving technical bottlenecks.</p>
          </ProjectSection>

          {/* 7. User Bubble */}
          <ProjectSection role="user">
            <p className="m-0">How did the project initiate?</p>
          </ProjectSection>

          {/* 8. Context Text */}
          <ProjectSection role="system">
            <p className="m-0">The Economic Times is India’s largest business daily with 4M+ readers. The ePaper is a flagship offering, designed to bring the print-reading experience online for loyal subscribers.</p>
          </ProjectSection>
          
          <ProjectSection role="system">
            <p className="m-0">In 2023, we relaunched the ET ePaper as TIL acquired the digital extension of the iconic print from BCCL Group.</p>
          </ProjectSection>

          {/* 9. Initial Release Text */}
          <ProjectSection role="system">
            <p className="m-0">Initial Release:</p>
          </ProjectSection>

          {/* 10. Gallery */}
          <div className="pl-[var(--avatar-md)] ml-[var(--space-4)]">
             <ProjectGallery 
                items={[
                  { imageUrl: imgImage6, caption: 'Quick Launch ePaper Landing' },
                  { imageUrl: imgImage5, caption: 'Elements in Hover and Focus' },
                  { imageUrl: imgImage7, caption: 'Paywall Blocker' }
                ]}
             />
          </div>

          {/* 11. User Bubble */}
          <ProjectSection role="user">
            <p className="m-0">How did the users take it? What were the feedbacks?</p>
          </ProjectSection>

          {/* 12. Feedback Text */}
          <ProjectSection role="system">
            <p className="m-0">The qualitative feedback was strong! The user’s didn’t accomodate with the suddent change!</p>
          </ProjectSection>

          {/* 13. Feedback Blocks */}
          <ProjectSection role="system">
            <div className="flex flex-col gap-4">
              <div className="border-l-2 border-[#ff4a4a] pl-2 text-[14px]">Covers most of the screen</div>
              <div className="border-l-2 border-[#ff4a4a] pl-2 text-[14px]">Just give us PDF download instead</div>
              <div className="border-l-2 border-[#ff9e4a] pl-2 text-[14px]">Abrupt paywall interruptions</div>
              <div className="border-l-2 border-[#ff9e4a] pl-2 text-[14px]">Takes forever to load</div>
              <div className="border-l-2 border-[#ff4a4a] pl-2 text-[14px]">Small fonts & clunky zoom</div>
              <div className="border-l-2 border-[#ff4a4a] pl-2 text-[14px]">Disrupts the “flipping a newspaper” expectation</div>
            </div>
          </ProjectSection>

          {/* 14. Hotfix */}
          <ProjectSection role="system">
             <p className="text-[14px] m-0">We had to rollout a <span className="font-bold italic">Quick Hotfix</span></p>
          </ProjectSection>

          {/* 15. Carousel */}
          <div className="pl-[var(--avatar-md)] ml-[var(--space-4)] w-full overflow-hidden">
             <Carousel 
               slides={[
                 {
                   image: imgImage6,
                   caption: "Coachmarks for first-time users",
                   description: "Guided new readers: how to zoom, navigate, and download PDFs.\nReduced first-use confusion."
                 },
                 {
                   image: imgImage6,
                   caption: "Coachmarks for first-time users",
                   description: "Guided new readers: how to zoom, navigate, and download PDFs.\nReduced first-use confusion."
                 }
               ]}
             />
          </div>

          {/* End padding to allow scrolling past last item comfortably */}
          <div className="h-[100px]" />
        </div>
      </div>
    </div>
  );
};

export default EpaperProject;
