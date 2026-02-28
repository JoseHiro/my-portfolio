"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vscDarkPlus from "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus";
import { FileCode, Copy, Check, Circle } from "lucide-react";
import { Section, Container, Heading } from "@/components/ui";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const SNIPPETS = [
  {
    id: "api-route",
    filename: "api-route.ts",
    language: "typescript",
    code: `// Next.js API Route with AI integration
export async function POST(req: Request) {
  const { message } = await req.json()
  
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: message }]
  })
  
  return Response.json({ reply: response.choices[0].message })
}`,
  },
  {
    id: "animated-button",
    filename: "animated-button.tsx",
    language: "typescript",
    code: `// Magnetic button with spring animation
export function MagneticButton({ children }: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  return (
    <motion.button
      animate={position}
      transition={{ type: "spring", stiffness: 150 }}
      onHoverStart={(e) => {/* calculate magnetic pull */}}
    >
      {children}
    </motion.button>
  )
}`,
  },
  {
    id: "data-processing",
    filename: "data-processing.py",
    language: "python",
    code: `# AI data processing pipeline
def process_embeddings(documents: List[str]):
    embeddings = model.encode(documents)
    
    # Store in vector database
    index.upsert(vectors=embeddings, metadata=documents)
    
    return {"status": "success", "count": len(documents)}`,
  },
] as const;

export function CodeShowcase() {
  const t = useTranslations("codeShowcase");
  const [activeId, setActiveId] = useState<(typeof SNIPPETS)[number]["id"]>("api-route");
  const [copied, setCopied] = useState(false);

  const activeSnippet = SNIPPETS.find((s) => s.id === activeId) ?? SNIPPETS[0];

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeSnippet.code]);

  return (
    <Section
      id="code-showcase"
      spacing="md"
      className="scroll-mt-24 bg-slate-900 py-16 md:py-20"
    >
      <Container maxWidth="lg">
        <header className="mb-10 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-400">
            {t("overline")}
          </p>
          <Heading as="h2" size="lg" className="mb-3 text-white">
            {t("title")}
          </Heading>
          <p className="text-slate-400">{t("subtitle")}</p>
        </header>

        <div className="mx-auto max-w-5xl">
          {/* Tabs */}
          <div className="flex gap-1 border-b border-slate-700/80 px-1">
            {SNIPPETS.map((snippet) => (
              <button
                key={snippet.id}
                type="button"
                onClick={() => setActiveId(snippet.id)}
                className={cn(
                  "flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                  "hover:text-slate-200",
                  activeId === snippet.id
                    ? "border-blue-500 text-white"
                    : "border-transparent text-slate-500"
                )}
              >
                <FileCode className="h-4 w-4 shrink-0" strokeWidth={2} />
                <span className="truncate">{snippet.filename}</span>
              </button>
            ))}
          </div>

          {/* Code block container */}
          <div
            className={cn(
              "overflow-hidden rounded-b-xl rounded-tl-xl",
              "border border-slate-700/80 bg-slate-800/50",
              "shadow-xl shadow-black/20",
              "ring-1 ring-slate-600/50"
            )}
          >
            {/* Header bar (macOS style) */}
            <div className="flex items-center justify-between border-b border-slate-700/80 bg-slate-800/80 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <Circle className="h-3 w-3 fill-red-500/90 stroke-red-500" strokeWidth={0} />
                  <Circle className="h-3 w-3 fill-amber-500/90 stroke-amber-500" strokeWidth={0} />
                  <Circle className="h-3 w-3 fill-emerald-500/90 stroke-emerald-500" strokeWidth={0} />
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <FileCode className="h-4 w-4" strokeWidth={2} />
                  <span className="text-sm font-medium text-slate-300">
                    {activeSnippet.filename}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  "text-slate-400 hover:bg-slate-700/80 hover:text-slate-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                )}
                aria-label={t("copyLabel")}
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2.5} />
                    <span className="text-emerald-400">{t("copied")}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" strokeWidth={2} />
                    <span>{t("copy")}</span>
                  </>
                )}
              </button>
            </div>

            {/* Code content with horizontal scroll on mobile */}
            <div className="overflow-x-auto p-4 md:p-6 font-mono text-xs leading-relaxed md:text-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSnippet.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.42, 0, 0.58, 1] }}
                  className="min-w-0"
                >
                  <SyntaxHighlighter
                    language={activeSnippet.language}
                    style={vscDarkPlus}
                    showLineNumbers
                    wrapLongLines
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: "transparent",
                      fontSize: "inherit",
                      lineHeight: "inherit",
                    }}
                    lineNumberStyle={{
                      minWidth: "2.25em",
                      paddingRight: "1em",
                      color: "rgb(100 116 139)",
                      userSelect: "none",
                    }}
                    PreTag="div"
                  >
                    {activeSnippet.code}
                  </SyntaxHighlighter>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
