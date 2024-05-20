# Hướng Dẫn Cơ Bản Về Vue.js 3
![Homepage](vue-logo.png)

Các ví dụ dưới đây sẽ giúp các em khám phá các khái niệm cốt lõi của Vue.js, giúp xây dựng các ứng dụng web mạnh mẽ và linh hoạt. Tại mỗi mục đều có link đến Offical Docs của Vue.js các em có thể đọc lướt qua trước để nắm cơ bản, sau đó đọc các ví dụ của anh để hiểu dễ hơn.

Tuy nhiên có một lưu ý đó là trong các ví dụ này, anh sử dụng Vue từ CDN thay vì cài đặt các công cụ build để sử dụng Single-File Components (SFC). Việc này giúp thiết lập trở nên đơn giản hơn, vì chỉ cần thêm một dòng `<script>` vào tệp HTML mà không cần cài đặt thêm phần mềm hay chạy các lệnh build phức tạp. 

Điều này rất hữu ích cho các ví dụ nhỏ, các dự án học tập, giúp chúng ta tập trung vào việc học các khái niệm cơ bản của Vue mà không bị phân tâm bởi các công cụ build. Tuy nhiên, phương pháp này có hạn chế là không thể sử dụng cú pháp SFC, phù hợp hơn cho các dự án lớn hoặc những dự án xây dựng hoàn toàn bằng Vue như SPA. Sau này Khi các em đã nắm vững các khái niệm cơ bản, thì có thể chuyển sang sử dụng các công cụ build và SFC để tận dụng toàn bộ sức mạnh của Vue.js.

Trong thực tế, vẫn có nhiều dự án sử dụng trực tiếp CDN mà không cần công cụ Build khi nhu cầu của họ là "enhancing static HTML" hoặc "integrating with a backend framework". Tức là họ muốn sử dụng Vue đơn giản là để "enhancing" một vài chức năng nào đó trong trang hoặc kết nối dữ liệu với một Backend thông qua API.

## 1. Reactivity
Bắt đầu với cơ chế phản ứng (reactivity), học cách Vue.js theo dõi và phản ứng với sự thay đổi của dữ liệu.
- [Tài liệu chính thức](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Mã ví dụ](reactivity.html)

## 2. Class & Style Binding
Khám phá cách liên kết class và style để tạo giao diện động dựa trên dữ liệu và điều kiện.

- [Tài liệu chính thức](https://vuejs.org/guide/essentials/class-and-style.html)
- [Mã ví dụ](class-and-style-binding.html)

## 3. List Rendering
Tìm hiểu cách hiển thị danh sách dữ liệu bằng v-for để lặp qua mảng và đối tượng.

- [Tài liệu chính thức](https://vuejs.org/guide/essentials/list.html)
- [Mã ví dụ](list-rendering.html)

## 4. Condition Rendering
Học cách sử dụng v-if, v-else-if và v-else để hiển thị hoặc ẩn các phần tử dựa trên điều kiện.

- [Tài liệu chính thức](https://vuejs.org/guide/essentials/conditional.html)
- [Mã ví dụ](condition-rendering.html)

## 5. Event Handling
Hiểu cách lắng nghe và xử lý các sự kiện người dùng như click, submit, và nhiều sự kiện khác.

- [Tài liệu chính thức](https://vuejs.org/guide/essentials/event-handling.html)
- [Mã ví dụ](event-handling.html)

## 6. Form Input Bindings
Nắm vững cách sử dụng v-model để liên kết dữ liệu với các phần tử form như input, textarea, và select.

- [Tài liệu chính thức](https://vuejs.org/guide/essentials/forms.html)
- [Mã ví dụ](form-input-bindings.html)

## 7. Computed Properties
Tìm hiểu cách sử dụng computed properties để tính toán và trả về giá trị dựa trên các thuộc tính khác của component.

- [Tài liệu chính thức](https://vuejs.org/guide/essentials/computed.html)
- [Mã ví dụ](computed-properties.html)

## 8. Watchers
Học cách sử dụng watchers để theo dõi và phản ứng với sự thay đổi của dữ liệu, hữu ích cho các tác vụ không đồng bộ hoặc phức tạp.

- [Tài liệu chính thức](https://vuejs.org/guide/essentials/watchers.html)
- [Mã ví dụ](watchers.html)

## 9. Components
Khám phá cách tạo và sử dụng components để tái sử dụng các phần tử giao diện và xây dựng ứng dụng có cấu trúc tốt hơn.

- [Tài liệu chính thức](https://vuejs.org/guide/essentials/component-basics.html)
- [Mã ví dụ](components.html)

## 10. Lifecycle Hooks
Hiểu các hooks vòng đời của component và học cách thực hiện các thao tác khi component được tạo, gắn vào DOM, cập nhật, hoặc bị hủy.

- [Tài liệu chính thức](https://vuejs.org/guide/essentials/lifecycle.html)
- [Mã ví dụ](lifecycle-hooks.html)
