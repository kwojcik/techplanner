import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileGraph from './components/ProfileGraph'
import GasList from './components/GasList'
import Diver from "./profile/diver";
import Profile, { calculateDecoProfile } from "./profile/profile";

function App() {

  const profile = new Profile([{ d: 25, t: 25 }, { d: 50, t: 25 }]);

  const diver = new Diver(0.79, 0, [
    { percentn2: 79, percenthe2: 0 }, { percentn2: 50, percenthe2: 0 }, { percentn2: 20, percenthe2: 0 }
  ]);
  diver.expose(profile);
  const decoProfile = calculateDecoProfile(diver);

  return (
    <div className="App">
      <ProfileGraph diver={diver} diveProfile={profile} decoProfile={decoProfile}></ProfileGraph>
      <GasList initialGases={diver.breathingGases} />
    </div>
  );
}

export default App;
