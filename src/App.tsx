import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import CursorFollower from './components/CursorFollower';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import AchievementsFan from './components/sections/AchievementsFan';
import FeaturedWork from './components/sections/FeaturedWork';
import TechStack from './components/sections/TechStack';
import Contributions from './components/sections/Contributions';
import Education from './components/sections/Education';
import GetInTouch from './components/sections/GetInTouch';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <SplashScreen onDone={() => setSplashDone(true)} />
      <CursorFollower />
      <main className={`main-content${splashDone ? ' app-ready' : ''}`}>
        <Navbar />
        <div id="home" className="w-full min-h-dvh pt-17.5">
          <Hero />
          <FeaturedWork />
          <TechStack />
          <AchievementsFan />
          <Contributions />
          <Education />
          <GetInTouch />
        </div>
      </main>
    </>
  );
}
