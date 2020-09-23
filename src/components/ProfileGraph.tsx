import React from 'react'
import { ProfileStop } from '../profile/types'
import Profile from '../profile/profile'
import Diver, { HistoryPoint } from '../profile/diver'
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
    diver: Diver
}

function diverToRechartsData(diver: Diver): DataPoint[] {
    const d = []
    for (let t = 0; t <= diver.runtime; t++) {
        const h = diver.getHistoryAt(t)
        d.push({ runtime: t, depth: h.depth, ceiling: h.ceiling })
    }
    return d
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
    const data = diverToRechartsData(props.diver)
    const yTicks = fullProfile.stops.map((stop: ProfileStop) => stop.d)
    const xTicks = getXTicks(fullProfile)

    const hasDeco = props.decoProfile.stops.length > 0;
    const decoBeginRuntime = props.diveProfile.runtime
    const decoEndRuntime = Math.round(props.diver.runtime)

    return <LineChart width={750} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="runtime" label={{ value: "Runtime (minutes)", position: "insideBottom", offset: 0 }} ticks={xTicks} />
        <YAxis reversed ticks={yTicks} label={{ value: "Depth", position: "insideLeft", angle: -90 }} interval={0} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="depth" stroke="#8884d8" dot={false} />
        <Line type="monotone" dataKey="ceiling" stroke="red" dot={false} />
        {hasDeco && <ReferenceArea x1={decoBeginRuntime} x2={decoEndRuntime - 1} label="Deco" fill="yellow" opacity={0.2} />}
    </LineChart>
}

export default ProfileGraph