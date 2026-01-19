import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

// ============================================
// FLOATING ACTION BUTTON ICONS
// ============================================

export function CalendarIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 19"
      fill="none"
      width={size}
      height={size * 0.95}
      {...props}
    >
      <g fill="currentColor">
        <path d="m19.4588 5.60905v-2.40546c0-.43636-.3546-.79091-.7909-.79091h-3.42v-1.23273c0-.447269-.4419-.807269-.9928-.807269s-.9927.36-.9927.807269v1.23273h-6.51818v-1.23273c0-.447269-.44182-.807269-.99273-.807269s-.99273.36-.99273.807269v1.23273h-3.42c-.436363 0-.790908.35455-.790908.79091v2.40546z" />
        <path d="m.541992 6.73816v11.00724c0 .4364.354546.7909.790908.7909h17.3291c.4364 0 .7909-.3545.7909-.7909v-11.00724zm14.029108 4.63634-5.37274 4.2437c-.18.1418-.39819.2127-.61637.2127-.29454 0-.58363-.1309-.78-.3764l-2.54727-3.2072c-.33818-.431-.26727-1.0528.15818-1.3964.43091-.3382 1.05273-.2673 1.39637.1582l1.9309 2.4272 4.59823-3.62723c.4309-.33818 1.0527-.26727 1.3909.16364.3381.43089.2672 1.05269-.1637 1.39089z" />
      </g>
    </svg>
  );
}

export function DocumentIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 20"
      fill="none"
      width={size}
      height={size * 1.25}
      {...props}
    >
      <path
        d="m14.087.618164h-12.17459c-.55636 0-1.00909.452726-1.00909 1.009086v16.74545c0 .5564.45273 1.0091 1.00909 1.0091h12.17459c.5563 0 1.009-.4527 1.009-1.0091v-16.74545c0-.55636-.4527-1.009086-1.009-1.009086zm-1.9419 13.821836h-8.28542v-1.3637h8.28542zm0-3.7582h-8.28542v-1.36364h8.28542zm0-3.75818h-8.28542v-1.36364h8.28542z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ExternalLinkIcon({ size = 11, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 11 11"
      fill="none"
      width={size}
      height={size}
      {...props}
    >
      <g stroke="currentColor" strokeLinecap="square" strokeWidth="1.28267">
        <path d="m8.39322 6.71185v3.38625h-7.524079v-7.50362h3.395479" strokeLinejoin="round" />
        <path d="m10.0904 4.78737v-3.886491h-3.89704" strokeLinejoin="round" />
        <path d="m4.55371 6.42196 5.18326-5.16915" strokeMiterlimit="10" />
      </g>
    </svg>
  );
}

