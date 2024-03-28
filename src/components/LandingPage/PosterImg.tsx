import FleetWavePoster from "./FleetWavePoster.png";

const PosterImg = () => {
  return (
    <section className="relative py-10">
      <div className="container">

        <div className="flex flex-wrap">
          <div>
            <div
              className="wow fadeInUp overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative items-center justify-center">
                <img src={FleetWavePoster} alt="Poster image" className="w-max-full h-max-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PosterImg;
