import { useNavigate } from "react-router-dom";

const FeatureCard = ({ title, image, route }) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-4 sm:p-6 cursor-pointer "
      onClick={() => navigate(route)}
    >
      <div className="bg-transparent rounded-full shadow-2xl p-6 sm:p-10  text-center hover:scale-105 transition-transform duration-200">
        <img
          src={image}
          alt={title}
          className="rounded-md max-w-[100px] mx-auto"
        />
        <p className="text-lg text-black mt-4 dark:text-neutral-200 whitespace-nowrap font-medium">
          {title}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
