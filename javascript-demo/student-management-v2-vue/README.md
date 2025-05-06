# Student Management System

## I. Giới thiệu

Trong dự án quản lý sinh viên trước đây, chúng ta đã sử dụng JavaScript thuần để xây dựng giao diện người dùng và xử lý các logic liên quan. Khi ứng dụng trở nên phức tạp hơn, việc quản lý mã nguồn và bảo trì trở nên khó khăn. Để giải quyết vấn đề này, chúng ta sẽ sử dụng Vue.js, một framework JavaScript hiện đại và mạnh mẽ. Dưới đây là những lý do và lợi ích của việc chuyển đổi này:

### Hạn chế của JavaScript thuần
- **Khó quản lý trạng thái ứng dụng:** Với JavaScript thuần, việc quản lý trạng thái của các thành phần trong ứng dụng (ví dụ như danh sách sinh viên, thông tin sinh viên, v.v.) trở nên phức tạp khi phải thao tác trực tiếp với DOM.
- **Xử lý sự kiện thủ công:** Việc gán và xử lý sự kiện trực tiếp trên các phần tử DOM dẫn đến mã nguồn dễ bị lỗi và khó bảo trì. Ví dụ, mở modal thêm/sửa sinh viên, đóng modal, và xử lý các sự kiện submit form đều phải được thực hiện thủ công.
- **Cập nhật DOM không hiệu quả:** Khi dữ liệu thay đổi, chúng ta phải cập nhật DOM thủ công, dễ dẫn đến lỗi và giảm hiệu suất khi phát triển ứng dụng.

### Lợi ích khi chuyển sang Vue.js
- **Quản lý trạng thái ứng dụng dễ dàng hơn:** Vue.js cung cấp cơ chế reactive, giúp tự động cập nhật giao diện khi dữ liệu thay đổi. Điều này giúp việc quản lý trạng thái của ứng dụng dễ dàng hơn.
  - **Ví dụ:** Danh sách sinh viên được lưu trữ trong một data property, khi dữ liệu thay đổi, bảng hiển thị danh sách sinh viên sẽ tự động cập nhật mà không cần phải thao tác DOM thủ công.
- **Xử lý sự kiện đơn giản hơn:** Với Vue.js, việc gán và xử lý sự kiện trở nên đơn giản hơn thông qua các directive như `v-on` (hoặc ký hiệu ngắn gọn `@`).
  - **Ví dụ:** Sự kiện mở modal thêm/sửa sinh viên và sự kiện submit form được xử lý dễ dàng thông qua các methods trong Vue component.
- **Cập nhật DOM hiệu quả hơn:** Vue.js sử dụng cơ chế reactive để tự động cập nhật DOM khi dữ liệu thay đổi, giúp cải thiện hiệu suất và giảm thiểu lỗi.
  - **Ví dụ:** Khi thêm, sửa hoặc xóa sinh viên, danh sách sinh viên trong bảng sẽ tự động cập nhật mà không cần thao tác DOM thủ công.

