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
      if(data != undefined ){
      setArticles(data);
      }
    }
    
    return articles[0] ? (
      <>
        <Row className="justify-content-center"  >
          <NewsTitle />
        </Row>
        <Col className="news-article-background py-4 my-4">
          {sessionStorage.getItem('Token') ? (
            <Button variant="warning" size="lg" href="News/Post" className="news-button ml-5">Post Article</Button>
          ) : null}
          {articles.map(article => (
            <div className="m-5" key={article.id}>
              <Link  style={{ textDecoration: 'none' }} to={`News/Article/${article.id}`}>{NewsBox(article)}</Link>
            </div>
          ))}
        </Col>
      </>
    ) : (
        <>
          <Row className="justify-content-center">
            <NewsTitle />
          </Row>
          <Col className="news-loading py-4 my-4"></Col>
        </>
    )
}

export default News;
