import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, header, body } = feature;
  
  return (
    <div className="w-full">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div 
          className="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md text-white"
          style={{ backgroundColor: 'rgb(74 108 247 / var(--tw-bg-opacity))' }} // Added inline style
        >
          {/* Check if the icon is a valid component or string */}
          {icon && typeof icon === 'string' ? (
            <span dangerouslySetInnerHTML={{ __html: icon }} />
          ) : (
            icon // assuming icon is an SVG component if it's not a string
          )}
        </div>
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {header}
        </h3>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
          {body}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;
