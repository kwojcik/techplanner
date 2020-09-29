import React from 'react'
import { BreathingGas, ProfileStop, Tank } from '../profile/types'
import Profile from '../profile/profile'
import Diver from '../profile/diver'

interface Props {
    diveProfile: Profile
    decoProfile: Profile
    diver: Diver
}

const ProfileTextual = (props: Props) => {
    return <>
        <h4>
            Profile Summary:
        </h4>
        <h6>Stops</h6>
        {props.diveProfile.concat(props.decoProfile).stops.map(stop => {
            let line = `${stop.d}m ${stop.t}min`
            if (stop.g) {
                line += ` ${100 - stop.g.percentn2 - stop.g.percenthe2}%o2 ${stop.g.percenthe2}%he2`
            }
            return <>{line}<br /></>
        })
        }
        <b>Total Runtime </b>{`${Math.ceil(props.diver.runtime)}min`}
        <h6>Tanks</h6>
        {props.diver.tanks.map((tank, i) => (<>{`tank${i} ${Math.round(tank.currentPressure / tank.fullPressure * 100.0)}% full`}<br /></>))}
    </>
}

export default ProfileTextual