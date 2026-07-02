import React from 'react';

/**
 * Simple Markdown parser for AI Assistant messages
 * Supports: bold, lists, code blocks, line breaks
 *
 * Optional `renderText` permet à l'appelant de transformer chaque chaîne
 * "plain text" (entre balises markdown) — utilisé par Prof. Xiao pour rendre
 * les hanzi cliquables (popup vocabulaire).
 */

export interface ParseMarkdownOptions {
  /** Si fourni, chaque morceau de texte brut est passé à cette fn. */
  renderText?: (text: string, key: string) => React.ReactNode;
}

export function parseMarkdown(text: string, options: ParseMarkdownOptions = {}): React.ReactNode {
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
      elements.push(<h3 key={`h3-${i}`} className="markdown-h3">{parseInline(line.substring(4), options, `h3-${i}`)}</h3>);
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={`h2-${i}`} className="markdown-h2">{parseInline(line.substring(3), options, `h2-${i}`)}</h2>);
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      elements.push(<h1 key={`h1-${i}`} className="markdown-h1">{parseInline(line.substring(2), options, `h1-${i}`)}</h1>);
      i++;
      continue;
    }

    // Unordered list
    if (line.match(/^[-*]\s/)) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && lines[i].match(/^[-*]\s/)) {
        const itemText = lines[i].substring(2);
        listItems.push(<li key={`li-${i}`}>{parseInline(itemText, options, `li-${i}`)}</li>);
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
        listItems.push(<li key={`li-${i}`}>{parseInline(itemText, options, `li-${i}`)}</li>);
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
    elements.push(<p key={`p-${i}`} className="markdown-p">{parseInline(line, options, `p-${i}`)}</p>);
    i++;
  }

  return <>{elements}</>;
}

function parseInline(text: string, options: ParseMarkdownOptions = {}, keyPrefix: string = ''): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let current = '';
  let i = 0;

  const wrap = (raw: string, k: string): React.ReactNode =>
    options.renderText ? options.renderText(raw, k) : raw;

  while (i < text.length) {
    // Bold **text**
    if (text.substring(i, i + 2) === '**') {
      if (current) {
        parts.push(wrap(current, `${keyPrefix}-t-${i}`));
        current = '';
      }
      i += 2;
      let boldText = '';
      while (i < text.length && text.substring(i, i + 2) !== '**') {
        boldText += text[i];
        i++;
      }
      if (boldText) {
        parts.push(
          <strong key={`${keyPrefix}-bold-${i}`}>
            {wrap(boldText, `${keyPrefix}-bold-${i}-inner`)}
          </strong>
        );
      }
      i += 2;
      continue;
    }

    // Inline code `text`
    if (text[i] === '`') {
      if (current) {
        parts.push(wrap(current, `${keyPrefix}-t-${i}`));
        current = '';
      }
      i++;
      let codeText = '';
      while (i < text.length && text[i] !== '`') {
        codeText += text[i];
        i++;
      }
      if (codeText) {
        parts.push(<code key={`${keyPrefix}-code-${i}`} className="markdown-inline-code">{codeText}</code>);
      }
      i++;
      continue;
    }

    current += text[i];
    i++;
  }

  if (current) {
    parts.push(wrap(current, `${keyPrefix}-t-end`));
  }

  return parts.length === 0 ? wrap(text, `${keyPrefix}-only`) : <>{parts}</>;
}
