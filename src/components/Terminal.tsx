import { useState, useRef, useEffect } from "react";
import styles from "@/styles/Terminal.module.css";

type LineType = "input" | "output" | "clear";

interface Line {
  type?: LineType;
  message?: string;
}

export default function Terminal() {
  const [input, setInput] = useState<string>("");
  const [lines, setLines] = useState<Line[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [lines]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() !== "") {
      const commandOutput = handleCommand(input);
      const newLines = [
        ...lines,
        { type: "input", message: input },
        ...commandOutput,
      ];
      setLines(newLines);
      setInput("");
    }
  };

  const handleClear = () => {
    setLines([]);
  };

  return (
    <div className={styles.terminal}>
      {lines.map((line, index) => (
        <div key={index} className={styles.line}>
          <>
            {line.type === "input" && (
              <span className={styles.lineInput}>
                alsiam@visitor:$ ~ {line.message}
              </span>
            )}
            {line.type === "output" && (
              <span className={styles.lineOutput}>{line.message}</span>
            )}
            {line.type === "clear" && setLines([])}
          </>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <span>alsiam@visitor:$&nbsp;~</span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          ref={inputRef}
        />
      </form>
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
        { type: "output", message: "- help" },
        { type: "output", message: "- projects" },
        { type: "output", message: "- about" },
        { type: "output", message: "- skills" },
      ];
    case "projects":
      // Logic to retrieve and display list of projects
      return [
        { type: "output", message: "Projects:" },
        { type: "output", message: "- Project 1" },
        { type: "output", message: "- Project 2" },
        { type: "output", message: "- Project 3" },
      ];
    case "about":
      // Logic to display information about the developer
      return [{ type: "output", message: "About the developer" }];
    case "skills":
      // Logic to display list of skills
      return [
        { type: "output", message: "Skills:" },
        { type: "output", message: "- Skill 1" },
        { type: "output", message: "- Skill 2" },
        { type: "output", message: "- Skill 3" },
      ];
    default:
      return [{ type: "output", message: `Command not found: ${command}` }];
  }
}
