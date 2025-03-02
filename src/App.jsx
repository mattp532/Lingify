import { useState } from "react";
import "./App.css";
import { phraseBank } from "./data";
import Lang from "./Lang";
import Logo from "./assets/Logo.png";

function App() {
  const [count, setCount] = useState(0);
  const [currentLang, setLang] = useState("french");
  const languages = ["French", "Spanish", "Pinyin", "Jyutping"];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];
  const emojis = {"French":"🇫🇷","Spanish":"🇪🇸","Jyutping":"🇭🇰","Pinyin":"🇨🇳"}

  const romanizations={"Jyutping":"Cantonese","Pinyin":"Mandarin"}
  const [Difficulty, setDifficulty] = useState("Beginner");
  const [randomIndex, setRandomIndex] = useState(
    Math.floor(Math.random() * phraseBank[Difficulty].length)
  );
  const [isStarted, toggleStart] = useState(false);
  const [question, setQuestion] = useState(true);
  const [RandomQuestion, setRandomQuestion] = useState(() => {
    return phraseBank[Difficulty][randomIndex]["english"];
  });
  const [countQuestion, increaseQuestion] = useState(1);
  const [RandomAnswer, setRandomAnswer] = useState(() => {
    return phraseBank[Difficulty][randomIndex][currentLang];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
    toggleDropdown2(false);
    if (question === true) {
      const newRandomIndex = Math.floor(
        Math.random() * phraseBank[difficulty].length
      );
      setRandomIndex(newRandomIndex);
      setRandomQuestion(phraseBank[difficulty][newRandomIndex]["english"]);
      setRandomAnswer(phraseBank[difficulty][newRandomIndex][currentLang]);
    }
  };
  const handleLangChange = (language) => {
    setLang(language.toLowerCase());
    setRandomAnswer(
      phraseBank[Difficulty][randomIndex][language.toLowerCase()]
    );
    toggleDropdown(false);
  };
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
    setIsOpen2(false);
  };
  const toggleDropdown2 = () => {
    setIsOpen2((prevState) => !prevState);
    setIsOpen(false);
  };
  const handleStart = ()=>{
    toggleStart((isStarted)=>(!isStarted));
  }

  const handleShuffle = () => {
    const newRandomIndex = Math.floor(
      Math.random() * phraseBank[Difficulty].length
    );
    setRandomIndex(newRandomIndex);
    setQuestion(true);
    setRandomQuestion(phraseBank[Difficulty][newRandomIndex]["english"]);
    setRandomAnswer(phraseBank[Difficulty][newRandomIndex][currentLang]);
  };
  const handleReveal = () => {
    setQuestion(false);
  };
  const handleNext = () =>{
    handleShuffle();
    increaseQuestion(countQuestion+1);
  }
  if(countQuestion===11){
    toggleStart(false)
    increaseQuestion(1)
  }
  return (
    <div className="font-medium flex-col flex justify-center items-center h-1/1 bg-gray-800">
      <div className="text-2xl card flex w-80/100 justify-center items-center flex-col  bg-gray-600 h-48/100">
        {isStarted ? (
          <div className = "flex flex-col items-center w-100/100">
            <p className="text-white text-center">
              {question === true ? RandomQuestion : RandomAnswer}
            </p>
            {question === true ? (
              <div className="">
                <button
                  onClick={handleReveal}
                  className="mr-3 btn btn-lg btn-primary mt-5"
                >
                  Reveal Answer
                </button>

              </div>
            ) : (
              <button
                onClick={handleNext}
                className="btn btn-lg btn-primary mt-5"
              >
                Next
              </button>
            )}
                        <div className="mt-5 progress bg-white w-50/100 mt-7 h-4 flex items-center  ">
                          <div style={{ width: `${countQuestion*10}%` }} className ="duration-1000 progress bg-pink-600 w-94/100 h-30/100 mx-2">
                            
                          </div>
                        </div>
                        
                        <p className="text-lg text-white mt-3">{countQuestion}/10</p>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col w-100/100 h-100/100">
                        <img className ="h-30/100"src={Logo} alt="" />
            <p className="text-white text-3xl">Welcome to Lingify</p>
            <p className = "text-center text-xs text-white italic font-thin mt-2 w-80/100">Get phrases in English and practice translating them to your target language</p>

            <div className="navbar w-1/1 p-4 flex items-center justify-center flex-col">
            <div className = "flex">
              <div className="text-center ">
                <button
                  onClick={toggleDropdown}
                  className="btn btn-md btn-primary w-93/100 mr-1 min-w-max"
                >
                  {`Target Language: `+ emojis[currentLang.charAt(0).toUpperCase() + currentLang.slice(1)]}
                </button>

                {isOpen && (
                  <ul className=" text-sm absolute text-center mt-2 w-35 bg-white border rounded-md shadow-lg text-black">
                    {languages.map((language, index) => (
                      <Lang
                        key={index}
                        onClick={() => handleLangChange(language)}
                      >
                        {
                          (language in romanizations ?romanizations[language]:
                          language)+" "+emojis[language]
                        }
                        
                        
                      </Lang>
                    ))}
                  </ul>
                )}
              </div>
              <div className="text-center">
                <button
                  onClick={toggleDropdown2}
                  className="btn btn-md btn-primary w-26.5 "
                >
                  {Difficulty}
                </button>
                {isOpen2 && (
                  <ul className="text-sm absolute text-center mt-2 w-30 bg-white border rounded-md shadow-lg text-black">
                    {difficulties.map((difficulty, index) => (
                      <Lang
                        key={index}
                        onClick={() => handleDifficultyChange(difficulty)}
                      >
                        {difficulty}
                      </Lang>
                    ))}
                  </ul>
                )}
              </div>
              </div>
              <button onClick ={handleStart} className="btn btn-md btn-primary px-30 mt-2">Start</button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
