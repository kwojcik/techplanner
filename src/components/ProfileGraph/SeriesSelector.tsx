import React from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import cloneDeep from 'lodash/cloneDeep'

interface Props {
    series: { name: string, enabled: boolean }[]
    onChange: (stuff: { name: string, enabled: boolean }[]) => void
}

const SeriesSelector = (props: Props) => {
    return <>
        <Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Series</th>
                        <th>Show?</th>
                    </tr>
                </thead>
                <tbody>
                    {props.series.map(series => (
                        <tr>
                            <td>{series.name}</td>
                            <td>
                                <Form.Check type="switch" id={`series-${series.name}`} label="" checked={series.enabled}
                                    onChange={() => {
                                        const newSeries = cloneDeep(props.series)
                                        newSeries.forEach(s => {
                                            if (s.name === series.name) {
                                                s.enabled = !s.enabled
                                            }

                                        });
                                        props.onChange(newSeries)
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Form>
    </>
}

export default SeriesSelector