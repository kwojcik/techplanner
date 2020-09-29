import React, { useEffect, useState } from 'react'
import { BreathingGas, ProfileStop, Tank } from '../../profile/types'
import Profile from '../../profile/profile'
import Diver from '../../profile/diver'
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid, ReferenceLine, ReferenceArea } from 'recharts'
import TankList from '../TankList'
import SeriesSelector from './SeriesSelector'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CustomTooltip from './CustomTooltip'

export type DataPoint = {
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


function showSeries(selectedSeries: { name: string, enabled: boolean }[], seriesName: string) {
    for (let i = 0; i < selectedSeries.length; i++) {
        if (selectedSeries[i].name === seriesName && selectedSeries[i].enabled) {
            return true
        }
    }
    return false
}

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


    const existingSeries = Object.keys(data[0])
        .filter(seriesName => seriesName !== 'gas' && seriesName !== 'runtime')
        .map(seriesName => ({ name: seriesName, enabled: true }))
    const [selectedSeries, setSelectedSeries] = useState(existingSeries)
    useEffect(() => {
        setSelectedSeries(existingSeries)
    }, props.diver.tanks)

    const tankLines = props.diver.tanks.map((_, i) =>
        showSeries(selectedSeries, `tank${i}`) && <Line yAxisId='right' type="monotone" dataKey={`tank${i}`} stroke="black" dot={false} isAnimationActive={false} />
    )

    return <Row>
        <Col>
            <LineChart width={1000} height={500} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="runtime" label={{ value: "Runtime (minutes)", position: "insideBottom", offset: 0 }} ticks={xTicks} />
                <YAxis yAxisId="left" reversed ticks={yTicks} label={{ value: "Depth", position: "insideLeft", angle: -90 }} interval={0} />
                <YAxis yAxisId="right" orientation="right" ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} label={{ value: "Percent", position: "insideRight", angle: 90 }} />
                <Tooltip content={CustomTooltip} />
                <Legend />
                {showSeries(selectedSeries, "depth") && <Line yAxisId='left' type="monotone" dataKey="depth" stroke="#8884d8" dot={false} isAnimationActive={false} />}
                {showSeries(selectedSeries, "ceiling") && <Line yAxisId='left' type="monotone" dataKey="ceiling" stroke="red" dot={false} isAnimationActive={false} />}
                {hasDeco && <ReferenceArea yAxisId="left" x1={decoBeginRuntime} x2={decoEndRuntime - 1} label="Deco" fill="yellow" opacity={0.2} />}
                {switches}
                {tankLines}
            </LineChart>
        </Col>
        <Col xs={3}>
            <SeriesSelector series={selectedSeries} onChange={setSelectedSeries} />
        </Col>
    </Row>
}

export default ProfileGraph