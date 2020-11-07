// describe("Testing", () => {

//     it("should be", () => {
//         expect(true).toEqual(true)
//     })
// })

import {login,logout} from "../../actions/auth"

test("Should generate the login object", () => {
    const uid = 'abc123';
    const action = login(uid)
    expect(action).toEqual({
        type: "LOGIN",
        uid
    })
})

test("Should generate the logout object", () => {
    const action = logout();
    expect(action).toEqual({
        type: "LOGOUT"
    })
})