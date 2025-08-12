'use client';

import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignmentClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-3 sm:gap-4 ${alignmentClass} ${className}`}>
      {eyebrow && (
        <span className="text-xs sm:text-sm tracking-widest uppercase text-fg-muted">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-space-grotesk font-bold text-fg leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-3xl text-sm sm:text-base lg:text-lg text-fg-muted font-inter leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}


