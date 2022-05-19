const urlParams = new URLSearchParams(window.location.search);
// URLSearchParams 현재 켜저 있는 url 을 불러올 수 있다.
const article_id = urlParams.get('id');
// urlParams 가 가지고 있는 id 값을 .get 으로 불러올 수 있다.
console.log(article_id)

async function loadArticle(article_id) {
    const article = await getArticleDetail(article_id);
    console.log(article)
    const title = document.getElementById("title")
    const content = document.getElementById("content")
    const user_email = document.getElementById("user_email")
    const time = document.getElementById("time")
    title.innerText = article.title
    content.innerText = article.content
    user_email.innerText = article.user_email
    time.innerText = article.time
}

loadArticle(article_id);