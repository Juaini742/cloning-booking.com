function OfferHome() {
  return (
    <section>
      <h3 className="text-xl font-bold">Offers</h3>
      <div className="flex gap-3 overflow-x-auto">
        <div className="w-[400px] min-w-[400px] lg:flex-1 lg:w-full px-4 py-5 shadow border rounded-md flex flex-col justify-center">
          <h6 className="font-bold">Fly away your dream holiday</h6>
          <div className="flex items-center ">
            <p className="text-sm text-zinc-700 flex-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Adipisci, nihil.
            </p>
            <img src="../img/plane.png" alt="plane" className="w-24" />
          </div>
          <div>
            <button className="btn-primary px-5 py-[7px] text-sm rounded">
              Search for flights
            </button>
          </div>
        </div>
        <div
          className="w-[400px] min-w-[400px] lg:flex-1 lg:w-full shadow border rounded-md overflow-hidden"
          style={{
            backgroundImage: `url("../img/offerbg.jpg")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="w-full h-full p-3  flex flex-col justify-center bg-gradient-to-r from-black/55 to-transparent">
            <h6 className="font-bold text-white">Size the moment</h6>
            <p className="text-sm text-white">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Adipisci, nihil.
            </p>
            <div>
              <button className="btn-primary mt-5 px-5 py-1 rounded">
                Find Gateway Deals
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OfferHome;
