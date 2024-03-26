import SectionTitle from "./SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="bg-gray-50 dark:bg-blue-950 py-5 md:py-20 lg:py-28">
        <div className="text-neutral-950 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:text-gray-500 container">
          <SectionTitle
            title="Main Features"
            paragraph=""
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
