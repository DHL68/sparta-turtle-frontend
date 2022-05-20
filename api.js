const backend_base_url = "http://127.0.0.1:5002"
const frontend_base_url = "http://127.0.0.1:5501"

async function handleSignin() {

    // 회원가입 입력
    const signupData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById("floatingPassword").value
    }

    // 회원가입 api 전송
    const response = await fetch(`${backend_base_url}/signup`, {
        method: 'POST',
        body: JSON.stringify(signupData)

    }
    )

    console.log(response)

    response_json = await response.json()
    console.log(response_json)

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/login.html`);
    } else {
        alert(response.status)
    }
}



async function handlelogin() {

    // 로그인 입력
    const loginData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById("floatingPassword").value
    }

    // 로그인 api 전송
    const response = await fetch(`${backend_base_url}/login`, {
        method: 'POST',
        body: JSON.stringify(loginData)

    }
    )

    console.log(response)

    response_json = await response.json()
    console.log(response_json)
    localStorage.setItem("token", response_json.token)

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        alert(response.status)
    }


}


async function getName() {
    const response = await fetch(`${backend_base_url}/getuserinfo`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    )


    // status 200 을 확인하는 조건문
    if (response.status == 200) {
        response_json = await response.json()
        console.log(response_json)
        return response_json.email
    }
    else {
        return null
    }

}



async function postarticle(title, content) {
    // db 테이블의 구성
    const articleDate = {
        title: title,
        content: content
    }
    console.log(articleDate)

    // 리스폰을 받기 위한 초기 구성
    const response = await fetch(`${backend_base_url}/article`, {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(articleDate)
    })

    // 받아온 response 를 json 화 시켜준다
    response_json = await response.json()
    console.log(response_json)

    // 성공 시 조건문
    if (response.status == 200) {
        // 조건이 맞으면 메인 페이지로 이동
        window.location.replace(`${frontend_base_url}/`);
    } else {
        alert(response.status)
    }
}

async function getArticles() {
    const response = await fetch(`${backend_base_url}/article`, {
        method: 'GET',
    }
    )

    response_json = await response.json()

    return response_json.articles

}


// 로그아웃 기능
function logout() {
    localStorage.removeItem('token')
    window.location.replace(`${frontend_base_url}/`);
}

// 게시글의 상세 프론트
function article_detail(article_id) {
    console.log(article_id)
    const url = `${frontend_base_url}/article_detail.html?id=${article_id}`
    // 이동하고 싶은 url 생성
    location.href = url

}

// 게시글 상세 fetch
async function getArticleDetail(article_id) {
    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        method: 'GET',

    })
    response_json = await response.json()
    console.log(response_json)

    return response_json.article
}


async function patchArticle(article_id, title, content) {

    const articleData = {
        "title": title,
        "content": content
    }

    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        method: 'PATCH',
        body: JSON.stringify(articleData)
    }
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}








