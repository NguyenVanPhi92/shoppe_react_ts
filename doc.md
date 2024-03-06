HỌC XONG VIDEO 159 XONG PHẦN VALIDATE REGISTER FORM

node version 16.16.0
yarn version 1.22.19

I Các chức năng chính

1 Authencation module: Quản lý bằng JWT

- Đăng nhập
- Đăng kí
- Đăng xuất

2 Trang danh sách sản phẩm:

- Có phân trang
- Sort (sắp xếp) theo từng thuộc tính sản phẩm
- Filter nâng cao theo từng thuộc tính sản phẩm
- Tìm kiếm sp

3 Trang chi tiết sản phẩm:

- Hiển thị thông tin chi tiết
- Ảnh hiển thị thông tin chi tiết
- Mô tả thì hiển thị rich text dạng WYSIWYG HTML
- Có chức năng mua hàng

4 Giỏ hàng

- Quản lý đơn hàng: Thêm, sửa, xóa sản phẩm
- Mua hàng

5 Quản lý Profile khách hàng

- Update thông tin cá nhân
- Upload Avatar
- Đổi mật khẩu
- Xem tình trạng đơn hàng

II Công nghệ sử dụng

- UI/CSS Library: Tailwindcss + HeadlessUI
- State Management: Stantack query
- Form Management: React Hook Form
- Router: React Router v6
- Build tool: Vite (chỉ hỗ trợ node version 14 trở lên)
- Api: Rest API dựa trên sever
- Hỗ trợ đa ngôn ngữ react.i18next
- Hỗ trợ seo với React Helmet
- Mô hình hóa các component với story book
- Viết Unit Test
  ...

  \*\*\* Các File

  - Vite.config.js: là file config của vite
  - tsconfig.js: là file config của ts

\*\*\* Có 3 môi trường làm việc

1.  Môi trường VS Code, khi chúng ta đưa chuột vào click thì chạy đến đúng file
2.  Môi trường ES Lint,
3.  Môi trường terminal

- @types/node: cung cấp type cho nodejs

* Soucre tree

- Layout: chứa các layout
- Page chứa các page
  - RegisterLayout
  - LoginLayout
