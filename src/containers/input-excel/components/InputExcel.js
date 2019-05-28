// import React, { useState } from 'react'

// import Input from '../../../components/input/components/Input'
// import { getCookie, setCookie } from '../../../services/cookies'
// // import { changePassword } from '../../../services/api/AuthServices'

// const InputExcel = function (props) {
//     const [state, changeState] = useState({

//     })

//     const onChangeInput = (key) => (value) => {
//         changeState({
//             ...state,
//             [key]: value,
//         })
//     }

//     const onSubmit = (e) => {
//         e.preventDefault()

//         const { password, rePassword, oldPassword } = state
//         if (password !== rePassword) return alert('Mật khẩu nhập lại không khớp')
//         submit(oldPassword, password)
//     }

//     const submit = async (oldPassword, password) => {
//         const user = getCookie('username')
//         const form = { username: user, oldPassword, password }

//         const { success, data, message } = await changePassword(form)
//         if (success) {
//             const { username, type, token } = data
//             setCookie('username', username)
//             setCookie('type', type)
//             setCookie('token', token)
//             return window.location.reload()
//         }
//         alert(message)
//     }

//     return (
//         <div className="ChangePassword container">
//             <div className="Card">
//                 <div className="CardHeader">
//                     Đổi mật khẩu
//                 </div>
//                 <div className="CardBody">
//                     <form onSubmit={onSubmit}>
//                         <Input type="password" id="old-password" label="Mật khẩu cũ" value={state.oldPassword || ''} onChange={onChangeInput('oldPassword')} required />
//                         <Input type="password" id="password" label="Mật khẩu mới" value={state.password || ''} onChange={onChangeInput('password')} required />
//                         <Input type="password" id="new-password" label="Nhập lại mật khẩu mới" value={state.rePassword || ''} onChange={onChangeInput('rePassword')} required />

//                         <div className="SubmitWrapper">
//                             <button type="submit" className="UserButton">Đổi mật khẩu</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default InputExcel