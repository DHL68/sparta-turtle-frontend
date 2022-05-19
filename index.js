async function loadArticles() {
    articles = await getArticles()
    console.log(articles)


    const article_list = document.getElementById("articles")

    // forEach 함수를 사용해서 리스트 된 엘리먼트를 나눠 출력한다.
    articles.forEach(article => {
        console.log(article)
        const newArticle = document.createElement("li");
        newArticle.setAttribute("id", article._id) // setAttribute 고유의 id 값을 달아준다.
        newArticle.innerText = article.title // article._title 을 가져와서 제목을 innerText 로 설정
        article_list.appendChild(newArticle) // appendChild 를 이용해 newArticle 을 자식으로 붙인다.
    });

}

async function checkLogin() {
    // name 에 user 의 email 이 담겨짐
    const name = await getName();
    console.log(name)
    const username = document.getElementById("username")
    const loginoutButton = document.getElementById("loginout")
    // name 값이 있다면은
    if (name) {
        // id = "username" 의 이름을 name(email) 으로 바꿔줌
        username.innerText = name
        // 버튼의 이름도 로그아웃으로 바꿔줌
        loginoutButton.innerText = "로그아웃"
        // setAttribute 으로 클릭 시 logout 함수가 실행되라
        loginoutButton.setAttribute("onclick", "logout()")
    } else {
        username.innerText = "로그인해주세요."
        loginoutButton.innerText = "로그인"
        loginoutButton.setAttribute("onclick", "location.href='/login.html'")
    }
}


// 바로 실행
checkLogin();
loadArticles();
