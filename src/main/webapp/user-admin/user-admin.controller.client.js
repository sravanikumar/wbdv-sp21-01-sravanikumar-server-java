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
let userAdminService = new AdminUserServiceClient()

let users = [
    // {username: "skumar", password: "pass", firstName: "Srav", lastName: "Kumar", role: "ADMIN"}
    ];

function checkUser(user) {
    if (user.username === "") {
        alert("Please enter a username!")
        return 1
    } else if (user.password === "") {
        alert("Please enter a password!")
        return 1
    } else if (user.firstName === "") {
        alert("Please enter a first name!")
        return 1
    } else if (user.lastName === "") {
        alert("Please enter a last name!")
        return 1
    } else {
        return 0
    }
}

function createUser(user) {

    if (checkUser(user) === 1) {
        return
    }

    userAdminService.createUser(user)
        .then(function (actualUser) {
            users.push(actualUser)

            $userNameFld.val("")
            $passwordFld.val("")
            $firstNameFld.val("")
            $lastNameFld.val("")
            $roleFld.val("ADMIN")

            renderUsers(users)
            }
        )
}


let selectedUser = null
function selectUser(event) {
    let editBtn = $(event.target)
    let theId = editBtn.attr("id")
    selectedUser = users.find(user => user._id === theId)
    // userAdminService.findUserById(theId)
    //     .then(function (selectedUser) {
    //         $userNameFld.val(selectedUser.username)
    //         $passwordFld.val(selectedUser.password)
    //         $firstNameFld.val(selectedUser.firstName)
    //         $lastNameFld.val(selectedUser.lastName)
    //         $roleFld.val(selectedUser.role)
    //     })

    $userNameFld.val(selectedUser.username)
    $passwordFld.val(selectedUser.password)
    $firstNameFld.val(selectedUser.firstName)
    $lastNameFld.val(selectedUser.lastName)
    $roleFld.val(selectedUser.role)
}

function deleteUser(event) {
    console.log("in delete", users)
    let removeBtn = $(event.target)
    console.log(removeBtn)
    let theIndex = removeBtn.attr("id")
    console.log("index", theIndex)
    let theId = users[theIndex]._id

    userAdminService.deleteUser(theId)
        .then(function(status) {
            users.splice(theIndex, 1)
            renderUsers(users)
            }
        )
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
                <button class="btn">
                  <i class="fa-2x fa fa-times wbdv-remove" 
                     id="${i}"></i>
                </button>
                <button class="btn">
                    <i class="fa-2x fa fa-pencil wbdv-edit" 
                       id="${user._id}"></i>
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

function updateUser() {

    if ($userNameFld.val() === "") {
        return alert("Please enter a username!")
    } else if ($passwordFld.val() === "") {
        return alert("Please enter a password!")
    } else if ($firstNameFld.val() === "") {
        return alert("Please enter a first name!")
    } else if ($lastNameFld.val() === "") {
        return alert("Please enter a last name!")
    }

    selectedUser.username = $userNameFld.val()
    selectedUser.password = $passwordFld.val()
    selectedUser.firstName = $firstNameFld.val()
    selectedUser.lastName = $lastNameFld.val()
    selectedUser.role = $roleFld.val()

    userAdminService.updateUser(selectedUser._id, selectedUser)
        .then(function (status) {
            let index = users.findIndex( user => user._id === selectedUser._id)
            users[index] = selectedUser

            $userNameFld.val("")
            $passwordFld.val("")
            $firstNameFld.val("")
            $lastNameFld.val("")
            $roleFld.val("ADMIN")

            renderUsers(users)
            }
        )

}

function main() {
    $userNameFld = $(".wbdv-username-fld")
    $passwordFld = $(".wbdv-password-fld")
    $firstNameFld = $(".wbdv-firstName-fld")
    $lastNameFld = $(".wbdv-lastName-fld")
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
        }
    )

    $updateBtn = $(".wbdv-update")
    $updateBtn.click(updateUser)

    userAdminService.findAllUsers()
        .then(function (actualUsersFromServer) {
            users = actualUsersFromServer
            renderUsers(users)
            }
        )
}

jQuery(main)