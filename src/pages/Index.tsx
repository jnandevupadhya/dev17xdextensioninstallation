import { SpotifyInstaller } from "@/components/SpotifyInstaller";
import { BackgroundPicker } from "@/components/BackgroundPicker";
import { useEffect, useState } from "react";

const Index = () => {
  //localStorage.setItem("warningClicked", "false");

  const [clicked, setClicked] = useState(
    localStorage.getItem("warningClicked") === "true"
  );
  const [showInstaller, setShowInstaller] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundFillType, setBackgroundFillType] = useState<"cover" | "contain" | "fill" | "none">("cover");
  const [backgroundBlur, setBackgroundBlur] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("warningClicked") === "true") {
      setShowInstaller(true);
    }
  }, []);
  const handleClick = () => {
    setClicked(true);

    localStorage.setItem("warningClicked", "true");
    setTimeout(() => {
      setShowInstaller(true); // now render SpotifyInstaller
    }, 2000);
  };

  const handleBackgroundChange = (imageUrl: string | null, fillType: "cover" | "contain" | "fill" | "none", blur: number) => {
    if (imageUrl !== null) {
      setBackgroundImage(imageUrl);
    } else if (imageUrl === null && blur === 0) {
      // Only clear background when explicitly removing (blur is reset to 0)
      setBackgroundImage(null);
    }
    setBackgroundFillType(fillType);
    setBackgroundBlur(blur);
  };

  // Render either warning or main page
  return (
    <div className="h-full w-full relative">
      {/* Background Image Layer */}
      {backgroundImage && (
        <div 
          className="fixed inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: backgroundFillType,
            backgroundPosition: "center",
            backgroundRepeat: backgroundFillType === "none" ? "repeat" : "no-repeat",
            filter: `blur(${backgroundBlur}px)`,
            opacity: backgroundImage ? 1 : 0,
            zIndex: -1,
          }}
        />
      )}
      
      <BackgroundPicker onBackgroundChange={handleBackgroundChange} />
      {showInstaller ? (
        <SpotifyInstaller />
      ) : (
        <div className={`flex items-center justify-center h-screen w-full `}>
          <div
            className={`flex flex-col items-center justify-center h-[100%] transition-all duration-1000 gap-y-7 ${
              clicked ? "opacity-0 h-0" : "opacity-100 max-h-[100vh]"
            }`}
          >
            <span className="errors text-center text-2xl text-[#DBB2B9]">
              Please note, you can only host a room if you are a premium user..
              <br /> This will only be showed once, click OK to proceed
            </span>
            <button
              onClick={handleClick}
              className={`installer-button transition-opacity bg-[#DBB2B9] opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 hover:cursor-pointer ${
                clicked ? "opacity-0" : "opacity-100"
              }`}
              style={{ background: "#DBB2B9" }}
            >
              OK
            </button>
          </div>
          <div
            className={`container absolute transition-opacity duration-1000 ${
              clicked ? "opacity-100" : "opacity-0"
            }`}
            style={{ "--uib-size": "100px" } as React.CSSProperties}
          >
            <div className="cube"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
