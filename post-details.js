// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

const url = new URL(location);
const id = url.searchParams.get ('id');


const postDiv = document.getElementById('post');

fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
.then(value => value.json())
.then(post => {
    console.log(post);
    const div = document.createElement('div');
    div.classList.add('infoPost');
    div.innerHTML = `
    UserId: ${post.userId}
    Id: ${ post.id }
    Title: ${ post.title }
    Body: ${ post.body }
    `;
    postDiv.appendChild(div)

    const commentsDiv = document.createElement('div');
    commentsDiv.classList.add('comments');
    postDiv.appendChild(commentsDiv)


    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(value => value.json())
        .then(comments => {
            console.log(comments);
            for (const comment of comments) {
                const commentDiv = document.createElement('div');
                commentDiv.innerText =`
        postId: ${ comment.postId }
        id: ${ comment.id }
        name: ${ comment.name }
        email: ${ comment.email }                              
        body: ${ comment.body }
        `
                commentsDiv.appendChild(commentDiv)
            }
        })
        .catch(error => console.log(error));
})
    .catch(error => console.log(error));