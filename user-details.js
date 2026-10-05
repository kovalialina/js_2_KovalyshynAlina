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
    for (const [key, value] of Object.entries(user)) {
        if (typeof value === 'object') {
            for (const [key2, value2] of Object.entries(value)) {
                if (typeof value2 === 'object') {
                    for (const [key3, value3] of Object.entries(value2)) {
                        const div = document.createElement('div');
                        div.innerText = `${key3}: ${value3}`;
                        userDiv.appendChild(div);
                    }
                }else {
                    const div = document.createElement('div');
                    div.innerText = `${key2}: ${value2}`;
                    userDiv.appendChild(div);
                }
            }
        }else {
            const div = document.createElement('div');
            div.innerText = `${key}: ${value}`;
            userDiv.appendChild(div);
        }
    }

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
            postsDiv.innerHTML = ''
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
            .catch(error => console.log(error));
    }
    userDiv.append(button, postsDiv)
})
    .catch(error => console.log(error));
const userDiv = document.getElementById('user');