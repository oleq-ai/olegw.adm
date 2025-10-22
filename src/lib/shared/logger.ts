import "server-only";

import { Logger as LogTailLogger } from "@logtail/next";

import env from "@/config/server.env";

type LogLevel = "debug" | "info" | "warn" | "error";

export class Logger {
  private context: string;
  private logTailLogger: LogTailLogger | null = null;

  constructor(context: string) {
    this.context = context;

    // Only initialize LogTail logger in production
    if (env.NODE_ENV !== "development")
      this.logTailLogger = new LogTailLogger();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async log(level: LogLevel, message: string, ...args: any[]) {
    const logMessage = `[${this.context}] ${message}`;

    if (env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console[level](logMessage, JSON.stringify(args, null, 2));
    } else if (this.logTailLogger) {
      // Use the new LogTail API
      this.logTailLogger[level](logMessage, ...args);
      // Auto-flush after each log in production
      await this.logTailLogger.flush();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async debug(message: string, ...args: any[]) {
    await this.log("debug", message, ...args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async info(message: string, ...args: any[]) {
    await this.log("info", message, ...args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async warn(message: string, ...args: any[]) {
    await this.log("warn", message, ...args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async error(message: string, ...args: any[]) {
    await this.log("error", message, ...args);
  }

  // Expose flush method for manual control if needed
  async flush() {
    if (this.logTailLogger) await this.logTailLogger.flush();
  }
}
