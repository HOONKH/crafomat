import MainCard from "../compnents/MainCard";
import englishData from "../englishData.json";

const Main = () => {
  return (
    <div className="min-h-screen max-w-screen-md mx-auto pt-20 px-8">
      <div className="flex-col flex">
        <h1>Study English</h1>
        {englishData.map((v, i) => (
          <ul className="pt-8 ">
            <MainCard key={i} day={v.day} title={v.title} />
          </ul>
        ))}
      </div>
    </div>
  );
};
export default Main;
