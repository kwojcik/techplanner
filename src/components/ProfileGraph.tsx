import React from 'react'
import { ProfileStop } from '../profile/types'
import Profile from '../profile/profile'
// @ts-ignore
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid, ReferenceLine, ReferenceArea } from 'recharts'
import { flattenDeep, sum } from 'lodash'

type DataPoint = {
    runtime: number
    depth: number
}

interface Props {
    diveProfile: Profile
    decoProfile: Profile
}

function profileToRechartsData(profile: Profile): DataPoint[] {
    let minute = 0;
    const expandedProfile = profile.stops.map((stop: ProfileStop) => {
        const points = []
        for (let i = 0; i < stop.t; i++) {
            points.push({ runtime: minute, depth: stop.d })
            minute += 1
        }
        return points
    })
    return flattenDeep(expandedProfile)
}

function getXTicks(fullProfile: Profile): number[] {
    const runTime = fullProfile.runtime
    const xTicks = [];
    for (let i = 0; i <= runTime; i += 10) {
        xTicks.push(i)
    }
    return xTicks
}

const ProfileGraph = (props: Props) => {
    const fullProfile = props.diveProfile.concat(props.decoProfile)
    const data = profileToRechartsData(fullProfile)
    const yTicks = fullProfile.stops.map((stop: ProfileStop) => stop.d)
    const xTicks = getXTicks(fullProfile)

    const hasDeco = props.decoProfile.stops.length > 0;
    const decoBeginRuntime = props.diveProfile.runtime
    const decoEndRuntime = fullProfile.runtime

    return <LineChart width={750} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="runtime" label={{ value: "Runtime (minutes)", position: "insideBottom", offset: 0 }} ticks={xTicks} />
        <YAxis reversed ticks={yTicks} label={{ value: "Depth", position: "insideLeft", angle: -90 }} interval={0} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="depth" stroke="#8884d8" />
        {hasDeco && <ReferenceArea x1={decoBeginRuntime} x2={decoEndRuntime - 1} label="Deco" fill="yellow" opacity={0.2} />}
    </LineChart>
}

export default ProfileGraph