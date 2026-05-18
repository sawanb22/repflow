const DEBUG = process.env.NODE_ENV === "development";

type LogLevel = "info" | "warn" | "error";

function log(level: LogLevel, tag: string, message: string, data?: unknown) {
  if (!DEBUG) return;

  const timestamp = new Date().toISOString().slice(11, 23);
  const prefix = `[${timestamp}] [${level.toUpperCase()}] [${tag}]`;

  const style =
    level === "error"
      ? "color: #ef4444; font-weight: bold"
      : level === "warn"
        ? "color: #f59e0b"
        : "color: #8b5cf6";

  if (data !== undefined) {
    console.log(`%c${prefix} ${message}`, style, data);
  } else {
    console.log(`%c${prefix} ${message}`, style);
  }
}

export const debug = {
  info: (tag: string, message: string, data?: unknown) =>
    log("info", tag, message, data),
  warn: (tag: string, message: string, data?: unknown) =>
    log("warn", tag, message, data),
  error: (tag: string, message: string, data?: unknown) =>
    log("error", tag, message, data),
};
