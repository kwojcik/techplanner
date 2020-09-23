import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileGraph from './components/ProfileGraph'
import Diver from "./profile/diver";
import Profile, { calculateDecoProfile } from "./profile/profile";

function App() {

  const profile = new Profile([{ d: 50, t: 50 }]);

  const diver = new Diver(0.79, 0, [
    { percentn2: 79, percenthe2: 0 }
  ]);
  diver.expose(profile);
  const decoProfile = calculateDecoProfile(diver);

  return (
    <div className="App">
      <ProfileGraph diveProfile={profile} decoProfile={decoProfile}></ProfileGraph>
    </div>
  );
}

export default App;
