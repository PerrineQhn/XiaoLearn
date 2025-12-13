import React from 'react';

/**
 * Simple Markdown parser for AI Assistant messages
 * Supports: bold, lists, code blocks, line breaks
 */

export function parseMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block (triple backticks)
    if (line.trim().startsWith('```')) {
      const codeLines: string[] = [];
      i++; // Skip opening backticks
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={`code-${i}`} className="markdown-code-block">
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      i++; // Skip closing backticks
      continue;
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(<h3 key={`h3-${i}`} className="markdown-h3">{parseInline(line.substring(4))}</h3>);
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={`h2-${i}`} className="markdown-h2">{parseInline(line.substring(3))}</h2>);
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      elements.push(<h1 key={`h1-${i}`} className="markdown-h1">{parseInline(line.substring(2))}</h1>);
      i++;
      continue;
    }

    // Unordered list
    if (line.match(/^[-*]\s/)) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && lines[i].match(/^[-*]\s/)) {
        const itemText = lines[i].substring(2);
        listItems.push(<li key={`li-${i}`}>{parseInline(itemText)}</li>);
        i++;
      }
      elements.push(<ul key={`ul-${i}`} className="markdown-list">{listItems}</ul>);
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\.\s/)) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        const itemText = lines[i].replace(/^\d+\.\s/, '');
        listItems.push(<li key={`li-${i}`}>{parseInline(itemText)}</li>);
        i++;
      }
      elements.push(<ol key={`ol-${i}`} className="markdown-list">{listItems}</ol>);
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      elements.push(<br key={`br-${i}`} />);
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(<p key={`p-${i}`} className="markdown-p">{parseInline(line)}</p>);
    i++;
  }

  return <>{elements}</>;
}

function parseInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let current = '';
  let i = 0;

  while (i < text.length) {
    // Bold **text**
    if (text.substring(i, i + 2) === '**') {
      if (current) {
        parts.push(current);
        current = '';
      }
      i += 2;
      let boldText = '';
      while (i < text.length && text.substring(i, i + 2) !== '**') {
        boldText += text[i];
        i++;
      }
      if (boldText) {
        parts.push(<strong key={`bold-${i}`}>{boldText}</strong>);
      }
      i += 2;
      continue;
    }

    // Inline code `text`
    if (text[i] === '`') {
      if (current) {
        parts.push(current);
        current = '';
      }
      i++;
      let codeText = '';
      while (i < text.length && text[i] !== '`') {
        codeText += text[i];
        i++;
      }
      if (codeText) {
        parts.push(<code key={`code-${i}`} className="markdown-inline-code">{codeText}</code>);
      }
      i++;
      continue;
    }

    current += text[i];
    i++;
  }

  if (current) {
    parts.push(current);
  }

  return parts.length === 0 ? text : <>{parts}</>;
}
