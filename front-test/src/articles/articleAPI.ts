import axios from 'axios'
import { Article } from './articleSlice'

export async function getArticles() {
    const res = await(axios.get('http://127.0.0.1:8000/api/articles'))
    .then((response) => { return response.data})
    return res
}


export async function postArticle(article: Article) {
    
    const res = await(axios.post('http://127.0.0.1:8000/api/articles', {
        article_title: article.article_title,
        article_price: article.article_price
    }, {
        auth: {username: 'admin', password: 'admin'}
    }))
    .then((response) => {return response.data})
    console.log(res);
    
    return res
}

export function deleteArticle(id: number){
    axios.delete('http://127.0.0.1:8000/api/articles/' + id, {
        auth: {username: 'admin', password: 'admin'}
    })
    .then(() => console.log("DELETED", id));
}

