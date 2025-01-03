**Các file config**

1 `.eslintignore`: cấu hình bỏ qua các file không cần check rule format code
2 `.eslintrc.cjs`: cấu hình format code
3 `.gitignore`: bỏ qua các file folder không cần đẩy lên git
4 `.nvmrc`: source sử dụng npm version 18.2.0
5 `.prettierignore`: cấu hình bỏ qua các file không cần check rule format code
6 `.prettierrc`: cấu hình format code
7 `.yarnrc`: cài yarn cho dự án khi yarn trên máy không match với yarn dự án
8 `package-lock.json`: file lock ra các lỗi or thông tin của npm package
9 `package.json`: chứa các thư viện đã cày, tạo lệnh start/build/test...
10 `postcss.config.cjs`:
11 `tailwind.config.cjs`: cấu hình css trong tailwind
12 `tsconfig.ts`: cấu hình rule build Import/Export ts trong file này
13 `tsconfig.node.json`:
14 `vercel.json`: giúp vercel hiểu path trong dự án khi deploy product Ex: a/a-1-2
15 `vite.config.ts`: cấu hình vite trong file này
16 `vitest.setup.js`: cấu hình rule test
17 `README.md`:
18 `yarn.lock`: file lock ra các lỗi or thông tin của yarn package

**Chạy câu lệnh dưới đây**

```bash
yarn add eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-prettier prettier-plugin-tailwindcss eslint-plugin-react-hooks -D
```

**Dưới đây là những depedency mà chúng ta cần cài**

1. ESLint: linter (bộ kiểm tra lỗi) chính
2. Prettier: code formatter chính
3. @typescript-eslint/eslint-plugin: ESLint plugin cung cấp các rule cho Typescript
4. @typescript-eslint/parser: Parser cho phép ESLint kiểm tra lỗi Typescript.
5. eslint-config-prettier: Bộ config ESLint để vô hiệu hóa các rule của ESLint mà xung đột với Prettier.
6. eslint-plugin-import: Để ESLint hiểu về cú pháp `import...` trong source code.
7. eslint-plugin-jsx-a11y: Kiểm tra các vấn đề liên quan đến accessiblity (Tính thân thiện website, ví dụ cho thiết bị máy đọc sách).
8. eslint-plugin-react: Các rule ESLint cho React
9. eslint-plugin-prettier: Dùng thêm 1 số rule Prettier cho ESLint
10. prettier-plugin-tailwindcss: Sắp xếp class tailwindcss
11. eslint-plugin-react-hooks: ESLint cho React hook

**Có 3 môi trường khi làm việc**

> 1. Môi trường VS Code, khi chúng ta đưa chuột vào click thì chạy đến đúng file
> 2. Môi trường ES Lint
> 3. Môi trường Terminal\*
