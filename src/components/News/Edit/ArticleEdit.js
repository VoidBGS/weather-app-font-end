import React, {useState, useEffect} from 'react'
import './ArticleEdit.css'
import axios from 'axios'
import ArticleEditForm from './ArticleEditForm'
import ArticleDeleteButton from  './ArticleDeleteButton'

const ArticleEdit = ({match}) =>{
    useEffect(() => {
        getArticle(match.params.id);
        }, []);

    const [article, setArticle] = useState({})
   
    const URL = `https://localhost:5001/api/NewsArticles/${match.params.id}`

    const getArticle = async (id) =>{
        const response = await axios.get(URL)
        .then(
          response => setArticle(response.data)
        ).catch(function (error) {
          console.error(error);
        })
       }

    return article ? (
      <>
      {sessionStorage.getItem('Token') ? (
          <>
            <ArticleEditForm article={article} />
            <ArticleDeleteButton article={article} />
          </>) : window.location.replace('http://localhost:3000/News')
            }
      </>
    ): null
} 

export default ArticleEdit