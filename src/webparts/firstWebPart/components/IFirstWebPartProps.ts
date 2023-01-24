import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IList } from "../FirstWebPartWebPart";

export interface IFirstWebPartProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  _listelected: (title: IList) => void;
  context: WebPartContext;
}
