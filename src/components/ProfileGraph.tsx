import React from 'react'
import { BreathingGas, ProfileStop } from '../profile/types'
import Profile from '../profile/profile'
import Diver from '../profile/diver'
// @ts-ignore
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid, ReferenceLine, ReferenceArea } from 'recharts'

type DataPoint = {
    runtime: number
    depth: number
    ceiling: number
    gas: BreathingGas
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
        d.push({ runtime: t, depth: h.depth, ceiling: h.ceiling, gas: h.gas })
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

const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: { payload: { depth: number; ceiling: number; gas: BreathingGas } }[]; label: string }) => {
    if (!active) {
        return null
    }
    return (
        <div className="recharts-default-tooltip" style={{
            margin: 0,
            padding: 10,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            whiteSpace: 'nowrap',
        }}>
            <p className="recharts-tooltip-label">{`Runtime: ${label}`}</p>
            <p className="recharts-tooltip-label">{`Depth: ${payload[0].payload.depth}`}</p>
            <p className="recharts-tooltip-label">{`Ceiling: ${payload[0].payload.ceiling}`}</p>
            <p className="recharts-tooltip-label">{`Gas: n2: ${payload[0].payload.gas.percentn2}% he2: ${payload[0].payload.gas.percenthe2}%`}</p>
        </div>
    );
};

const ProfileGraph = (props: Props) => {
    const fullProfile = props.diveProfile.concat(props.decoProfile)
    const data = diverToRechartsData(props.diver)
    const yTicks = fullProfile.stops.map((stop: ProfileStop) => stop.d)
    const xTicks = getXTicks(fullProfile)

    const hasDeco = props.decoProfile.stops.length > 0;
    const decoBeginRuntime = props.diveProfile.runtime
    const decoEndRuntime = Math.round(props.diver.runtime)
    let lastGas = data[0].gas
    const switches: ReferenceLine[] = []
    data.forEach(p => {
        if (p.gas !== lastGas) {
            switches.push(<ReferenceLine key={p.runtime} x={p.runtime} label="Gas Switch" stroke="green" />)
            lastGas = p.gas
        }
    })


    return (<LineChart width={1000} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="runtime" label={{ value: "Runtime (minutes)", position: "insideBottom", offset: 0 }} ticks={xTicks} />
        <YAxis reversed ticks={yTicks} label={{ value: "Depth", position: "insideLeft", angle: -90 }} interval={0} />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Line type="monotone" dataKey="depth" stroke="#8884d8" dot={false} />
        <Line type="monotone" dataKey="ceiling" stroke="red" dot={false} />
        {hasDeco && <ReferenceArea x1={decoBeginRuntime} x2={decoEndRuntime - 1} label="Deco" fill="yellow" opacity={0.2} />}
        {switches}
    </LineChart>)
}

export default ProfileGraph