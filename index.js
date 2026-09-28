// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули
fetch('https://jsonplaceholder.typicode.com/users')
.then(value => value.json())
.then(userObject =>{
    const users = userObject;
    console.log(userObject);

    for (const user of users) {
        const div = document.createElement('div');
        div.classList.add('user-container');
        const divInfo = document.createElement('div');
        divInfo.innerText =
            `Id: ${user.id}
            Name: ${user.name}`;
        const a = document.createElement('a');
        a.innerText = 'All Info'
        a.href = `user-details.html?id=${user.id}`

        div.append(divInfo, a);
        usersDiv.appendChild(div)
    }


})
const usersDiv = document.getElementById('users');