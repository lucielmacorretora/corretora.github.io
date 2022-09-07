import React, { useState } from 'react';
import Carousel from '../../components/carousel'
import Menu from '../../components/menu';


function Main(){
    const [imgs, setimgs] = useState([
        {
          id: '0',
          alt: 'Learn React',
          link: 'https://firebasestorage.googleapis.com/v0/b/lucielma-site.appspot.com/o/carousel%2FFundo%20programa%202.jpg?alt=media&token=84f4c57a-8c24-4517-9536-35c4489da74a',
        },
        {
          id: '1',
          alt: 'Start to learn React',
          link: 'https://cdn-motorshow-ssl.akamaized.net/wp-content/uploads/sites/2/2019/11/novo-onix-premier-20-1024x580.jpg'
        },
        {
          id: '2',
          alt: 'Paisagem',
          link: 'https://img-21.ccm2.net/PkaZDNxdEAAPe5nx_394Q1bLgm4=/500x/5319836089a8425fb2f2e9977cd4a04e/ccm-faq/fotosfocate_unsplash.jpg'
        }
      ]);
    
    return (
        <div>
          <Menu />
          <h1>TEST</h1>
          <Carousel imgs={imgs} />
        </div>
    );
}

export default Main;