import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileGraph from './components/ProfileGraph'
import TankList from './components/TankList'
import Diver from "./profile/diver";
import { BreathingGas, Tank } from "./profile/types"
import Profile, { calculateDecoProfile } from "./profile/profile";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import cloneDeep from 'lodash/cloneDeep'
import ProfileTextual from './components/ProfileTextual';
import ProfileCreator from './components/ProfileCreator';
import Settings from './components/Settings'


function App() {

  const gases: BreathingGas[] = [{ percentn2: 77, percenthe2: 0 }, { percentn2: 27, percenthe2: 0 }]
  const defaultTanks = [
    { gas: gases[0], volume: 24, fullPressure: 300, currentPressure: 300 },
    { gas: gases[1], volume: 12, fullPressure: 300, currentPressure: 300 },
  ]
  const [tanks, setTanks] = useState(defaultTanks)
  const [profile, setProfile] = useState(new Profile([{ d: 50, t: 26, g: gases[0] }]));
  const [sac, setSac] = useState<number>(20);

  const diver = useMemo(() => new Diver(
    0.79,
    0,
    tanks,
    sac
  ), [sac, tanks])

  // Top everthing off
  tanks.forEach(tank => {
    tank.currentPressure = tank.fullPressure
  })

  diver.expose(profile);


  const decoProfile = calculateDecoProfile(diver);
  return (
    <div className="App" >
      <ProfileGraph diver={diver} diveProfile={profile} decoProfile={decoProfile} />
      <Row>
        <Col xs={4}>
          <TankList tanks={diver.tanks} onChange={(tanks) => setTanks(tanks)} />
        </Col>
        <Col xs={4}>
          <ProfileCreator profile={profile} onChange={(p: Profile) => setProfile(p)} />
        </Col>
        <Col xs={4}>
          <ProfileTextual diver={diver} diveProfile={profile} decoProfile={decoProfile} />
        </Col>
      </Row>
      <Row><Col xs={4}><Settings setSac={setSac} diver={diver} /></Col></Row>
    </div>
  );
}

export default App;
