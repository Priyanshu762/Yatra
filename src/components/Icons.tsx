import React from 'react';

interface IconProps {
  className?: string;
}

export const IconSearch: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <circle cx="11" cy="11" r="7" />
    <path d="M16 16L21 21" strokeLinecap="square" />
  </svg>
);

export const IconArrowRight: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M5 12H19M13 6L19 12L13 18" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

export const IconArrowLeft: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M19 12H5M11 6L5 12L11 18" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

export const IconCalendar: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="3" y="4" width="18" height="18" />
    <path d="M16 2V6M8 2V6M3 10H21" strokeLinecap="square" />
  </svg>
);

export const IconClock: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7V12L15 15" strokeLinecap="square" />
  </svg>
);

export const IconMapPin: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const IconCar: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M3 13L5 6H19L21 13V18H18V16H6V18H3V13Z" />
    <circle cx="7.5" cy="13.5" r="1.5" />
    <circle cx="16.5" cy="13.5" r="1.5" />
  </svg>
);

export const IconUser: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20C4 16 8 14 12 14C16 14 20 16 20 20" />
  </svg>
);

export const IconShield: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M12 2L4 5V11C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11V5L12 2Z" />
  </svg>
);

export const IconCreditCard: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="2" y="5" width="20" height="14" />
    <path d="M2 10H22M6 15H10" />
  </svg>
);

export const IconClose: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M18 6L6 18M6 6L18 18" strokeLinecap="square" />
  </svg>
);

export const IconMenu: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M3 6H21M3 12H21M3 18H21" strokeLinecap="square" />
  </svg>
);

export const IconPrinter: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M6 9V3H18V9M6 18H4C2.9 18 2 17.1 2 16V11C2 9.9 2.9 9 4 9H20C21.1 9 22 9.9 22 11V16C22 17.1 21.1 18 20 18H18M6 14H18V21H6V14Z" />
  </svg>
);

export const IconRefresh: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M20 11A8 8 0 0 0 6.34 5.34L3 8.68M4 13A8 8 0 0 0 17.66 18.66L21 15.32" />
    <path d="M3 3V9H9M21 21V15H15" strokeLinecap="square" />
  </svg>
);

export const IconFilter: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M4 6H20M7 12H17M10 18H14" strokeLinecap="square" />
  </svg>
);

export const IconChevronDown: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M6 9L12 15L18 9" strokeLinecap="square" />
  </svg>
);

export const IconChevronUp: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M18 15L12 9L6 15" strokeLinecap="square" />
  </svg>
);

export const IconPhone: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4741 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3521 21.4019C21.1468 21.5901 20.9046 21.7332 20.6407 21.8221C20.3768 21.911 20.097 21.9437 19.819 21.918C16.8929 21.6001 14.0792 20.5979 11.609 18.992C9.30932 17.5255 7.37134 15.5875 5.90483 13.2878C4.2941 10.8105 3.29177 7.98802 2.98003 5.053C2.9544 4.77609 2.98688 4.49733 3.07542 4.23438C3.16396 3.97143 3.30659 3.73016 3.49419 3.52579C3.68179 3.32142 3.90987 3.15858 4.16413 3.04746C4.4184 2.93634 4.69312 2.87941 4.97103 2.88H7.97103C8.45571 2.87522 8.92548 3.04561 9.29406 3.36014C9.66264 3.67468 9.90595 4.11267 9.97903 4.594C10.1158 5.56061 10.3753 6.50577 10.753 7.411C10.893 7.74415 10.9298 8.11186 10.8587 8.46555C10.7876 8.81923 10.6119 9.14321 10.354 9.394L9.08403 10.664C10.4571 13.0784 12.4416 15.0629 14.856 16.436L16.126 15.166C16.3768 14.9081 16.7008 14.7324 17.0545 14.6613C17.4082 14.5902 17.7759 14.627 18.109 14.767C19.0143 15.1447 19.9594 15.4042 20.926 15.541C21.4124 15.6148 21.8543 15.8617 22.1706 16.2361C22.4868 16.6105 22.6558 17.0863 22.648 17.576V16.92Z" strokeLinecap="square" />
  </svg>
);

export const IconSwap: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" strokeLinecap="square" />
  </svg>
);

