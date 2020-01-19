import React, { useState, useEffect } from 'react';
import { Form, Input, TextArea, Button, Image, Message, Header, Icon } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

const INITIAL_PRODUCT = {
  name: '',
  price: '',
  media: '',
  description: ''
};

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const isProduct = Object.values(product).every(elm => Boolean(elm));
    setDisabled(!isProduct);
  }, [product]);

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === 'media') {
      setProduct(prevState => ({ ...prevState, media: files[0] }))
      setMediaPreview(window.URL.createObjectURL(files[0]))
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }))
    }
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append('file', product.media);
    data.append('upload_preset', 'reactreserve');
    data.append('colud_name', 'msonmez');
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaURL = response.data.url;
    return mediaURL;
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);
      setError('');
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/product`;
      const { name, price, description } = product;
      const payload = { name, price, description, mediaUrl };
      await axios.post(url, payload);
      // console.log(response);
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header as='h2' block>
        <Icon name='add' color='orange' />
        Create New Product
      </Header>
      <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
        <Message success icon='check' header='Success!' content='Your product has been posted.' />
        <Message error header='Oops!' content={error} />
        <Form.Group widths='equal'>
          <Form.Field value={product.name} onChange={handleChange} control={Input} name='name' label='Name' placeholder='Name' />
          <Form.Field value={product.price} onChange={handleChange} control={Input} name='price' label='Price' placeholder='Price' min='0.00' step='0.01' type='number' />
          <Form.Field onChange={handleChange} control={Input} name='media' label='Media' content='Select Image' type='file' accept='image/*' />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size='small' />
        <Form.Field value={product.description} onChange={handleChange} control={TextArea} name='description' label='Description' placeholder='Description' />
        <Form.Field disabled={disabled || loading} control={Button} color='blue' icon='pencil alternate' content='Submit' type='submit' />
      </Form>
    </>
  );
}

export default CreateProduct;
