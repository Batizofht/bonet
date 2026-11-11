import Link from "next/link";
import type { ReactNode } from "react";

/**
 * A deliberately small markdown renderer for the insight articles.
 * Runs on the server, ships zero JS, and covers exactly what the
 * articles use: headings, paragraphs, lists, quotes, tables, bold, links.
 */

export function slugifyHeading(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function headingsOf(md: string) {
  return md
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => {
      const text = l.slice(3).trim();
      return { id: slugifyHeading(text), text };
    });
}

function inline(text: string, key = 0): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[2]) {
      out.push(<strong key={`${key}-b${i++}`}>{m[2]}</strong>);
    } else if (m[4] && m[5]) {
      const href = m[5];
      out.push(
        href.startsWith("/") ? (
          <Link key={`${key}-l${i++}`} href={href}>{m[4]}</Link>
        ) : (
          <a key={`${key}-l${i++}`} href={href} target="_blank" rel="noopener noreferrer">{m[4]}</a>
        )
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Markdown({ source }: { source: string }) {
  const lines = source.trim().split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i].trimEnd();

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      blocks.push(<h2 key={k++} id={slugifyHeading(text)}>{text}</h2>);
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push(<h3 key={k++}>{inline(line.slice(4).trim(), k)}</h3>);
      i++;
      continue;
    }
    if (line.startsWith("> ")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) buf.push(lines[i++].slice(2));
      blocks.push(<blockquote key={k++}>{inline(buf.join(" "), k)}</blockquote>);
      continue;
    }
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) items.push(lines[i++].slice(2));
      blocks.push(
        <ul key={k++}>
          {items.map((it, j) => <li key={j}>{inline(it, k * 100 + j)}</li>)}
        </ul>
      );
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) items.push(lines[i++].replace(/^\d+\. /, ""));
      blocks.push(
        <ol key={k++}>
          {items.map((it, j) => <li key={j}>{inline(it, k * 100 + j)}</li>)}
        </ol>
      );
      continue;
    }
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        const cells = lines[i].split("|").slice(1, -1).map((c) => c.trim());
        if (!cells.every((c) => /^:?-+:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [head, ...body] = rows;
      blocks.push(
        <div key={k++} className="table-wrap">
          <table>
            <thead>
              <tr>{head.map((h, j) => <th key={j}>{inline(h, j)}</th>)}</tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri}>{r.map((c, ci) => <td key={ci}>{inline(c, ri * 10 + ci)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Paragraph: gather consecutive plain lines
    const buf: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(## |### |> |- |\d+\. |\|)/.test(lines[i])) buf.push(lines[i++].trim());
    blocks.push(<p key={k++}>{inline(buf.join(" "), k)}</p>);
  }

  return <div className="prose-bonet">{blocks}</div>;
}
