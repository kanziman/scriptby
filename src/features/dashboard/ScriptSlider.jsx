// import Slider from "react-slick";
// import settings from "../../ui/sliderSettings";
// import ScriptSliderItem from "./ScriptSliderItem";

// function ScriptSlider({ items = [] }) {
//   return (
//     <Slider {...settings}>
//       {items.map((item) => {
//         return <ScriptSliderItem item={item} key={item.id} />;
//       })}
//     </Slider>
//   );
// }

// export default ScriptSlider;

import { useIntl } from "react-intl";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Empty from "../../ui/Empty";
import ScriptSliderItem from "./ScriptSliderItem";

const StyledSlider = styled.div`
  /* width: 100%; */
`;

function ScriptSlider({ items = [] }) {
  const intl = useIntl();
  const resourceName = intl.formatMessage({ id: "menu.scripts" });

  if (!items?.length) return <Empty resource={resourceName} />;

  return (
    <StyledSlider>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          544: { slidesPerView: 3 },
          800: { slidesPerView: 3 },
          960: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="script-slider"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <ScriptSliderItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledSlider>
  );
}

export default ScriptSlider;
