import { useState, useRef, useEffect } from "react";
import styles from "@/styles/Terminal.module.css";
import { Alice } from "next/font/google";

const font = Alice({ subsets: ["latin"], weight:["400"] });

type LineType = "input" | "output" | "clear";

interface Line {
  type?: LineType;
  message?: any;
  link?: any;
}

export default function Terminal() {
  const [input, setInput] = useState<string>("");
  const [lines, setLines] = useState<Line[]>([
    {
      type: "output",
      message: banner,
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus({ preventScroll: true });
    }
  }, [input, lines]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() !== "") {
      const commandOutput: Line[] = handleCommand(input);
      const newLines: Line[] = lines.concat([
        { type: "input", message: input },
        ...commandOutput,
      ]);
      setLines(newLines);
      setInput("");
    }
  };
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <div className={styles.terminal} onClick={handleTerminalClick}>
      <div className={styles.wrap}>
        {lines.map((line, index) => (
          <div key={index} className={styles.line}>
            <>
              {line.type === "input" && (
                <span className={styles.lineInput && font.className}>
                  <b className="username">alsiam@</b>
                  <b className="visitor">visitor</b>:$ ~
                </span>
              )}
              {line.type === "output" && line.link ? (
                <a href={line.link} className={styles.lineOutput}>
                  {line.message}
                </a>
              ) : (
                <span className={styles.lineOutput}>{line.message}</span>
              )}
              {line.type === "clear" && setLines([])}
            </>
          </div>
        ))}

        <form onSubmit={handleSubmit} className={ styles.form}>
          <span className={font.className}>
            <b className="username">alsiam@</b>
            <b className="visitor">visitor</b>:$&nbsp;~
          </span>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            ref={inputRef}
          />
        </form>
      </div>
    </div>
  );
}

function handleCommand(input: string): Line[] {
  const [command, ...args] = input.split(" ");

  if (command === "clear") {
    return [{ type: "clear", message: "" }]; // return an empty array to clear the lines
  }

  switch (command) {
    case "help":
      return [
        { type: "output", message: "Available commands:" },
        { type: "output", message: "- about" },
        { type: "output", message: "- projects" },
        { type: "output", message: "- skills" },
        { type: "output", message: "[ clear - clean the terminal] " },
      ];
    case "projects":
      // Logic to retrieve and display list of projects
      return [
        { type: "output", message: "Projects:" },
        { type: "output", message: "- Al Siam", link: "https://alsiam.com" },
        {
          type: "output",
          message: "- Web Projects",
          link: "https://alsiam.github.io/web-projects",
        },
        {
          type: "output",
          message: "- Al Folio",
          link: "https://alsiam.github.io/al-folio",
        },
      ];
    case "about":
      // Logic to display information about the developer
      return [{ type: "output", message: "I'm Al Siam" }];
    case "skills":
      // Logic to display list of skills
      return [
        { type: "output", message: "Skills:" },
        { type: "output", message: "- HTML5" },
        { type: "output", message: "- CSS3" },
        { type: "output", message: "- Tailwind CSS" },
        { type: "output", message: "- Sass" },
        { type: "output", message: "- JavaScript" },
        { type: "output", message: "- Typescript" },
        { type: "output", message: "- React" },
        { type: "output", message: "- Redux" },
        { type: "output", message: "- NextJS" },
        { type: "output", message: "- NodeJS" },
        { type: "output", message: "- ExpressJS" },
        { type: "output", message: "- MongoDB" },
        { type: "output", message: "- Material UI" },
        { type: "output", message: "- Ant Design" },
      ];
    default:
      return [{ type: "output", message: `Command not found: ${command}` }];
  }
}

export const banner = `
  █████████   ████      █████████   ███                           
  ███░░░░░███ ░░███     ███░░░░░███ ░░░                            
 ░███    ░███  ░███    ░███    ░░░  ████   ██████   █████████████  
 ░███████████  ░███    ░░█████████ ░░███  ░░░░░███ ░░███░░███░░███ 
 ░███░░░░░███  ░███     ░░░░░░░░███ ░███   ███████  ░███ ░███ ░███ 
 ░███    ░███  ░███     ███    ░███ ░███  ███░░███  ░███ ░███ ░███ 
 █████   █████ █████   ░░█████████  █████░░████████ █████░███ █████
░░░░░   ░░░░░ ░░░░░     ░░░░░░░░░  ░░░░░  ░░░░░░░░ ░░░░░ ░░░ ░░░░░ 
                                                                   
Type 'help' to see the list of available commands.
`;
