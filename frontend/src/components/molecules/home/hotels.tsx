import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

function HotelsHome() {
  const hotels = [
    {
      name: "Aparthotel Stare Miasto",
      desc: "Old Town, Poland, Kraków",
      rating: 5.5,
      type: "Fabulous",
      img: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Aparthotel Stare Miasto",
      desc: "Old Town, Poland, Kraków",
      rating: 5.5,
      type: "Fabulous",
      img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Aparthotel Stare Miasto",
      desc: "Old Town, Poland, Kraków",
      rating: 5.5,
      type: "Fabulous",
      img: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Aparthotel Stare Miasto",
      desc: "Old Town, Poland, Kraków",
      rating: 5.5,
      type: "Fabulous",
      img: "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Aparthotel Stare Miasto",
      desc: "Old Town, Poland, Kraków",
      rating: 5.5,
      type: "Fabulous",
      img: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Aparthotel Stare Miasto",
      desc: "Old Town, Poland, Kraków",
      rating: 5.5,
      type: "Fabulous",
      img: "https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];
  return (
    <section className="mt-10">
      <h2 className="font-bold text-xl mb-3">Homes guests love</h2>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, EffectCoverflow]}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {hotels.map((item, index) => (
          <SwiperSlide key={index} className="pb-10">
            <div className="pb-5 border rounded-xl overflow-hidden">
              <div className="min-h-36 max-h-36 overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full" />
              </div>
              <div className="p-2">
                <h6 className="font-bold">{item.name}</h6>
                <p className="text-zinc-700 text-sm">{item.desc}</p>
                <div className="flex gap-2">
                  <span className="px-[5px] text-sm bg-primary text-white rounded">
                    {item.rating}
                  </span>
                  <span className="text-sm">{item.type}</span>
                  <span className="text-sm">2.19 reviewers</span>
                </div>
                <button className="py-[7px] text-sm text-zinc-700">
                  Starting from{" "}
                  <span className="font-bold text-black"> Rp.2.30.000</span>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HotelsHome;
