# Student Management System

## Giới thiệu
Ứng dụng Quản lý Sinh viên là một công cụ đơn giản và dễ sử dụng để quản lý thông tin sinh viên. Ứng dụng này được xây dựng bằng HTML, CSS và JavaScript, sử dụng `localStorage` để lưu trữ dữ liệu sinh viên trên trình duyệt.

## Kiến thức sử dụng

### 1. Giới thiệu JavaScript
- **Lịch sử và vai trò của JavaScript**: Giới thiệu về lịch sử phát triển của JavaScript và vai trò của nó trong lập trình web.
- **Cài đặt môi trường**: Hướng dẫn sinh viên cài đặt các công cụ cần thiết như trình duyệt, code editor (VD: Visual Studio Code).
- **Cấu trúc cơ bản của JavaScript**: Giới thiệu cú pháp cơ bản, comment, và cách viết script.

### 2. Biến và kiểu dữ liệu
- **Biến**: Giải thích khái niệm biến, các từ khóa khai báo biến (var, let, const), phạm vi của biến.
  - Ví dụ: Khai báo các biến để lưu trữ thông tin sinh viên như `studentId`, `name`, `dob`, `gender`, `className`.
- **Kiểu dữ liệu**: Giới thiệu các kiểu dữ liệu cơ bản (số, chuỗi, boolean, null, undefined, object).
  - Ví dụ: Sử dụng kiểu chuỗi để lưu trữ tên sinh viên, kiểu số để lưu trữ ngày tháng năm sinh.

```js
// Khai báo biến để lưu trữ thông tin sinh viên
let studentId = '12345';
const name = 'John Doe';
```

```js
// Ví dụ về các kiểu dữ liệu cơ bản
let age = 20; // Số
let isActive = true; // Boolean
let studentName = 'Jane Smith'; // Chuỗi
let student = { id: '12345', name: 'Jane Smith' }; // Đối tượng
```

### 3. Toán tử và biểu thức
- **Toán tử số học, logic, so sánh**: Giải thích các toán tử cơ bản và cách sử dụng chúng.
  - Ví dụ: Sử dụng toán tử so sánh để kiểm tra xem `studentId` có trùng lặp hay không.
- **Biểu thức và câu lệnh**: Cách viết các biểu thức và câu lệnh đơn giản trong JavaScript.

```js
// Kiểm tra trùng lặp studentId
if (studentId === '12345') {
  console.log('Student ID already exists!');
}
```


```js
let result = (age > 18) ? 'Adult' : 'Minor'; // Biểu thức điều kiện
```

### 4. Câu lệnh điều kiện
- **if, else if, else**: Giải thích cách sử dụng các câu lệnh điều kiện.
  - Ví dụ: Sử dụng câu lệnh `if` để kiểm tra xem `studentId` có tồn tại trong danh sách không trước khi thêm sinh viên.
- **switch**: Giới thiệu câu lệnh switch và khi nào nên sử dụng.

```js
if (age < 13) {
  console.log('Child');
} else if (age < 20) {
  console.log('Teenager');
} else {
  console.log('Adult');
}
```

```js
switch (gender) {
  case 'Male':
    console.log('Gender: Male');
    break;
  case 'Female':
    console.log('Gender: Female');
    break;
  default:
    console.log('Gender: Unspecified');
}
```

### 5. Vòng lặp
- **for, while, do-while**: Giải thích các vòng lặp cơ bản và cách sử dụng chúng.
  - Ví dụ: Sử dụng vòng lặp `for` để duyệt qua các hàng trong bảng sinh viên.
- **break, continue**: Giải thích cách sử dụng break và continue trong vòng lặp.

```js
// Vòng lặp for để duyệt qua các sinh viên
for (let i = 0; i < students.length; i++) {
  console.log(students[i].name);
}
```

```js
for (let i = 0; i < students.length; i++) {
  if (students[i].id === '12345') {
    continue; // Bỏ qua sinh viên có id '12345'
  }
  console.log(students[i].name);
}
```

### 6. Hàm
- **Định nghĩa và gọi hàm**: Cách tạo và gọi hàm trong JavaScript.
  - Ví dụ: Tạo các hàm như `addStudent`, `updateStudent`, `deleteStudent` để thực hiện các thao tác tương ứng.
- **Tham số và giá trị trả về**: Giải thích tham số hàm và giá trị trả về của hàm.

```js
for (let i = 0; i < students.length; i++) {
  if (students[i].id === '12345') {
    continue; // Bỏ qua sinh viên có id '12345'
  }
  console.log(students[i].name);
}
```

```js
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
// Gọi hàm và sử dụng giá trị trả về
let age = calculateAge('2000-01-01');
```

### 7. Mảng và đối tượng
- **Mảng**: Giới thiệu về mảng, cách tạo và truy cập các phần tử của mảng.
  - Ví dụ: Lưu trữ danh sách sinh viên trong một mảng và sử dụng `localStorage` để lưu trữ mảng này.
