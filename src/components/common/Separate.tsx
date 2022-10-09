import React from 'react';

interface SeparateProps {
  content: string[];
}

export const Separate: React.FC<SeparateProps> = ({ content }) => {
  return <>{content && content.join(', ')}</>;
};