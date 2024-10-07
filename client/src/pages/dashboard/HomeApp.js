import React from "react";
import { Stack } from "@mui/material";
import Hero from "../../sections/home/hero";
import About from "../../sections/home/about";
import Feature from "../../sections/home/feature";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Mousewheel, Pagination } from "swiper";

const HomeApp = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", height: "100%" }}
    >
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <Feature />
        </SwiperSlide>
        <SwiperSlide>
          <About />
        </SwiperSlide>
      </Swiper>
    </Stack>
  );
};

export default HomeApp;
