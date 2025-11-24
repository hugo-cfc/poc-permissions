'use client';

// Lightweight fallback dropdown primitives (no external dependency).
// This file is a shim to avoid adding @radix-ui/react-dropdown-menu.
// If you later add that package, you can replace this with the real component wrappers.

import * as React from 'react';
import { cn } from '@/lib/utils';

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

export const DropdownMenu: React.FC<DivProps> = ({ children }) => (
  <>{children}</>
);

export const DropdownMenuTrigger: React.FC<ButtonProps> = ({
  asChild,
  children,
  className,
  ...props
}) => {
  const Comp: any = asChild ? 'span' : 'button';
  return (
    <Comp className={className} {...props}>
      {children}
    </Comp>
  );
};

export const DropdownMenuContent: React.FC<
  DivProps & { sideOffset?: number }
> = ({ className, ...props }) => (
  <div
    className={cn(
      'z-50 min-w-40 rounded-md border bg-white p-1 text-sm shadow-md',
      className
    )}
    {...props}
  />
);

export const DropdownMenuItem: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { inset?: boolean }
> = ({ className, ...props }) => (
  <button
    className={cn(
      'w-full cursor-pointer select-none rounded-sm px-2 py-1.5 text-left text-sm hover:bg-gray-100',
      className
    )}
    {...props}
  />
);

export const DropdownMenuSeparator: React.FC<DivProps> = ({
  className,
  ...props
}) => (
  <div className={cn('-mx-1 my-1 h-px bg-gray-200', className)} {...props} />
);

// The rest are provided as no-op placeholders for API compatibility.
export const DropdownMenuGroup: React.FC<DivProps> = ({ children }) => (
  <>{children}</>
);
export const DropdownMenuPortal: React.FC<DivProps> = ({ children }) => (
  <>{children}</>
);
export const DropdownMenuSub: React.FC<DivProps> = ({ children }) => (
  <>{children}</>
);
export const DropdownMenuSubContent: React.FC<DivProps> = ({ children }) => (
  <>{children}</>
);
export const DropdownMenuSubTrigger: React.FC<ButtonProps> = ({ children }) => (
  <>{children}</>
);
export const DropdownMenuRadioGroup: React.FC<DivProps> = ({ children }) => (
  <>{children}</>
);
export const DropdownMenuCheckboxItem: React.FC<ButtonProps> = ({
  children,
}) => <>{children}</>;
export const DropdownMenuRadioItem: React.FC<ButtonProps> = ({ children }) => (
  <>{children}</>
);
export const DropdownMenuLabel: React.FC<DivProps & { inset?: boolean }> = ({
  children,
  className,
}) => (
  <div className={cn('px-2 py-1.5 text-sm font-semibold', className)}>
    {children}
  </div>
);
export const DropdownMenuShortcut: React.FC<
  React.HTMLAttributes<HTMLSpanElement>
> = ({ children, className }) => (
  <span className={cn('ml-auto text-xs opacity-60', className)}>
    {children}
  </span>
);
