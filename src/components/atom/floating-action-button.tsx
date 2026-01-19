'use client';

import { ReactNode } from 'react';
import { CalendarIcon, DocumentIcon, ExternalLinkIcon } from './icons';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  href: string;
  label: string;
  icon: 'calendar' | 'document';
  className?: string;
}

export function FloatingActionButton({
  href,
  label,
  icon,
  className,
}: FloatingActionButtonProps) {
  const Icon = icon === 'calendar' ? CalendarIcon : DocumentIcon;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex items-center gap-3 px-5 py-3 rounded-full',
        'bg-primary text-primary-foreground',
        'transition-all duration-300 hover:gap-4',
        'shadow-lg hover:shadow-xl',
        className
      )}
    >
      <span className="flex-shrink-0">
        <Icon size={18} />
      </span>
      <span className="font-medium whitespace-nowrap">{label}</span>
      <span className="flex-shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <ExternalLinkIcon size={12} />
      </span>
    </a>
  );
}

interface FloatingButtonsContainerProps {
  children: ReactNode;
  position?: 'right' | 'left';
}

export function FloatingButtonsContainer({
  children,
  position = 'right',
}: FloatingButtonsContainerProps) {
  return (
    <div
      className={cn(
        'fixed top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3',
        position === 'right' ? 'right-0' : 'left-0'
      )}
    >
      {children}
    </div>
  );
}
