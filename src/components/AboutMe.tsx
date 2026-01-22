/* eslint-disable react/no-unescaped-entities */

import { faLetterboxd, faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AboutMe() {
  return (
    <section id="AboutMe" className="text-white py-24 px-12 sm:px-32 flex flex-col gap-4 full-w mx-auto">
      <h1 className="text-5xl font-bold text-center mb-4 sm:mb-0">About Me</h1>
      <h2 className="text-3xl font-bold text-start">Purpose</h2>
      <div className="flex items-center gap-4 text-gray-300 text-lg">
        <span>👋</span>
        <span>Hi, I'm Hadi. I'm a full-stack developer aiming to make real scalable products. </span>
      </div>
      <div className="flex items-center gap-4 text-gray-300 text-lg">
        <span>💻</span>
        <span>I enjoy building apps that solve problems that I face or I see other people face. </span>
      </div>
      <div className="flex items-center gap-4 text-gray-300 text-lg">
        <span>💡</span>
        <span>I started coding in JavaScript on Khan Academy in middle school, creating parkour games with basic physics.</span>
      </div>
      <h2 className="text-3xl font-bold text-start">Interests</h2>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-gray-300 text-lg">
            <span>🎬</span>
            <span>I like watching movies in my free time. My favorite movie is <a href="https://letterboxd.com/film/beautiful-boy-2018/" className="text-accent hover:underline">Beautiful Boy (2018)</a></span>
          </div>
          <div className="flex items-center gap-4 text-gray-300 text-lg">
            <span>🎵</span>
            <span>I mostly listen to indie rock music; my favorite song right now is <a href="https://www.youtube.com/watch?v=DTI8umrU0mE" className="text-accent hover:underline">Far Away From You</a> by Dogpark</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <a href="https://open.spotify.com/playlist/5dh4UqAOCk8A6I814BJldY?si=e32e27cb27f645af" aria-label="Spotify" className="flex flex-row items-center gap-2 text-gray-300 hover:text-accent">
          <span className="font-bold block">Spotify</span>
            <FontAwesomeIcon icon={faSpotify} size="2xl" />
          </a>
            
          <a href="https://boxd.it/iNm8n" aria-label="Letterboxd" className="flex flex-row items-center gap-3 text-gray-300 hover:text-accent">
          <span className="font-bold block">Letterboxd</span>
            <FontAwesomeIcon icon={faLetterboxd} size="2xl" />
          </a>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-start">Hobbies</h2>
      <div className="flex items-center gap-4 text-gray-300 text-lg">
        <span>🏋️‍♂️</span>
        <span>I've been working out for 3 years. I started with Olympic Weightlifting in high school, but switched to doing general resistance training after that.</span>
        {/* <span>225 lb Bench</span>
        <span>315 lb Squat</span> */}
      </div>
      <div className="flex items-center gap-4 text-gray-300 text-lg">
        <span>🛹</span>
        <span>My aunt bought me a cruiser so I could skate with my cousin. I quickly learned to love it and now skate around between classes and bus transfers.</span>
      </div>
      <h2 className="text-3xl font-bold text-start">Philosophy</h2>
      <div className="flex items-center gap-4 text-gray-300 text-lg">
        <span>🏋️‍♂️</span>
        <span>Lifting has led me to value consistent effort over temporary spurts of motivation. I apply this ideology to every aspect of my life.</span>
      </div>
      <div className="flex items-center gap-4 text-gray-300 text-lg">
        <span>👥</span>
        <span>I believe the key to effective teamwork is understanding each person's strengths and delegating tasks accordingly. </span>
      </div>
    </section>
  );
}
