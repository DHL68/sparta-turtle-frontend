const urlParams = new URLSearchParams(window.location.search);
// URLSearchParams 현재 켜저 있는 url 을 불러올 수 있다.
const article_id = urlParams.get('id');
// urlParams 가 가지고 있는 id 값을 .get 으로 불러올 수 있다.
// console.log(article_id)

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

    const user = await getName()
    if (user.id != article.user) {
        const update_button = document.getElementById("update_button")
        const delete_button = document.getElementById("delete_button")
        update_button.style.visibility = "hidden"
        delete_button.style.visibility = "hidden"
    }
}

// ui 만 바꿔주는 것이기 때문에 async 를 넣지 않는다.
function updateMode() {

    const title = document.getElementById("title")
    const content = document.getElementById("content")
    // 엘리멘트 하이드 가리는 기능
    title.style.visibility = "hidden"
    content.style.visibility = "hidden"

    const input_title = document.createElement("textarea")
    input_title.setAttribute("id", "input_title")
    input_title.innerText = title.innerHTML

    const input_content = document.createElement("textarea")
    input_content.setAttribute("id", "input_content")
    // content.innerHTML 으로 내용을 불러옴으로써 수정하기 클릭시 내용이 포함되어 input 변경
    input_content.innerText = content.innerHTML
    // 10줄 제한
    input_content.row = 10

    const body = document.body
    body.insertBefore(input_title, title)
    body.insertBefore(input_content, content)

    // update_button 을 가져오고
    const update_button = document.getElementById("update_button")
    // setAttribute 으로 onclick 시에 updateArticle() 함수 실행
    update_button.setAttribute("onclick", "updateArticle()")

}

async function updateArticle() {
    var input_title = document.getElementById("input_title")
    var input_content = document.getElementById("input_content")
    // 꼭 확인
    // console.log(input_title.value, input_content.value)

    const article = await patchArticle(article_id, input_title.value, input_content.value);

    input_title.remove()
    input_content.remove()

    const title = document.getElementById("title")
    const content = document.getElementById("content")

    // 가렸던 제목과 내용을 visible 사용해서 다시 보이기로
    title.style.visibility = "visible"
    content.style.visibility = "visible"

    update_button.setAttribute("onclick", "updateMode()")

    loadArticle(article_id)
}

async function removeArticle() {
    await deleteArticle(article_id)

}


loadArticle(article_id);