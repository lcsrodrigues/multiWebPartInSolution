/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { ISecondWebPartProps } from './ISecondWebPartProps';
import SecondWebPartWP from './secondWebpart/SecondWebPartWP';

export default function SecondWebPart(props: ISecondWebPartProps) {
  return (
    <SecondWebPartWP props={props} />
  );
}