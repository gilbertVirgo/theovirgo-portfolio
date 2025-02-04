import { useRef, useState } from "react";

let vimeoVideoURLToPlayerURL = (videoURL) => {
  return (
    "https://player.vimeo.com/video/" + videoURL.split("/").slice(-1).toString()
  );
};

export default ({ data, playing = false }) => {
  let [hideOverlayOnMobile, setHideOverlayOnMobile] = useState(false);
  let [muted, setMuted] = useState(window.innerWidth < 750);
  let [isOverlayBeingDragged, setIsOverlayBeingDragged] = useState(false);

  let handlePlayButtonClicked = () => {
    setMuted(false);
    setHideOverlayOnMobile(true);
  };

  let overlayRef = useRef();

  return (
    <div
      className={`reel__wrapper ${hideOverlayOnMobile ? "hide-overlay" : ""}`}
    >
      <div className={`reel__video`}>
        <iframe
          src={`${vimeoVideoURLToPlayerURL(data.video.url)}?${
            playing ? `autoplay=1&playsinline=1&` : ""
          }${
            muted ? `muted=1&` : ""
          }badge=0&loop=1&autopause=0&player_id=0&app_id=58479`}
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        />
        <div
          ref={overlayRef}
          className="reel__video--overlay"
          onPointerDown={setIsOverlayBeingDragged.bind(null, true)}
          onPointerUp={setIsOverlayBeingDragged.bind(null, false)}
          onClick={() => {
            if (isOverlayBeingDragged) return;

            overlayRef.current.style.pointerEvents = "none";
            setTimeout(() => {
              overlayRef.current.style.pointerEvents = "auto";
            }, 0);
          }}
        />
      </div>
      <div className="reel__info">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <img
          src={require("../../assets/play-icon.svg").default}
          className="reel__play-icon"
          onClick={handlePlayButtonClicked}
        />
      </div>
    </div>
  );
};

// https://player.vimeo.com/video/1047481029
