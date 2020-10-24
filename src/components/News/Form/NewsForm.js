import React, {useState} from 'react'
import './NewsArticleForm.css'
import {Form, Button} from 'react-bootstrap'
import ImageUploader from 'react-images-upload';
import axios from 'axios';
const initialInputState = { title: "", content: "", image:""};

const NewsForm = () => {
    const [validated, setValidated] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialInputState)
    const URL = "https://localhost:44356/api/NewsArticles"

    const HandleInputChange = (e) =>{
      setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleClick = () => setLoading(true);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setLoading(false)
        }
        else{
          event.preventDefault();
          let data = JSON.stringify({
            ArticleTitle: formData.title,
            ArticleContent: formData.content,
            ArticlePicture: formData.image,
        });
          const res = await axios.post(URL, data, {
            headers: {
            'Content-Type': 'application/json'
            }
        }
        ).then(function (response){
            console.log(response);
            setLoading(false)
          }).catch(function (error) {
            console.error(error);
          })
          console.log(res);
        }
        setValidated(true);
    };

        return (
            <>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label className="news-form-title pt-4">Title</Form.Label>
        <Form.Control required size="lg" name="title" type="text" onChange={HandleInputChange} placeholder="The title of your article" minLength="10" maxLength="70"/>
        <Form.Control.Feedback type="invalid" className="feedback">Title is Empty!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label className="news-form-content" >Article Content</Form.Label>
        <Form.Control required as="textarea" name="content" rows="10" onChange={HandleInputChange} placeholder="Your article's content is placed here..." minLength="25"/>
        <Form.Control.Feedback type="invalid" className="feedback">The Article Content Needs to be at least 50 Characters long!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
        <Form.Label className="news-form-content" >Upload An Image</Form.Label>
        <Form.Control required size="lg" name="image" type="text" onChange={HandleInputChange} placeholder="The link to your article's image" minLength="10"/>
        </Form.Group>
        <Button variant="warning" size="lg" type="submit" disabled={isLoading} onClick={!isLoading ? handleClick : null} className="news-form-button mb-4" block> {isLoading ? 'Loading…' : 'Post Article'}</Button>
        </Form>
        </>
        )
}

export default NewsForm;