/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { IFirstWebPartProps } from './IFirstWebPartProps';
import FirstWebPartWP from './firstWebpart/FirstWebPartWP';

export default function FirstWebPart(props: IFirstWebPartProps) {
  return (
    <FirstWebPartWP props={props} />
  );
}
