import React from 'react';

export const Drag = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C10.21 10.37 9.7 10.17 9.17 10.17C7.79 10.17 6.67 11.29 6.67 12.67C6.67 14.05 7.79 15.17 9.17 15.17C10.55 15.17 11.67 14.05 11.67 12.67C11.67 12.14 11.47 11.63 11.09 11.25L16.67 5.67L19.33 8.33L21 9ZM4 19C4 20.1 4.9 21 6 21C7.1 21 8 20.1 8 19C8 17.9 7.1 17 6 17C4.9 17 4 17.9 4 19ZM16 19C16 20.1 16.9 21 18 21C19.1 21 20 20.1 20 19C20 17.9 19.1 17 18 17C16.9 17 16 17.9 16 19Z"/>
  </svg>
);

export const X = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);