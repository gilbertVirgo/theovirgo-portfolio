import mime from "mime";
import { useRef, useState } from "react";

let vimeoVideoURLToPlayerURL = (videoURL) => {
	return (
		"https://player.vimeo.com/video/" +
		videoURL.split("/").slice(-1).toString()
	);
};

export default ({ data, playing = false }) => {
	let [hideOverlayOnMobile, setHideOverlayOnMobile] = useState(false);
	let [isMuted, setIsMuted] = useState(true);
	let [isOverlayBeingDragged, setIsOverlayBeingDragged] = useState(false);

	let handlePlayButtonClicked = () => {
		setIsMuted(false);
		setHideOverlayOnMobile(true);
	};

	let overlayRef = useRef();

	return (
		<div
			className={`reel__wrapper ${
				hideOverlayOnMobile ? "hide-overlay" : ""
			}`}
		>
			<div className={`reel__video`}>
				<video autoPlay muted={isMuted} playsInline loop>
					<source
						src={data.video_file.url}
						type={mime.getType(
							data.video_file.name.split(".").slice(-1)[0]
						)}
					/>
				</video>
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
				<button
					className="reel__video--mute-button"
					onClick={setIsMuted.bind(null, !isMuted)}
				>
					{isMuted ? "Sound on" : "Sound off"}
				</button>
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
