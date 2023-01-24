/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { IList } from '../../../firstWebPart/FirstWebPartWebPart';

export default function SecondWebPartWP(props: any) {
    const [selectedlist, setSelectedlist] = useState<IList>();

    useEffect(() => {
        console.log("useEffect selectedlist: ", props);
    }, [props.props.selectedlist])

    useEffect(() => {
        const aux = props.props.selectedlist.tryGetValue();
        setSelectedlist(aux);
    }, [])

    return (
        <>
            <h1>Second WebPart</h1>
            <span><strong>Enviado do firstWebpart: </strong>{selectedlist}</span>
        </>
    )
}