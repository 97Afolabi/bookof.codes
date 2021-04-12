import remark from 'remark';
import html from 'remark-html';

export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function formatPostDate(date, lang) {
  if (typeof Date.prototype.toLocaleDateString !== 'function') {
    return date;
  }

  date = new Date(date);
  const args = [
    lang,
    { day: 'numeric', month: 'long', year: 'numeric' },
  ].filter(Boolean);
  return date.toLocaleDateString(...args);
}
