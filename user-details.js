// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.

const url = new URL(location);
const id = url.searchParams.get ('id');


fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
.then(value => value.json())
.then(user =>{
    console.log(user);
    userDiv.innerText = `
    ID: ${user.id}
    Name: ${user.name}
    Address: city - ${user.address.city}, street - ${user.address.street}, suite - ${user.address.suite}, zipcode - ${user.address.zipcode}
    Company: bs - ${user.company.bs}, catchPhrase - ${user.company.catchPhrase}, name - ${user.company.name}
    Email: ${user.email}
    Phone: ${user.phone}
    Website: ${user.website}
    Username: ${user.username}
    `

    const postsDiv = document.createElement('div');
    postsDiv.classList.add('postsDiv');
    const button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = 'Post of current user'
    button.onclick = () => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
        .then(value => value.json())
        .then(posts => {
            console.log(posts);
            for (const post of posts) {
                const div = document.createElement('div');
                div.classList.add('postDiv');
                div.innerText = post.title + ' '
                const a = document.createElement('a');
                a.innerText = 'Post Details'
                a.href = `post-details.html?id=${post.id}`
                div.appendChild(a)
                postsDiv.appendChild(div);
            }
        })
    }
    userDiv.append(button, postsDiv)
})
const userDiv = document.getElementById('user');