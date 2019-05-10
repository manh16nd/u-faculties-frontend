# u-Faculties

Một số lưu ý trong React

### Code convention
- Code theo style guide của AirBnB: https://github.com/UETCodeCamp/jsx-style-guide
- Cấu trúc một thư mục component, ví dụ component homepage: 
Đặt tại directory `containers/homepage`. Các components sẽ nằm trong `containers/homepage/components/`. 
Trong thư mục `.../components` kia, có tối thiểu 2 files: `HomePageContainer` và `HomePage`. `HomePageContainer` là file gốc, được gọi trong routing. 
react-router-dom Route sẽ render file này. File này chỉ có chức năng duy nhất là chứa file `HomePage` và một số thứ khác như chỉnh sửa tag `<header></header>` của DOM. Tuyệt đối không được có logic hay bắt nó làm một cái gì cả. Mọi logi đều sẽ sử dụng trong file `HomePage`.
- Mỗi một component sẽ có một file scss tương ứng với nó, với cấu trúc thư mục cũng na ná như nó, ví dụ, file `containers/homepage/components/HomePage`, có `className="HomePage"`, thì sẽ có một file là `scss/homepage/_HomePage.scss`
- Mỗi một file scss chỉ có một class to duy nhất. Các class con của nó sẽ được khai báo bên dưới. Việc khai báo 2 class trong cùng 1 file nó cũng giống như này:
```
render() {
    return (
        <div className="Component">
        </div>
        <div className="OtherComponent">
        </div>
    )
}
``` 
- Nếu có ai hỏi việc gì phải để components vào trong `containers/homepage/components/` làm gì cho nó dài, sao không là `containers/homepage/`, thì câu trả lời là: Ở đây sẽ còn lưu thêm nhiều thông tin khác.
Ví dụ như tại homepage, có mấy cái bảng, ta muốn lưu sẵn tên các cột về sau render cho tiện,`map()` là xong, thì ta sẽ lưu trong 
`containers/homepage/static/tableRow.js` chẳng hạn. JSX lưu ở một folder, JS lưu ở một folder khác, cái gì ra cái đấy.

### Một số convention khác 
- Ngoại trừ các method về life cycle của React `componentDidMount, componentDidUpdate, ...`, các method sẽ được viết dưới dạng arrow function. Không cần phải `bind(this)` nữa. 
- Thế nếu muốn truyền params vào một function thì sao, vì dụ như 
```<input onChange={this._onChange('some_params')/>```
- Khi đấy hàm `_onChange` của ta sẽ viết như sau
```js
onChange = (param) => (e) => {
    console.log(e.target.value) // là value của input 
    console.log(param) // là xâu 'some_params'
}
```
- Code dùng ES7, async/await, đừng `.then().catch()`, low tech lắm

### Gọi API như thế nào
- Trong thư mục `services/api/*`, ta sẽ lưu các action gọi API ở đây. Ví dụ như `getTeachers` để lấy danh sách các teachers.
- Sử dụng như thế nào trong JSX: Ta sẽ import service `getTeachers` này vào file JSX, sau đó await nó để lấy giá trị ra.
- Một service API này trả về một object có schema như sau
```json
{
  "success": "true/false",
  "data": {},
  "message": ""
}
```
- `success` là kết quả của API, có lỗi hay không. `data` là dữ liệu được trả về. `message` là lỗi (nếu có) của API.
- Viết service API mới như nào: Tôi đã viết sẵn method ở file `services/api/index.js`, để viết một API, ông sẽ `import {createApiService} from './index'`. Sau đó, với một API, ông chỉ cần 
```js
return createApiService({
url: '', // là url của API, đã bỏ đi domin
method: 'get | post | patch | delete', // hoa thường đều được
data: {}, // đây là body của API post hoặc delete hoặc patch
params: {}, // đây là query của API get
})
```

### Tổng kết
- Tạm thời như thế, có gì thêm tôi sẽ take notes lại
