// Этот файл расширяет глобальные типы

declare global {
  interface Window {
    isTauri?: object;
  }
}

// нужно добавить export {}, чтобы файл считался модулем.
export {};
