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

    function updateTanks(
        i: number,
        { percento2, percenthe2, volume, fullPressure }: { percento2?: number; percenthe2?: number; volume?: number; fullPressure?: number }) {
        const newTanks = cloneDeep(props.tanks)
        if (percento2) {
            newTanks[i].gas.percentn2 = 100 - percento2 - newTanks[i].gas.percenthe2
        }
        if (percenthe2) {
            newTanks[i].gas.percenthe2 = percenthe2
        }
        if (volume) {
            newTanks[i].volume = volume
        }
        if (fullPressure) {
            newTanks[i].fullPressure = fullPressure
        }
        props.onChange(newTanks)
    }
    return <>
        <Form >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Percent O2</th>
                        <th>Precent He2</th>
                        <th>Volume (L)</th>
                        <th>Full Pressure (Bar)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tanks.map((tank, i) => (
                        <tr>
                            <td>{`tank${i}`}</td>
                            <td>
                                <Form.Group controlId={`tank${i}n2`} onBlur={(e: any) => {
                                    updateTanks(i, { percento2: e.target.value })
                                }}>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="n2 %"
                                        defaultValue={100 - tank.gas.percentn2 - tank.gas.percenthe2}
                                    />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group controlId={`tank${i}he2`} onBlur={(e: any) => {
                                    updateTanks(i, { percenthe2: e.target.value })
                                }}>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="he %"
                                        defaultValue={tank.gas.percenthe2}
                                    />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group controlId={`tank${i}volume`} onBlur={(e: any) => {
                                    updateTanks(i, { volume: e.target.value })
                                }}>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="volume (L)"
                                        defaultValue={tank.volume}
                                    />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group controlId={`tank${i}fullPressure`} onBlur={(e: any) => {
                                    updateTanks(i, { fullPressure: e.target.value })
                                }}>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="n2 %"
                                        defaultValue={tank.fullPressure}
                                    />
                                </Form.Group>
                            </td>
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