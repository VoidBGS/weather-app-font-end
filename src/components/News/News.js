import React, {useState, useEffect} from 'react'
import "./News.css"
import NewsBox from './NewsBox'
import {getArticles} from './getArticles'
import NewsTitle from './NewsTitle'
import {Link} from "react-router-dom";
import {Row, Col, Button} from 'react-bootstrap'

const News = () =>{
  useEffect(() => {
    callAPI();
    }, []);

     const [articles, setArticles] = useState([])
     
     const callAPI = async () =>{
     const {data} = await getArticles();
      if(data != undefined){
      setArticles(reverseArticles(data));}
    }
    
    function reverseArticles(array){
      return array.reverse()
    }
    
    return (
        <>
        <Row>
        <Col md={6}><NewsTitle/></Col>
        <Col md={{offset: 3}}><Button variant="warning" size="lg" href="News/Post" className="news-form-button m-4 px-4">Post Article</Button></Col>
        </Row>
        {articles && (
        <div className="news-page pt-4 mb-5">
        <div className="news-article-background pb-5">
        { articles.map(article =>(
         <Row key={article.id}>
           <Link to={`News/Article/${article.id}`} >{NewsBox(article)}</Link>
           </Row>
        ))}
        </div>
        </div>)}
        </>
    )
}

export default News;