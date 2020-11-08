import React, {useState, useEffect} from 'react'
import { Row } from 'react-bootstrap'
import {getArticles} from '../News/getArticles'
import NewsArticleBox from './NewsArticleBox'

const News = () =>{
    const [articles, setArticles] = useState({});

    useEffect(() =>{
        fetchAPI();    
    }, [])

    async function fetchAPI(){
        const {data} = await getArticles();
         
        setArticles(reverseArticles(data));
    }
        
    function reverseArticles(array){
        return array.reverse()
    }

    const rows = [];

    for (var i = 0; i < 3; i++) {
       rows.push(NewsArticleBox(articles[i]));
    }

    return(
         <div>
            <Row className="weather-text"><p>Weather News</p></Row>
            <Row className="news-box-wrap pb-5">
             {rows}
            </Row>
         </div>
    )
}

export default News;