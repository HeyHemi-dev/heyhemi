import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import type { RichText } from "../content/caseStudies/types";

export type MarkdownValueInput = RichText;

export type MarkdownInlineToken =
  | { type: "text"; value: string }
  | { type: "strong"; value: string }
  | { type: "emphasis"; value: string }
  | { type: "inlineCode"; value: string }
  | { type: "link"; value: string; url: string }
  | { type: "delete"; value: string }
  | { type: "break" };

export type MarkdownBlockToken =
  | { type: "paragraph"; inlines: MarkdownInlineToken[] };

export type ParsedMarkdownContent =
  | { kind: "empty" }
  | { kind: "plain"; text: string }
  | { kind: "markdown"; blocks: MarkdownBlockToken[] };

function toPlainText(children: any[] = []): string {
  return children
    .map((child) => {
      if (!child) return "";
      if (child.type === "text" || child.type === "inlineCode") return child.value ?? "";
      if (Array.isArray(child.children)) return toPlainText(child.children);
      return "";
    })
    .join("");
}

function toInlineToken(node: any): MarkdownInlineToken | null {
  if (!node) return null;
  if (node.type === "text") return { type: "text", value: node.value ?? "" };
  if (node.type === "strong") return { type: "strong", value: toPlainText(node.children) };
  if (node.type === "emphasis") return { type: "emphasis", value: toPlainText(node.children) };
  if (node.type === "inlineCode") return { type: "inlineCode", value: node.value ?? "" };
  if (node.type === "link") {
    return {
      type: "link",
      value: toPlainText(node.children),
      url: node.url ?? "#",
    };
  }
  if (node.type === "delete") return { type: "delete", value: toPlainText(node.children) };
  if (node.type === "break") return { type: "break" };
  return null;
}

function toInlineTokens(nodes: any[] = []): MarkdownInlineToken[] {
  return nodes.map((node) => toInlineToken(node)).filter(Boolean) as MarkdownInlineToken[];
}

function toMarkdownBlock(node: any): MarkdownBlockToken | null {
  if (!node) return null;
  if (node.type === "paragraph") return { type: "paragraph", inlines: toInlineTokens(node.children) };
  return null;
}

export function parseMarkdownValue(value: MarkdownValueInput): ParsedMarkdownContent {
  const text = typeof value === "string" ? value : value.text ?? "";
  if (!text) return { kind: "empty" };

  const isMarkdown = typeof value !== "string" && value.type === "md";

  if (!isMarkdown) {
    return { kind: "plain", text };
  }

  const ast = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .parse(text) as { children: any[] };

  const blocks = ast.children
    .map((node) => toMarkdownBlock(node))
    .filter(Boolean) as MarkdownBlockToken[];

  return { kind: "markdown", blocks };
}
