/**
 * AppLogger Utility
 * Safe for production (no-op when not in __DEV__).
 */

export class AppLogger {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * Debug log (🪲)
   */
  d = (message: string, ...args: any[]) => {
    if (__DEV__) {
      const tag = `${this.name} (🪲)`;
      console.log(`${tag} ∼ ${message}`, ...args);
      console.tron?.display({
        name: tag,
        value: args.length > 0 ? { message, data: args } : message,
        preview: message,
      });
    }
  };

  /**
   * Warning log (⚠️)
   */
  warn = (message: string, ...args: any[]) => {
    if (__DEV__) {
      const tag = `${this.name} (⚠️)`;
      console.warn(`${tag} ∼ ${message}`, ...args);
      console.tron?.display({
        name: tag,
        value: args.length > 0 ? { message, data: args } : message,
        preview: message,
        important: true,
      });
    }
  };

  /**
   * Info log (ℹ)
   */
  info = (message: string, ...args: any[]) => {
    if (__DEV__) {
      const tag = `${this.name} (ℹ)`;
      console.log(`${tag} ∼ ${message}`, ...args);
      console.tron?.display({
        name: tag,
        value: args.length > 0 ? { message, data: args } : message,
        preview: message,
      });
    }
  };

  /**
   * Error log (❌)
   */
  error = (message: string, ...args: any[]) => {
    if (__DEV__) {
      const tag = `${this.name} (❌)`;
      console.error(`${tag} ∼ ${message}`, ...args);
      console.tron?.display({
        name: tag,
        value: args.length > 0 ? { message, data: args } : message,
        preview: message,
        important: true,
      });
    }
  };

  /**
   * Static log for quick one-off logging
   */
  static log = (message: string, ...args: any[]) => {
    if (__DEV__) {
      console.log(`(🪵) ∼ ${message}`, ...args);
      console.tron?.log?.(message, ...args);
    }
  };
}
