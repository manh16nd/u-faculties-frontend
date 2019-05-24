import React, {Component} from 'react'

class Teachers extends Component {
    render() {

        return (
            <div className="Teachers">
                <div className="TopButtons">
                    <button className="UserButton">Thêm giảng viên</button>
                </div>

                <div className="TableWrapper">
                    <table className="Table">
                        <thead>
                        <tr>
                            <th>Tên giảng viên</th>
                            <th>Email</th>
                            <th>VNU Email</th>
                            <th>Điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Website</th>
                            <th>Bằng cấp</th>
                            <th>Vị trí</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        )
    }
}

export default Teachers
