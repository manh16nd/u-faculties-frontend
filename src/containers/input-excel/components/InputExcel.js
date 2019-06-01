import React, { useState, useEffect, createRef } from 'react'
import { uploadExcel } from '../../../services/api/ExcelServices'

const InputExcel = function (props) {
    // const [state, changeState] = useState({})
    const [excelFile, changeExcel] = useState(null)

    let excelInput = createRef()

    useEffect(() => {
        if (excelFile) _uploadExcel()
    }, [excelFile])

    const onClickExcel = () => {
        excelInput.click()
    }

    const _uploadExcel = async () => {
        const formData = new FormData()
        formData.append('excel', excelFile)

        const { success, message } = await uploadExcel(formData)

        if (success)  return props.history.push("/user/teachers")

        if (message) alert(message)
    }

    const onChangeFile = (e) => {
        const { files } = e.target
        changeExcel(files[0])
    }

    


    return (
        <div className="InputExcel container">
            <div className="Card">
                <div className="CardHeader">
                    Nhập tài khoản giảng viên từ Excel
                </div>
                <div className="CardBody">
                    <form>
                        <div className="SubmitWrapper">
                            
                            <input type="file" className="UserButton" ref={input => excelInput = input} onChange={onChangeFile}/>
                            {/* <button type="submit" className="UserButton" onClick={onClickExcel} style={{marginLeft: 30}}>
                                Tải file Excel lên
                            </button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InputExcel