import { DynamicProperty } from "@microsoft/sp-component-base";
import { IList } from "../../firstWebPart/FirstWebPartWebPart";

export interface ISecondWebPartProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  selectedlist: DynamicProperty<IList>;
}
