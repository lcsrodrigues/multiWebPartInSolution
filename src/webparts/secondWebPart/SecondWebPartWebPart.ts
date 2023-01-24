import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDynamicField,
  PropertyPaneDynamicFieldSet,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SecondWebPartWebPartStrings';
import SecondWebPart from './components/SecondWebPart';
import { ISecondWebPartProps } from './components/ISecondWebPartProps';

import { DynamicProperty } from '@microsoft/sp-component-base';
import { IWebPartPropertiesMetadata } from '@microsoft/sp-webpart-base';
import { IList } from '../firstWebPart/FirstWebPartWebPart';

export interface ISecondWebPartWebPartProps {
  description: string;
  selectedlist: DynamicProperty<IList>;
}

export default class SecondWebPartWebPart extends BaseClientSideWebPart<ISecondWebPartWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<ISecondWebPartProps> = React.createElement(
      SecondWebPart,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        selectedlist: this.properties.selectedlist
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'selectedlist': {
        dynamicPropertyType: 'string'
      }
    };
  }

  protected onInit(): Promise<void> {
    const aux = this.properties.selectedlist.tryGetValue();
    console.log("this.properties.selectedlist: ", aux);
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              throw new Error('Unknown host');
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: "PrimaryGroup",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDynamicFieldSet({
                  label: "Select source webpart",
                  fields: [
                    PropertyPaneDynamicField("selectedlist", {
                      label: "Event source"
                    })
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
