import React, { useState } from 'react'
import { Tank } from '../profile/types'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import cloneDeep from 'lodash/cloneDeep'

interface Props {
    tanks: Tank[]
    onChange: (tanks: Tank[]) => void
}

const TankList = (props: Props) => {
    if (!props.tanks) {
        return null
    }
    return <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Percent O2</th>
                    <th>Precent He2</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.tanks.map((tank, i) => (
                    <tr>
                        <td>{`tank${i}`}</td>
                        <td>{100 - tank.gas.percentn2 - tank.gas.percenthe2}</td>
                        <td>{tank.gas.percenthe2}</td>
                        <td><Button onClick={() => {
                            const newTanks = cloneDeep(props.tanks)
                            newTanks.splice(i, 1)
                            props.onChange(newTanks)
                        }}>Remove</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <Button onClick={() => {
            const newTanks = cloneDeep(props.tanks)
            newTanks.push({
                currentPressure: 300,
                fullPressure: 300,
                volume: 12,
                gas: {
                    percenthe2: 0,
                    percentn2: 79
                }
            })
            props.onChange(newTanks)
        }}>Add Gas</Button>
    </>
}
export default TankList