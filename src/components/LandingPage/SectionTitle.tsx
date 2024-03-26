const SectionTitle = ({
    title,
    paragraph,
    width = "570px",
    center,
    mb = "100px",
  }: {
    title: string;
    paragraph: string;
    width?: string;
    center?: boolean;
    mb?: string;
  }) => {
    return (
      <>
        <div
          className={`wow fadeInUp w-full ${center ? "mx-auto text-center" : ""}`}
          data-wow-delay=".1s"
          style={{ maxWidth: width, marginBottom: mb }}
        >
          <h2 className="mb-4 text-3xl font-bold !leading-tight text-neutral-950 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:text-gray-300 sm:text-4xl md:text-[45px]">
            {title}
          </h2>
          <p className="text-base !leading-relaxed text-body-color md:text-lg">
            {paragraph}
          </p>
        </div>
      </>
    );
  };
  
  export default SectionTitle;
  