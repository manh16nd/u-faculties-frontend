import React from 'react'

const InputExcel = function (props) {
    // const [state, changeState] = useState({})

    // const uploadFileExcel = async () => {
    //     return null
    // }


    return (
        <div className="InputExcel container">
            <div className="Card">
                <div className="CardHeader">
                    Nhập tài khoản giảng viên từ Excel
                </div>
                <div className="CardBody">
                    <form>
                        <div className="SubmitWrapper">
                            <button type="submit" className="UserButton">
                                Tải file Excel lên
                                <input type="file" className="UserButton" />
                            </button>
                            <input type="file" className="UserButton" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InputExcel