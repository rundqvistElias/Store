import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getAsync, Article, addArticle, removeArticle } from './articleSlice';
import {postArticle, deleteArticle} from './articleAPI'
import './Article.css'
import Footer from './footer'
import Navbar from './Navbar';



export function Articles() {
  const articles = useAppSelector(state => state.articles.articles);
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.articles.status);
  const [articleName, setArticleName] = useState("")
  const [articlePrice, setArticlePrice] = useState<number>(0)
  

  const handleSubmit = (event: any) => {
  const article: Article = {article_title: articleName, article_price: articlePrice}
  let newArticle = new Promise((resolve) => {resolve(postArticle(article))})
  newArticle.then((value) =>
  dispatch(addArticle(value))
  )
  event.preventDefault()
  };
  
  const handleDelete = (id: any) => {
    deleteArticle(id)
    dispatch(removeArticle(id))
  }


  useEffect(() => {
      if(status === 'idle') {
          dispatch(getAsync())
        }          
  }, [])

  

  return (
    <div className='App'>
        <header className='App-header'>DIS IS HEADER</header>
        <Navbar />
        <div className='List-wrapper'>
          <ul>
            {articles.map((article, index) =>{
                return <li key={index} className='List-item'>{article.article_title} {article.article_price} <button className='Button' onClick={() => handleDelete(article.id)}>X</button></li>
              })}
          </ul>
        </div>  
        <div className='Submit-wrapper'>
          <input
          onChange={(e) => setArticleName(e.target.value)}
          value={articleName}>
          </input>

          <input
          type='number'
          onChange={(e) => setArticlePrice(e.target.value !== "" ? parseFloat(e.target.value) : 0)}
          value={articlePrice}>
          </input>
        <button className='Button' onClick={handleSubmit}>
            Submit
        </button>
        </div>

        <Footer />
    </div>
  );
}