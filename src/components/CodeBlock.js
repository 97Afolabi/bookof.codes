import React from 'react';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export default function CodeBlock({ language, value }) {
 
  return (
    <SyntaxHighlighter showLineNumbers={true} language={language} style={dracula} >
      {value}
    </SyntaxHighlighter>
  );
}
