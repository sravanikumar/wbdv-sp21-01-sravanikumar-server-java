let $userNameFld
let $passwordFld
let $firstNameFld
let $lastNameFld
let $roleFld
let $createBtn
let $updateBtn
// let $removeBtn
// let $editBtn
let tableBody

let users = [{username: "skumar", password: "pass", firstName: "Srav", lastName: "Kumar", role: "ADMIN"}];

let selectedUser = null
function selectUser(event) {
    let editBtn = $(event.target)
    let theId = editBtn.attr("id")
    // selectedUser = users.find(user => user._id === theId)
}

function renderUsers(users) {
    tableBody.empty()

    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        tableBody
            .prepend(`
            <tr class="wbdv-template wbdv-user wbdv-hidden">
              <td class="wbdv-username">${user.username}</td>
              <td>&nbsp;</td>
              <td class="wbdv-first-name">${user.firstName}</td>
              <td class="wbdv-last-name">${user.lastName}</td>
              <td class="wbdv-role">${user.role}</td>
              <td class="wbdv-actions">
                <button class="wbdv-remove" id="delete${i}">
                  <i class="fa-2x fa fa-times"></i>
                </button>
                <button class="wbdv-edit" id="edit${i}">
                    <i class="fa-2x fa fa-pencil"></i>
                </button>
              </td>
            </tr>
            `)
    }

    $(".wbdv-remove")
        .click(deleteUser)
    $(".wbdv-edit")
        .click(selectUser)
}



function init() {
    $userNameFld = $(".wbdv-username-fld")
    $passwordFld = $(".wbdv-seats-fld")
    $firstNameFld = $(".wbdv-semester-fld")
    $lastNameFld = $(".wbdv-create-btn")
    $roleFld = $(".wbdv-role-fld")
    tableBody = jQuery("tbody")

    $createBtn = $(".wbdv-create")
    $createBtn.click(() => {
            createUser({
                username: $userNameFld.val(),
                password: $passwordFld.val(),
                firstName: $firstNameFld.val(),
                lastName: $lastNameFld.val(),
                role: $roleFld.val()
            })

            $userNameFld.val("")
            $passwordFld.val("")
            $firstNameFld.val("")
            $lastNameFld.val("")
        }
    )

    $updateBtn = $(".wbdv-update")

    renderUsers(users)

}
jQuery(init)