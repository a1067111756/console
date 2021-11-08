// vconsole 声明文档
declare const vconsole: {
  log: (tag: string, ...msg: any[]) => void
  info: (tag: string, ...msg: any[]) => void
  debug: (tag: string, ...msg: any[]) => void
  warn: (tag: string, ...msg: any[]) => void
  error: (tag: string, ...msg: any[]) => void
  image: (tag: string, url: string, style: string) => void
  version: (
    tag: string,
    imageParams: { url: string, style: string },
    titleParams: { title: string, style: string },
    contentParams: { content: string, style: string }
  ) => void
  VCONSOLE_TYPE: {
    'DEFAULT': 0,
    'LOG': 1,
    'INFO': 2,
    'DEBUG': 3,
    'WARNING': 4,
    'ERRORS': 5
  }
}
interface Window { vconsole }

