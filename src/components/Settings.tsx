import React, { useState } from 'react'
import { Tank } from '../profile/types'
import Profile from '../profile/profile'
import Diver from '../profile/diver'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import cloneDeep from 'lodash/cloneDeep'

interface Props {
    diver: Diver
    setSac: (n: number) => void
}

const Settings = (props: Props) => {
    if (!props.diver) {
        return null
    }

    return <>
        <Form >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Setting</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>SAC</td>
                        <td>
                            <Form.Group controlId={`sac`} onBlur={(e: any) => {
                                props.setSac(e.target.value)
                            }}>
                                <Form.Control required type="text" placeholder="sac" defaultValue={props.diver.sac} />
                            </Form.Group>

                        </td>
                    </tr>
                </tbody>
            </Table>
        </Form>
    </>
}
export default Settings