export function ButtonArrowIcon({ size = 12, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M5 12h14M12 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ============================================
// LOGO ICONS
// ============================================

export function LogoLarge({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 263 24" className={className} {...props}>
      <path
        d="m13.243 3.418-1.077 20.376h4.387l.27-21.811-3.58 1.435ZM30.415 6.38 24.71.196l1.57 23.776h2.988L28.064 7.07 30.954 24h3.113L30.415 6.38ZM18.518 1.31l-.072 22.547h4.567L21.793 0l-3.275 1.31ZM3.544 7.294 0 23.794h9.537l1.911-19.658-7.904 3.158Z"
        fill="currentColor"
        className="logo-mark"
      />
      <path
        d="M43.559 13.52h.134v-2.727h11.314v2.728h2.028V8.837h-6.711v-1.48h-2.028v1.48H41.63v4.684h1.929Z"
        fill="currentColor"
        className="logo-text"
      />
    </svg>
  );
}

export function LogoSmall({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 52 44" className={className} {...props}>
      <path
        d="m20.218 5.982-1.655 31.1h6.696l.42-33.28zm26.195 4.528-8.695-9.445 2.395 36.295h4.556l-1.843-25.808 4.41 25.848H52zM28.27 2.77l-.122 34.41h6.979L33.257.768zM5.41 11.906 0 37.083h14.553L17.477 7.08z"
        fill="currentColor"
        className="logo-mark"
      />
      <path
        d="M1.897 40.465v3.442h1.145v-3.442c0-.216.169-.388.377-.388s.376.176.376.388v3.442H4.94v-3.442c0-.847-.682-1.533-1.521-1.533a1.5 1.5 0 0 0-.95.337 1.516 1.516 0 0 0-.948-.337A1.525 1.525 0 0 0 0 40.465v3.442h1.145v-3.442c0-.216.168-.388.376-.388s.376.176.376.388zm6.633-.404h2.584V38.94H8.531c-.353 0-.678.067-.973.2-.286.13-.537.317-.74.56a2.426 2.426 0 0 0-.443.796c-.095.287-.142.6-.142.922 0 .321.047.635.142.92.098.303.247.57.443.797.203.243.454.431.74.556.295.134.624.2.973.2h2.583v-1.12H8.531c-.612 0-.945-.346-1.09-.781h3.677v-1.153H7.441c.145-.435.478-.78 1.09-.78m8.123-.372c-.44-.478-1.063-.74-1.749-.74h-2.5v4.947h2.5c.686 0 1.31-.263 1.749-.741.415-.45.643-1.066.643-1.733s-.228-1.278-.643-1.733zm-.827 2.705c-.228.247-.545.377-.922.377h-1.38v-2.701h1.38c.377 0 .694.129.922.38.223.243.349.588.349.972s-.122.725-.35.972zm3.979-3.446h-1.22v4.948h1.22zm5.504.612c-.455-.415-1.07-.643-1.737-.643-.666 0-1.282.228-1.737.643-.482.44-.744 1.058-.744 1.748v2.615h1.12v-.968h2.718v.968h1.121v-2.615c0-.69-.263-1.309-.745-1.748m-3.09 2.246v-.498c0-.376.13-.693.381-.92.247-.224.592-.35.98-.35s.733.126.976.35c.247.227.38.544.38.92v.498zm10.954-2.246a2.573 2.573 0 0 0-1.736-.643c-.667 0-1.282.228-1.737.643-.482.44-.745 1.063-.745 1.748v2.615h1.125v-.968h2.713v.968h1.121v-2.615c0-.686-.262-1.309-.744-1.748m-3.09 2.246v-.498c0-.372.13-.693.38-.92.248-.224.593-.35.977-.35s.733.126.98.35c.247.227.38.544.38.92v.498h-2.713zm9.75-1.031c0-.49-.188-.945-.533-1.29s-.804-.537-1.29-.537h-3.026v4.948h1.152v-1.298h1.792c.372 0 .67.306.67.674v.62h1.153v-.62c0-.45-.16-.874-.459-1.207.35-.341.541-.8.541-1.294m-3.7.675v-1.345H38c.373 0 .675.302.675.674 0 .18-.07.345-.196.467a.788.788 0 0 1-.56.204zm9.706-2.494h-4.951v1.153h1.866v3.783h1.22v-3.783h1.865zm2.595-.004a1.54 1.54 0 0 0-1.085.443c-.29.286-.455.67-.455 1.082 0 .84.69 1.525 1.537 1.525h1.728c.212 0 .389.169.389.373a.38.38 0 0 1-.389.372H48.44a.38.38 0 0 1-.384-.372h-1.153c0 .839.69 1.525 1.541 1.525h1.713a1.54 1.54 0 0 0 1.086-.443c.294-.29.455-.67.455-1.082 0-.84-.69-1.525-1.537-1.525h-1.729a.38.38 0 0 1-.384-.373.38.38 0 0 1 .384-.372h1.702a.38.38 0 0 1 .384.372h1.153a1.533 1.533 0 0 0-1.54-1.525z"
        fill="currentColor"
        className="logo-text"
      />
    </svg>
  );
}

// ============================================
// NAVIGATION ICONS
// ============================================

export function ArrowRightIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLeftIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CrossIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M3 12h18M3 6h18M3 18h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ============================================
// UI DECORATIVE ICONS
// ============================================

export function CornerIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M3 3v18h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CircleStrokeIcon({ size = 22, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 22 22" width={size} height={size} {...props}>
      <circle
        cx="11"
        cy="11"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export function BubbleIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" {...props}>
      <circle cx="24" cy="24" r="20" fill="currentColor" opacity="0.1" />
      <circle cx="24" cy="24" r="16" fill="currentColor" opacity="0.2" />
      <circle cx="24" cy="24" r="10" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function SmileIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 14s1.5 2 4 2 4-2 4-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

export function QuestionIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

export function DownloadIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PinIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// ============================================
// WEEKDAY ICONS
// ============================================

export function WeekdayIcon({ day, size = 24, ...props }: IconProps & { day: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' }) {
  const labels: Record<string, string> = {
    sun: '日',
    mon: '月',
    tue: '火',
    wed: '水',
    thu: '木',
    fri: '金',
    sat: '土',
  };

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...props}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="12"
        fill="currentColor"
        fontWeight="bold"
      >
        {labels[day]}
      </text>
    </svg>
  );
}

// ============================================
// SOCIAL MEDIA ICONS
// ============================================

export function InstagramIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="6" r="1" fill="currentColor" />
    </svg>
  );
}

export function XIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function FacebookIcon({ size = 10, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function LineIcon({ size = 21, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

export function YouTubeIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function TikTokIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

// ============================================
// TAB ICONS
// ============================================

export function TabIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M4 6h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M2 10h20" stroke="currentColor" strokeWidth="2" />
      <path d="M6 6v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Tab2Icon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
      <path d="M8 6v4M14 6v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function PhoneIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 6l-10 7L2 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClockIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LocationPinIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function LocationPinFilledIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}
