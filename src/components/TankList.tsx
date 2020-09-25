import React, { useState } from 'react'
import { Tank } from '../profile/types'
import Table from 'react-bootstrap/Table'

interface Props {
    initialTanks: Tank[]
}

const TankList = (props: Props) => {
    const [tanks, setTanks] = useState(props.initialTanks)
    if (!tanks) {
        return null
    }
    return <Table striped bordered hover>
        <thead>
            <tr>
                <th>Percent O2</th>
                <th>Precent He2</th>
            </tr>
            <tbody>
                {tanks.map((tank) => (
                    <tr>
                        <td>{100 - tank.gas.percentn2 - tank.gas.percenthe2}</td>
                        <td>{tank.gas.percenthe2}</td>
                    </tr>
                ))}
            </tbody>
        </thead>
    </Table>
}
export default TankList