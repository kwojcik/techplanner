import React, { useState } from 'react'
import { BreathingGas } from '../profile/types'
import Table from 'react-bootstrap/Table'

interface Props {
    initialGases: BreathingGas[]
}

const GasList = (props: Props) => {
    const [gases, setGases] = useState(props.initialGases)
    if (!gases) {
        return null
    }
    return <Table striped bordered hover>
        <thead>
            <tr>
                <th>Percent O2</th>
                <th>Precent He2</th>
            </tr>
            <tbody>
                {gases.map((gas) => (
                    <tr>
                        <td>{100 - gas.percentn2 - gas.percenthe2}</td>
                        <td>{gas.percenthe2}</td>
                    </tr>
                ))}
            </tbody>
        </thead>
    </Table>
}
export default GasList