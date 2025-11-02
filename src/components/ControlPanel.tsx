import { useEffect, useState } from "react";
import { BackgroundPickerRef } from "./ui/BackgroundPicker";
import { MainPanel } from "./MainPanel";

type Props = {
  bgRef: React.RefObject<HTMLImageElement>;
  bgPickerRef: React.RefObject<BackgroundPickerRef>;
};

export const SpotifyInstaller = ({ bgRef, bgPickerRef }: Props) => {
  const [isReady, setIsReady] = useState(false);

  // useEffect(() => {
  //   // Animate background fade-in
  //   // bgRef.current.classList.remove("opacity-0");
  //   // bgRef.current.classList.add("opacity-100");
  //   // bgRef.current.style.pointerEvents = "auto";

    

  //   const runSpotifySetup = async () => {
  //     try {

        
  //       const rt = localStorage.getItem("rt");
  //       if (rt) {
  //         console.log("Existing refresh token found, skipping auth");
  //         setIsReady(true);
  //         return;
  //       }

  //       const password = localStorage.getItem("pass");
  //       // console.log(password);
  //       if (!password) {
  //         console.error("No stored password found");
  //         return;
  //       }

  //       // 1️⃣ Get creds from backend
  //       const res = await fetch("http://localhost:8000/api/get-creds", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ password }),
  //       });
  //       if (!res.ok) throw new Error("Unauthorized password");

  //       const creds = await res.json();
  //       console.log(creds);
  //       const clientId = creds.client_id.trim();
        

  //       // 2️⃣ Open popup for Spotify auth
  //       const width = 480;
  //       const height = window.outerHeight;
  //       const left = window.screenX + (window.outerWidth - width) / 2;
  //       const top = window.screenY + (window.outerHeight - height) / 2 + 55;
  //       const popup = window.open(
  //         "",
  //         "spotifyAuth",
  //         `width=${width},height=${height},left=${left},top=${top}`
  //       );

  //       popup!.location.href = `http://127.0.0.1:8000/api/redirect/?client_id=${clientId}`;

  //       setTimeout(() => {
  //         if (!popup || popup.closed) {
  //           console.error("Popup blocked or closed immediately");
  //         } else {
  //           popup.focus();
  //         }
  //       }, 500);

  //       // 3️⃣ Poll backend for callback result
  //       let callbackDone = false;
  //       const pollCallback = async () => {
  //         try {
  //           while (!callbackDone && popup && !popup.closed) {
  //             const poll = await fetch("http://127.0.0.1:8000/api/callback");
  //             const data = await poll.json();

  //             if (data.denied) {
  //               console.log("Authorization manually denied");
  //               popup.close();
  //               window.location.reload();
  //               break;
  //             }

  //             if (data.ok) {
  //               callbackDone = true;
  //               if (data.rt) {
  //                 localStorage.setItem("rt", data.rt);
  //                 console.log("Saved refresh token:", data.rt);
  //               }
  //               popup.close();
  //               break;
  //             }

  //             await new Promise((r) => setTimeout(r, 500));
  //           }
  //         } catch (err) {
  //           console.error(err);
  //         }
  //       };

  //       // ✅ Done

  //       const popupPromise = new Promise<void>((resolve) => {
  //         const timer = setInterval(() => {
  //           if (!popup || popup.closed) {
  //             clearInterval(timer);
  //             resolve();
  //           }
  //         }, 500);
  //       });

  //       // Wait for either callback completion or popup closure
  //       await Promise.race([pollCallback(), popupPromise]);

  //       if (!callbackDone) {
  //         console.error("Authorization not completed");
  //         window.location.reload();
  //         return;
  //       }
  //       setIsReady(true);
  //     } catch (err) {
  //       console.error("Spotify setup failed:", err);
  //     }
  //   };

  //   runSpotifySetup();
  // }, [bgRef]);

  // if (!isReady) {
  //   return (
  //     <div className="text-center mt-20 text-gray-400 animate-pulse">
  //       Connecting to Spotify...
  //     </div>
  //   );
  // }

  return (
    <section data-scrollbar>
      <div className="min-h-screen transition-all px-4 py-6">
        <div className="w-full">
          <main className="transition-all duration-400">
            <div className="w-full">
              <MainPanel />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};