- **Đối tượng**: Giới thiệu về đối tượng, cách tạo và truy cập các thuộc tính và phương thức của đối tượng.
  - Ví dụ: Lưu trữ thông tin sinh viên dưới dạng đối tượng với các thuộc tính như `studentId`, `name`, `dob`, `gender`, `className`.

```js
let students = [
  { id: '12345', name: 'John Doe', dob: '2000-01-01', gender: 'Male', className: 'Class A' },
  { id: '67890', name: 'Jane Smith', dob: '1999-02-02', gender: 'Female', className: 'Class B' }
];
console.log(students[0].name); // Truy cập phần tử đầu tiên của mảng
```

```js
let student = {
  id: '12345',
  name: 'John Doe',
  dob: '2000-01-01',
  gender: 'Male',
  className: 'Class A'
};
console.log(student.name); // Truy cập thuộc tính name của đối tượng
```

### 8. DOM (Document Object Model)
- **Khái niệm DOM**: Giới thiệu về DOM và vai trò của nó trong lập trình web.
- **Truy cập và thao tác DOM**: Cách truy cập và thay đổi các phần tử HTML bằng JavaScript.
  - Ví dụ: Sử dụng `document.getElementById` và `document.querySelector` để truy cập và thay đổi các phần tử trong modal thêm và chỉnh sửa sinh viên.

```js
// Truy cập phần tử HTML
let studentTable = document.getElementById('studentTable');
// Thay đổi nội dung của phần tử
studentTable.innerHTML = '<tr><td>12345</td><td>John Doe</td></tr>';
```

### 9. Sự kiện (Events)
- **Xử lý sự kiện**: Giới thiệu về các sự kiện trong JavaScript và cách xử lý chúng.
  - Ví dụ: Xử lý sự kiện `click` khi người dùng nhấn nút "Add Student", "Edit", "Delete".
- **Các loại sự kiện phổ biến**: Click, submit, change, mouseover, keypress, etc.

```
// Thêm sự kiện click cho nút "Add Student"
document.getElementById('addStudentBtn').addEventListener('click', function() {
  openModal('add');
});
```

## Chức năng của ứng dụng
Ứng dụng Quản lý Sinh viên cung cấp các chức năng chính sau:
1. **Thêm sinh viên**: Cho phép thêm mới một sinh viên với các thông tin như Mã Sinh Viên, Tên, Ngày Sinh, Giới Tính và Lớp.
    - ![Add Student Popup](add_student_popup.png)
2. **Chỉnh sửa sinh viên**: Cho phép chỉnh sửa thông tin của một sinh viên đã tồn tại. Mã Sinh Viên không thể thay đổi khi chỉnh sửa.
    - ![Edit Student Popup](edit_student_popup.png)
3. **Xóa sinh viên**: Cho phép xóa một sinh viên khỏi danh sách. Trước khi xóa, ứng dụng sẽ hiển thị một cửa sổ xác nhận để người dùng xác nhận hành động này.
4. **Lưu trữ dữ liệu**: Tự động lưu trữ dữ liệu sinh viên vào `localStorage`, đảm bảo dữ liệu không bị mất khi trang được tải lại.
5. **Hiển thị danh sách sinh viên**: Hiển thị danh sách các sinh viên đã được thêm vào ứng dụng.
    - ![Homepage](homepage.png)

## Các lưu ý
- **localStorage**: Dữ liệu được lưu trữ trong `localStorage` của trình duyệt, nghĩa là dữ liệu sẽ tồn tại ngay cả khi bạn đóng và mở lại trình duyệt. Tuy nhiên, dữ liệu sẽ bị mất nếu bạn xóa bộ nhớ cache của trình duyệt hoặc chuyển sang một trình duyệt khác.
- **Không thay đổi Mã Sinh Viên khi chỉnh sửa**: Khi chỉnh sửa thông tin sinh viên, bạn không thể thay đổi Mã Sinh Viên của sinh viên đó.
- **Kiểm tra trùng lặp Mã Sinh Viên**: Khi thêm sinh viên mới, ứng dụng sẽ kiểm tra và thông báo nếu Mã Sinh Viên đã tồn tại trong danh sách.

## Cách sử dụng
1. **Thêm sinh viên**:
    - Nhấn nút "Add Student".
    - Nhập thông tin sinh viên vào các trường trong cửa sổ bật lên.
    - Nhấn "Save" để lưu thông tin sinh viên.

2. **Chỉnh sửa sinh viên**:
    - Nhấn nút "Edit" bên cạnh sinh viên cần chỉnh sửa.
    - Thay đổi các thông tin cần thiết trong cửa sổ bật lên (trừ Mã Sinh Viên).
    - Nhấn "Save" để lưu các thay đổi.

3. **Xóa sinh viên**:
    - Nhấn nút "Delete" bên cạnh sinh viên cần xóa.
    - Xác nhận hành động xóa trong cửa sổ bật lên.

## Cài đặt và Chạy
1. Tải mã nguồn về máy tính của bạn.
2. Mở tệp `index.html` trong trình duyệt.
