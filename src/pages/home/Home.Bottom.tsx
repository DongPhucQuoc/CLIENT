import React from 'react';
import Slider from "react-slick";
import { Carousel } from 'antd';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardBasic from 'components/card/CardBasic';
import Layout from "components/Layout";
import ProductDocument from 'interfaces/Product.Interface';

interface HomeBottomDocument {
  data: [ProductDocument[]] | undefined;
  handleAddToCart(id: string, quantity: number, size: string) : void;
}

const contentStyle: React.CSSProperties = {
  height: '500px',
  width: "100%",
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const images = [
  { id: 0, url: "https://img.freepik.com/free-vector/black-friday-sale-banner-with-limited-time-offer-details_1017-28051.jpg?size=626&ext=jpg" },
  { id: 1, url: "https://img.freepik.com/free-vector/horizontal-sale-banner-template_23-2148917183.jpg?size=626&ext=jpg" },
  { id: 2, url: "https://st2.depositphotos.com/6623886/10890/v/950/depositphotos_108909362-stock-illustration-super-sale-banner-design-you.jpg" }
];

const settings: any = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 3000,
  rows: 1,
  autoplaySpeed: 3000,
  cssEase: "linear",
  centerPadding: 30
};

const HomeBottom = ({ data, handleAddToCart }: HomeBottomDocument) => {
  return (
    <>
      <Carousel autoplay>
        {
          images.map(image => {
            return (
              <div key={image.id}>
                <img src={image.url} style={contentStyle} />
              </div>
            )
          })
        }
      </Carousel>
      <Layout>
        <Slider {...settings}>
          {
            data && data.map((products, index) => {
              return (
                <div key={index}>
                  <div className="home__feed">
                    {
                      products.map(product => {
                        return (
                          <CardBasic 
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                          />
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </Slider>
      </Layout>
    </>
  )
}

export default HomeBottom
