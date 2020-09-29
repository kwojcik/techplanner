import React from 'react'
import { DataPoint } from './index'

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
            <p className="recharts-tooltip-label">{`Gas: o2: ${100 - payload[0].payload.gas.percentn2 - payload[0].payload.gas.percenthe2}% he2: ${payload[0].payload.gas.percenthe2}%`}</p>
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

export default CustomTooltip