import React, { useState } from 'react'
import { Tank } from '../profile/types'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
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
        <Form >
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
                            <td>
                                <Form.Group controlId={`tank${i}n2`} onBlur={(e: any) => {
                                    const newTanks = cloneDeep(props.tanks)
                                    newTanks[i].gas.percentn2 = 100 - e.target.value - newTanks[i].gas.percenthe2
                                    props.onChange(newTanks)
                                }}>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="n2 %"
                                        defaultValue={100 - tank.gas.percentn2 - tank.gas.percenthe2}
                                    />
                                </Form.Group>
                            </td>
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
        </Form>
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