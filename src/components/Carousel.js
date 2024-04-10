import React, { useState } from 'react'
import Slider from "react-slick";
import carousel1 from "../assets/carousel1.jpg"
import carousel2 from "../assets/carousel2.jpg"
import carousel3 from "../assets/carousel3.jpg"
import carousel4 from "../assets/carousel4.jpg"
import { useMediaQuery } from '@mui/material';
const Carousel = () => {
  const isMobile = useMediaQuery('(max-width: 720px)');
  const carouselHeight = isMobile ? "h-full" : "h-80";
    const [dotActive, setDocActive] = useState(0);
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      beforeChange: (prev, next) => {
        setDocActive(next);
      },
      appendDots: (dots) => (
        <div
          style={{
            position: "absolute",
            top: "70%",
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "210px",
          }}
        >
          <ul
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/*dots*/}
          </ul>
        </div>
      ),
      customPaging: (i) => (
        <div
          style={
            i === dotActive
              ? {
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  background: "#131921",
                  padding: "8px 0",
                  cursor: "pointer",
                  border: "1px solid #f3a847",
                }
              : {
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#232F3E",
                  color: "white",
                  padding: "8px 0",
                  cursor: "pointer",
                  border: "1px solid white",
                }
          }
        >
          {i + 1}
        </div>
      ),
      responsive: [
        {
          breakpoint: 500,
          settings: {
            dots: true,
            appendDots: (dots) => (
              <div
                style={{
                  position: "absolute",
                  top: "60%",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                  width: "150px",
                }}
              >
                <ul
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "12px",
                  }}
                >
                  {" "}
                  {dots}{" "}
                </ul>
              </div>
            ),
            customPaging: (i) => (
              <div
                style={
                  i === dotActive
                    ? {
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        background: "#131921",
                        padding: "8px 0",
                        cursor: "pointer",
                        border: "1px solid #f3a847",
                      }
                    : {
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#232F3E",
                        color: "white",
                        padding: "8px 0",
                        cursor: "pointer",
                        border: "1px solid white",
                      }
                }
              >
                {i + 1}
              </div>
            ),
          },
        },
      ],
    };
    return (
      <div className={`w-full ${carouselHeight}`}>
        <div className="w-full h-full relative">
          <Slider {...settings}>
            <div>
              <img src={carousel1} alt="bannerImgOne"/>
            </div>
            <div>
              <img src={carousel2} alt="bannerImgOne"/>
            </div>
            <div>
              <img src={carousel3} alt="bannerImgOne"/>
            </div>
            <div>
              <img src={carousel4} alt="bannerImgOne"/>
            </div>
          </Slider>
        </div>
      </div>
    );
}

export default Carousel
