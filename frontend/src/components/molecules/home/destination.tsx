function DestinationHome() {
  const destinations = [
    {
      img: "https://res.cloudinary.com/dixdqxpza/image/upload/v1710201315/samples/balloons.jpg",
      Region: "Jakarta",
    },
    {
      img: "https://res.cloudinary.com/dixdqxpza/image/upload/v1710201297/samples/landscapes/nature-mountains.jpg",
      Region: "Jakarta",
    },
    {
      img: "https://res.cloudinary.com/dixdqxpza/image/upload/v1710201286/samples/landscapes/girl-urban-view.jpg",
      Region: "Jakarta",
    },
    {
      img: "https://res.cloudinary.com/dixdqxpza/image/upload/v1710201285/samples/sheep.jpg",
      Region: "Jakarta",
    },
    {
      img: "https://res.cloudinary.com/dixdqxpza/image/upload/v1710201288/samples/bike.jpg",
      Region: "Jakarta",
    },
  ];
  return (
    <section className="mt-10">
      <h2 className="font-bold text-xl">Trending destinations</h2>
      <p className="mb-2 text-zinc-700">
        Most popular choices for travellers from Indonesia
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {destinations.slice(0, 2).map((destination) => (
          <div
            className="flex flex-col pt-8 pl-8 h-80 overflow-hidden rounded-md shadow-md"
            style={{
              backgroundImage: `url(${destination.img})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h6 className="text-2xl text-white font-bold">
              {destination.Region}
            </h6>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto">
        {destinations.map((destination) => (
          <div
            className="flex flex-col min-w-[350px] pt-8 pl-8 h-80 overflow-hidden rounded-md shadow-md"
            style={{
              backgroundImage: `url(${destination.img})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h6 className="text-2xl text-white font-bold">
              {destination.Region}
            </h6>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DestinationHome;
