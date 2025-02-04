import React, { useEffect, useRef, useState } from "react";
import { client } from "./prismic";
import { Link, Route, Routes } from "react-router-dom";
import Reel from "./components/Reel";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default () => {
	let [videos, setVideos] = useState([]);
	let [slideIndex, setSlideIndex] = useState(0);

	let carouselRef = useRef();

	useEffect(() => {
		let fetchVideos = async () => {
			try {
				// Fetch all documents of type "video"
				let response = await client.getAllByType("video");

				console.log({ response });

				setVideos(response);
			} catch (error) {
				console.error("Failed to fetch videos:", error);
			}
		};

		fetchVideos();
	}, []);

	if (!videos.length) {
		return <div>Loading videos...</div>;
	}

	let handleDotClicked = (index) => {
		carouselRef.current.goToSlide(index);
	};

	return (
		<main>
			{/* This needs to be a Swiper thing... */}

			<section className="viewer__wrapper">
				<Carousel
					afterChange={(previousSlide, { currentSlide }) =>
						setSlideIndex(currentSlide)
					}
					minimumTouchDrag={30}
					responsive={{
						all: {
							breakpoint: { min: 0, max: Infinity },
							items: 1,
						},
					}}
					arrows={false}
					ref={function (el) {
						carouselRef.current = el;
					}}
				>
					{videos.map((video, index) => (
						<Reel
							playing={slideIndex === index}
							data={video.data}
						/>
					))}
				</Carousel>
			</section>

			<footer className="navigation__wrapper">
				{videos.map((v, index) => (
					<button
						className={`navigation__dot ${
							index === slideIndex ? "selected" : ""
						}`}
						onClick={handleDotClicked.bind(null, index)}
					/>
					// Need to change this to being a state change, not a url change
				))}
			</footer>
		</main>
	);
};
