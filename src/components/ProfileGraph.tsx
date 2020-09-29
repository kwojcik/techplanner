import React from 'react'
import { BreathingGas, ProfileStop, Tank } from '../profile/types'
import Profile from '../profile/profile'
import Diver from '../profile/diver'
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid, ReferenceLine, ReferenceArea } from 'recharts'
import TankList from './TankList'

type DataPoint = {
    runtime: number
    depth: number
    ceiling: number
    gas: BreathingGas
    // how
    tank0?: number;
    tank1?: number;
    tank2?: number;
    tank3?: number;
    tank4?: number;
    tank5?: number;
    tank6?: number;
    tank7?: number;
    tank8?: number;
    tank9?: number;
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
        let dataPoint: DataPoint = { runtime: t, depth: h.depth, ceiling: h.ceiling, gas: h.tanks[h.selectedTank].gas }
        h.tanks.forEach((tank: Tank, i: number) => {
            // @ts-ignore
            dataPoint[`tank${i}`] = tank.currentPressure / tank.fullPressure * 100.0
        })
        d.push(dataPoint)
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

const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: { payload: DataPoint }[]; label: string }) => {
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
            <p className="recharts-tooltip-label">{`Runtime: ${label}min`}</p>
            <p className="recharts-tooltip-label">{`Depth: ${payload[0].payload.depth}m`}</p>
            <p className="recharts-tooltip-label">{`Ceiling: ${payload[0].payload.ceiling}m`}</p>
            <p className="recharts-tooltip-label">{`Gas: n2: ${payload[0].payload.gas.percentn2}% he2: ${payload[0].payload.gas.percenthe2}%`}</p>
            {/*sigh*/}
            {payload[0].payload.tank0 && <p className="recharts-tooltip-label">{`Tank0: ${Math.round(payload[0].payload.tank0)}%`}</p>}
            {payload[0].payload.tank1 && <p className="recharts-tooltip-label">{`Tank1: ${Math.round(payload[0].payload.tank1)}%`}</p>}
            {payload[0].payload.tank2 && <p className="recharts-tooltip-label">{`Tank2: ${Math.round(payload[0].payload.tank2)}%`}</p>}
            {payload[0].payload.tank3 && <p className="recharts-tooltip-label">{`Tank3: ${Math.round(payload[0].payload.tank3)}%`}</p>}
            {payload[0].payload.tank4 && <p className="recharts-tooltip-label">{`Tank4: ${Math.round(payload[0].payload.tank4)}%`}</p>}
            {payload[0].payload.tank5 && <p className="recharts-tooltip-label">{`Tank5: ${Math.round(payload[0].payload.tank5)}%`}</p>}
            {payload[0].payload.tank6 && <p className="recharts-tooltip-label">{`Tank6: ${Math.round(payload[0].payload.tank6)}%`}</p>}
            {payload[0].payload.tank7 && <p className="recharts-tooltip-label">{`Tank7: ${Math.round(payload[0].payload.tank7)}%`}</p>}
            {payload[0].payload.tank8 && <p className="recharts-tooltip-label">{`Tank8: ${Math.round(payload[0].payload.tank8)}%`}</p>}
            {payload[0].payload.tank9 && <p className="recharts-tooltip-label">{`Tank9: ${Math.round(payload[0].payload.tank9)}%`}</p>}
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
    const switches = data.map(p => {
        if (p.gas.percenthe2 !== lastGas.percenthe2 || p.gas.percentn2 !== lastGas.percentn2) {
            lastGas = p.gas
            return <ReferenceLine yAxisId="left" key={p.runtime} x={p.runtime} label="Gas Switch" stroke="green" />
        }
        return null
    }).filter(e => e)

    const tankLines = props.diver.tanks.map((_, i) =>
        <Line yAxisId='right' type="monotone" dataKey={`tank${i}`} stroke="black" dot={false} />
    )


    return (<LineChart width={1000} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="runtime" label={{ value: "Runtime (minutes)", position: "insideBottom", offset: 0 }} ticks={xTicks} />
        <YAxis yAxisId="left" reversed ticks={yTicks} label={{ value: "Depth", position: "insideLeft", angle: -90 }} interval={0} />
        <YAxis yAxisId="right" orientation="right" ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} label={{ value: "Percent", position: "insideRight", angle: 90 }} />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Line yAxisId='left' type="monotone" dataKey="depth" stroke="#8884d8" dot={false} />
        <Line yAxisId='left' type="monotone" dataKey="ceiling" stroke="red" dot={false} />
        {hasDeco && <ReferenceArea yAxisId="left" x1={decoBeginRuntime} x2={decoEndRuntime - 1} label="Deco" fill="yellow" opacity={0.2} />}
        {switches}
        {tankLines}
    </LineChart>)
}

export default ProfileGraph