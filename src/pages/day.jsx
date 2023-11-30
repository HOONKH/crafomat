import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import englishData from "../englishData.json";
import axios from "axios";

const Day = () => {
  const { day } = useParams();
  const [dailyData, setDailyData] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onClickNext = () => {
    currentPage === dailyData.sentences.length - 1
      ? setCurrentPage(0)
      : setCurrentPage(currentPage + 1);
  };
  const onClickPrev = () => {
    currentPage === 0
      ? setCurrentPage(dailyData.sentences.length - 1)
      : setCurrentPage(currentPage - 1);
  };

  const onClickSound = async () => {
    try {
      setIsLoading(true);

      if (isLoading) return;
      const response = await axios.post(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_API_KEY}`,
        {
          input: {
            text: dailyData.sentences[currentPage].english,
          },
          voice: {
            languageCode: "en-gb",
            name: "en-GB-Standard-A",
            ssmlGender: "FEMALE",
          },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: 0.7,
            pitch: -20.0,
          },
        }
      );
      console.log(response);
      const binaryData = atob(response.data.audioContent);

      const byteArray = new Uint8Array(binaryData.length);

      for (let i = 0; i < binaryData.length; i++) {
        console.log(binaryData.charCodeAt(i));
        byteArray[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([byteArray.buffer], { type: "audio/mp3" });
      // console.log(binaryData);
      // console.log(blob);
      const newAudio = new Audio(URL.createObjectURL(blob));
      // console.log(newAudio);
      document.body.appendChild(newAudio);
      newAudio.play();

      setTimeout(() => setIsLoading(false), 4000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    englishData.forEach((v) => {
      if (v.day === +day) {
        setDailyData(v);
      }
    });
  }, [day]);

  useEffect(() => {
    console.log(dailyData);
  });

  if (!dailyData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen max-w-screen-md mx-auto pt-20 px-8 ">
      <div>
        <Link to="/">Backk</Link>
        <h1>
          {dailyData.day}-{dailyData.title}
        </h1>
        <ul>
          <div>
            <li>{dailyData.sentences[currentPage].english}</li>
            <li>{dailyData.sentences[currentPage].korean}</li>
          </div>
          <button
            onClick={onClickPrev}
            className={`${currentPage === 0 && "button-hidden"}`}
          >
            Prev
          </button>
          <button
            onClick={onClickNext}
            className={`${
              currentPage === dailyData.sentences.length - 1 && "button-hidden"
            }`}
          >
            Next
          </button>
          <button
            onClick={onClickSound}
            className={`${isLoading && "button-hidden"}`}
          >
            Sound
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Day;
