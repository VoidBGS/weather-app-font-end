import React from 'react'
import {Row, Button} from 'react-bootstrap'
import ArticleInfo from './ArticleInfo'
import {Link} from "react-router-dom";

const ArticleContent = ({article}) => {
    return(
        <Row>
            <div className="article-content-text">
                <ArticleInfo article={{ article }} />
                {article.articleContent}
            </div>
            {sessionStorage.getItem('Token') ? (
            <Button variant="warning" size="lg" href={`${article.id}/Edit`} className="news-form-button my-4" block>Article Settings</Button>
            ) : null}
        </Row>
    )
}

export default ArticleContent;