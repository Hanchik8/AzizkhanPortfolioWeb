import { useEffect, useState } from "react";
import { Terminal as TerminalIcon, X, Minus, Square } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

const springBootAscii = `
  .   ____          _            __ _ _
 /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\
( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\
 \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\\__, | / / / /
 =========|_|==============|___/=/_/_/_/
`;

const terminalLines = [
  { prefix: "spring", text: ":: Spring Boot ::        (v3.3.0)", delay: 300, isAscii: false },
  { prefix: "", text: "", delay: 600, isAscii: false },
  { prefix: "INFO", text: "[main] A.Nurlanov: Starting PortfolioApplication...", delay: 900 },
  {
    prefix: "INFO",
    text: "[main] A.Nurlanov: Loading skills: Java 21, Kafka, Docker...",
    delay: 1500,
  },
  { prefix: "INFO", text: "[main] A.Nurlanov: Connecting to PostgreSQL database...", delay: 2100 },
  { prefix: "INFO", text: "[main] A.Nurlanov: Initializing Spring Security...", delay: 2700 },
  { prefix: "INFO", text: "[main] A.Nurlanov: Profile Active. Welcome!", delay: 3300 },
];

const Terminal = () => {
  const { language } = useLanguage();
  const [showAscii, setShowAscii] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(true);
  const logDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    // Show ASCII art first
    const asciiTimer = setTimeout(() => {
      setShowAscii(true);
    }, 200);

    const showNextLine = (index: number) => {
      if (index < terminalLines.length) {
        setTimeout(() => {
          setVisibleLines(index + 1);
          showNextLine(index + 1);
        }, terminalLines[index].delay);
      } else {
        setIsTyping(false);
      }
    };

    setTimeout(() => showNextLine(0), 500);

    return () => clearTimeout(asciiTimer);
  }, []);

  return (
    <section className="py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Terminal window */}
          <div className="animate-fade-in overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="group flex h-3 w-3 cursor-pointer items-center justify-center rounded-full bg-red-500/80 hover:bg-red-500">
                    <X className="h-2 w-2 text-red-900 opacity-0 group-hover:opacity-100" />
                  </div>
                  <div className="group flex h-3 w-3 cursor-pointer items-center justify-center rounded-full bg-yellow-500/80 hover:bg-yellow-500">
                    <Minus className="h-2 w-2 text-yellow-900 opacity-0 group-hover:opacity-100" />
                  </div>
                  <div className="group flex h-3 w-3 cursor-pointer items-center justify-center rounded-full bg-green-500/80 hover:bg-green-500">
                    <Square className="h-1.5 w-1.5 text-green-900 opacity-0 group-hover:opacity-100" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TerminalIcon className="h-4 w-4" />
                  <span className="font-mono text-sm">portfolio-app.log</span>
                </div>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                java -jar portfolio.jar
              </span>
            </div>

            {/* Terminal content */}
            <div className="scanlines relative min-h-[280px] overflow-x-auto p-4 font-mono text-xs sm:text-sm">
              {/* Spring Boot ASCII Art */}
              {showAscii && (
                <pre className="mb-4 animate-fade-in whitespace-pre text-[10px] leading-tight text-primary sm:text-xs">
                  {springBootAscii}
                </pre>
              )}

              {/* Log lines */}
              {terminalLines.slice(0, visibleLines).map((line, index) => (
                <div
                  key={index}
                  className="mb-1 flex animate-fade-in items-start gap-2 opacity-0"
                  style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
                >
                  {line.prefix === "spring" ? (
                    <span className="font-bold text-primary">{line.text}</span>
                  ) : line.prefix === "INFO" ? (
                    <>
                      <span className="text-muted-foreground">{logDate}</span>
                      <span className="text-primary">{line.prefix}</span>
                      <span className="text-foreground">{line.text}</span>
                    </>
                  ) : (
                    <span className="text-foreground">{line.text}</span>
                  )}
                </div>
              ))}

              {/* Cursor */}
              {isTyping && visibleLines === terminalLines.length && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-muted-foreground">{logDate}</span>
                  <span className="text-primary">INFO</span>
                  <span className="cursor-blink h-4 w-2 bg-primary" />
                </div>
              )}

              {!isTyping && (
                <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-4">
                  <span className="text-primary">$</span>
                  <span className="text-muted-foreground">
                    {language === "ru"
                      ? "Готов к сотрудничеству. Давайте сделаем что-то сильное_"
                      : "Ready to connect. Let's build something amazing_"}
                  </span>
                  <span className="cursor-blink h-4 w-2 bg-primary" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
