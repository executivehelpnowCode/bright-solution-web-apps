import Star from "../assets/star.svg";

export default function Testimonial({ id, name, avatar, message, rating }) {
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => {
          const diff = rating - i;
          let opacity = diff >= 1 ? 1 : diff > 0 ? diff : 0.2;
          return (
            <img
              key={i}
              src={Star}
              alt="star"
              style={{ opacity }}
              className="w-4 h-4"
            />
          );
        })}
      </div>
    );
  };
  return (
    <div
      id={id}
      //   onClick={() => setActive(true)}
      className={`transition-all duration-500 cursor-pointer bg-white gap-3 relative p-4 w-full border-2 shadow-md rounded-2xl flex items-center flex-col justify-center`}
    >
      <img
        src={avatar}
        alt="user-avatar"
        className="w-24 h-24 rounded-full mt-4"
      />
      <div title={rating} aria-label={`Rating: ${rating} out of 5`}>
        {renderStars(rating)}
      </div>
      <p className="italic font-extralight flex items-center text-center min-h-[150px]">
        "{message}"
      </p>
      <p className="py-5 w-full flex items-center justify-center">~ {name}</p>
    </div>
  );
}
