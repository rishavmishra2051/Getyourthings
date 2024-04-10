import React from 'react'
import Product from '../components/Product'
import Carousel from '../components/Carousel'
const Home = () => {
  const serviceId = process.env.REACT_APP_SERVICE_ID;
const templateId = process.env.REACT_APP_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_PUBLIC_KEY;
const apiKey = process.env.REACT_APP_API_KEY;

console.log(serviceId);
console.log(templateId);
console.log(publicKey);
console.log(apiKey);
  return (
    <div>
      <Carousel />
      <Product />
    </div>
  )
}

export default Home
