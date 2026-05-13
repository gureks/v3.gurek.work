import { useAppStore } from '../../store/useAppStore';
import { SearchIcon, NightmodeIcon, ShareIcon, PhoneIcon } from '../../assets/custom-icons';
import { HEADER_CTA } from '../../config/nav.config';

export function Header() {
  const { theme, setTheme } = useAppStore();

  return (
    <header className="border-b border-solid border-[var(--border-subtle)] flex-col items-end justify-center px-4 md:px-6 relative w-full hidden md:flex" style={{ minHeight: '60px', height: '60px' }} aria-label="Site header">
      <div className="flex gap-2 items-center justify-center relative shrink-0">
        {/* Icon Buttons */}
        <button className="flex items-center justify-center transition-colors hover:bg-black/10 dark:hover:bg-white/10 text-foreground backdrop-blur-[4px] shrink-0" style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--background-elevated)', padding: '8px' }}>
          <SearchIcon size={20} />
        </button>
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center justify-center transition-colors hover:bg-black/10 dark:hover:bg-white/10 text-foreground backdrop-blur-[4px] shrink-0" 
          style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--background-elevated)', padding: '8px' }}>
          <NightmodeIcon size={20} />
        </button>
        <button className="flex items-center justify-center transition-colors hover:bg-black/10 dark:hover:bg-white/10 text-foreground backdrop-blur-[4px] shrink-0" style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--background-elevated)', padding: '8px' }}>
          <ShareIcon size={20} />
        </button>

        {/* CTA Button */}
        {HEADER_CTA.visible && (
          <a
            href={HEADER_CTA.href}
            className="flex items-center justify-center transition-opacity hover:opacity-90 overflow-clip shrink-0"
            style={{
              width: '125px',
              height: '36px',
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-foreground)',
              gap: '4px',
              fontSize: '14px',
              fontWeight: 500,
              boxShadow: '0px 0px 15px -2px var(--accent)',
            }}
          >
            <span className="leading-[16px]">{HEADER_CTA.label}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.93555 1.91602C7.21864 1.916 7.49603 2.00051 7.73047 2.15918C7.96491 2.31788 8.1458 2.54381 8.25098 2.80664L9.45703 5.82129C9.57779 6.123 9.5914 6.4572 9.49512 6.76758C9.39676 7.08449 9.19281 7.33478 8.92773 7.52637L7.27832 8.625C7.32219 8.81473 7.36755 9.00334 7.42871 9.18848C7.61124 9.73872 7.98397 10.4918 8.74609 11.2539C9.50802 12.0157 10.2603 12.3887 10.8096 12.5713C10.979 12.6273 11.1521 12.6693 11.3252 12.7119L11.7031 11.9551C11.8387 11.6843 12.0573 11.4636 12.3271 11.3262C12.5971 11.1888 12.9043 11.1416 13.2031 11.1914L16.8994 11.8076C17.2301 11.8628 17.5313 12.0332 17.748 12.2891C17.9648 12.5449 18.083 12.8698 18.083 13.2051V16.8486C18.083 17.4949 17.6359 18.0907 16.9482 18.1953C15.1046 18.474 9.68985 18.8471 5.4209 14.5781C1.15191 10.3089 1.52422 4.89381 1.80371 3.05078C1.90759 2.36354 2.50492 1.91607 3.15137 1.91602H6.93555ZM2.97754 3.08301L2.94727 3.29688C2.68843 5.0817 2.42838 9.93614 6.24609 13.7539C10.0635 17.5711 14.9163 17.3107 16.7021 17.0527L16.917 17.0215V12.9932L16.708 12.959L13.0117 12.3418L12.8291 12.3115L12.7461 12.4766L12.1885 13.5938C12.1401 13.6905 12.0656 13.7722 11.9736 13.8291C11.7721 13.9537 11.5215 13.9105 11.2988 13.8848C11.084 13.8532 10.79 13.794 10.4404 13.6777C9.74014 13.4435 8.82528 12.9825 7.9209 12.0781C7.1297 11.2868 6.67741 10.488 6.41992 9.83105C6.30663 9.5181 6.20448 9.2042 6.14355 8.87598C6.1137 8.69274 6.09454 8.51059 6.08301 8.3252C6.08419 8.23183 6.10831 8.14003 6.15234 8.05762C6.19754 7.97311 6.26311 7.90091 6.34277 7.84766L8.28027 6.55566L8.44922 6.44336L7.16797 3.24023L7.10547 3.08301H2.97754Z" fill="currentColor"/>
            </svg>
          </a>
        )}

        {/* User Pill */}
        {/* <div className="hidden sm:flex items-center shrink-0 border border-solid border-[var(--border)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] max-w-[180px]" style={{ height: '36px', padding: '8px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--background-elevated)', gap: '8px' }}>
          <div className="flex items-center justify-center font-medium text-[color:var(--foreground)]" style={{ width: '20px', height: '20px', borderRadius: '32px', backgroundColor: 'var(--accent)', fontSize: '7.375px', lineHeight: '10px' }}>AB</div>
          <span className="font-normal text-[color:var(--foreground-muted)] whitespace-nowrap" style={{ fontSize: '14px', lineHeight: '20px' }}>FirstName</span>
          <PhoneIcon size={20} />
        </div> */}
      </div>
    </header>
  );
}
