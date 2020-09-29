import React, { useState } from 'react'
import { Tank } from '../profile/types'
import Profile from '../profile/profile'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import cloneDeep from 'lodash/cloneDeep'

interface Props {
    profile: Profile
    onChange: (profile: Profile) => void
}

const ProfileCreator = (props: Props) => {
    if (!props.profile) {
        return null
    }

    function updateStops(i: number, { depth, time }: { depth?: string, time?: string }) {
        const newStops = cloneDeep(props.profile.stops)
        if (depth) {
            newStops[i].d = parseInt(depth)
        }
        if (time) {
            newStops[i].t = parseInt(time)
        }
        props.onChange(new Profile(newStops))
    }
    return <>
        <Form >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Depth (m)</th>
                        <th>Time (min)</th>
                        <th>Force Gas?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.profile.stops.map((stop, i) => (
                        <tr>
                            <td>
                                <Form.Group controlId={`stop${i}depth`} onBlur={(e: any) => {
                                    updateStops(i, { depth: e.target.value })
                                }}>
                                    <Form.Control required type="text" placeholder="depth (m)" defaultValue={stop.d} />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group controlId={`stop${i}time`} onBlur={(e: any) => {
                                    updateStops(i, { time: e.target.value })
                                }}>
                                    <Form.Control required type="text" placeholder="time (min)" defaultValue={stop.t} />
                                </Form.Group>
                            </td>
                            <td>
                            </td>
                            <td>
                                <Button onClick={() => {
                                    const newStops = cloneDeep(props.profile.stops)
                                    newStops.splice(i, 1)
                                    props.onChange(new Profile(newStops))
                                }}>
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Form>
        <Button onClick={() => {
            // add on the last one as a place holder
            const newStops = cloneDeep(props.profile.stops)
            newStops.push({
                d: props.profile.stops[props.profile.stops.length - 1].d,
                t: 1,
            })
            props.onChange(new Profile(newStops))
        }}>Add Stop</Button>
    </>
}
export default ProfileCreator