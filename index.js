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

loadArticles();
getName();