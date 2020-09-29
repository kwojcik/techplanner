import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileGraph from './components/ProfileGraph'
import TankList from './components/TankList'
import Diver from "./profile/diver";
import { BreathingGas } from "./profile/types"
import Profile, { calculateDecoProfile } from "./profile/profile";

function App() {

  const profile = new Profile([{ d: 50, t: 26 }]);
  const gases: BreathingGas[] = [{ percentn2: 77, percenthe2: 0 }, { percentn2: 27, percenthe2: 0 }]
  const tanks = gases.map(gas => ({ gas: gas, volume: 12, fullPressure: 300, currentPressure: 300 }))
  const diver = new Diver(0.79, 0, tanks, 5)
  diver.expose(profile);
  const decoProfile = calculateDecoProfile(diver);

  return (
    <div className="App" >
      <ProfileGraph diver={diver} diveProfile={profile} decoProfile={decoProfile} />
      < TankList initialTanks={diver.tanks} />
    </div>
  );
}

export default App;
