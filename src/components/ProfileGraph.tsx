import React from 'react'
import { Profile, ProfileStop } from '../profile/types'
// @ts-ignore
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid } from 'recharts'
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
    const expandedProfile = profile.map((stop: ProfileStop) => {
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
    const runTime = sum(fullProfile.map((stop: ProfileStop) => stop.t))
    const xTicks = [];
    for (let i = 0; i <= runTime; i += 10) {
        xTicks.push(i)
    }
    return xTicks
}

const ProfileGraph = (props: Props) => {
    const fullProfile = props.diveProfile.concat(props.decoProfile)
    const data = profileToRechartsData(fullProfile)
    const yTicks = fullProfile.map((stop: ProfileStop) => stop.d)
    const xTicks = getXTicks(fullProfile)
    return <LineChart width={750} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="runtime" label={{ value: "Runtime (minutes)", position: "insideBottom", offset: 0 }} ticks={xTicks} />
        <YAxis reversed ticks={yTicks} label={{ value: "Depth", position: "insideLeft", angle: -90 }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="depth" stroke="#8884d8" />
    </LineChart>
}

export default ProfileGraph