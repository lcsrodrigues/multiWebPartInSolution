/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ListPicker } from '@pnp/spfx-controls-react';
import * as React from 'react';
// import { IList } from '../../FirstWebPartWebPart';

export default function FirstWebPartWP(props: any) {
    console.log(props);

    function onListPickerChange(selected: string) {
        console.log(selected);
        props.props._listelected({ selectedlist: selected });
    }

    return (
        <>
            <h1>First WebPart</h1>
            <div>
                <h1>{props.props.description}</h1>
                <ListPicker context={props.props.context}
                    label="Select your list"
                    placeHolder="Select your list"
                    baseTemplate={100}
                    includeHidden={false}
                    multiSelect={false}
                    onSelectionChanged={(e: string) => {
                        onListPickerChange(e)
                    }} />
            </div>
        </>
    )
}