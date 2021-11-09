// nconsole 声明文档
declare const nconsole: {
  log: (tag: string, ...msg: any[]) => void
  info: (tag: string, ...msg: any[]) => void
  debug: (tag: string, ...msg: any[]) => void
  warn: (tag: string, ...msg: any[]) => void
  error: (tag: string, ...msg: any[]) => void
  ascii: (tag: string, content: string, color?: string) => void
  version: (
    tag: string,
    titleParams: { title: string, color?: string },
    contentParams: { content: string, color?: string }
  ) => void
  CONSOLE_TYPE: {
    'DEFAULT': 0,
    'LOG': 1,
    'INFO': 2,
    'DEBUG': 3,
    'WARNING': 4,
    'ERRORS': 5
  }
}
interface Global { nconsole }

