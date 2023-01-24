import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'FirstWebPartWebPartStrings';
import FirstWebPart from './components/FirstWebPart';
import { IFirstWebPartProps } from './components/IFirstWebPartProps';
import { IDynamicDataPropertyDefinition, IDynamicDataCallables } from '@microsoft/sp-dynamic-data';

export interface IFirstWebPartWebPartProps {
  description: string;
}

export interface IList {
  selectedlist: string;
}

export default class FirstWebPartWebPart extends BaseClientSideWebPart<IFirstWebPartWebPartProps> implements IDynamicDataCallables {

  private _selectedlist: IList;

  public onInit(): Promise<void> {
    this.context.dynamicDataSourceManager.initializeSource(this);
    return Promise.resolve();
  }

  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: 'selectedlist',
        title: 'selectedlist'
      }
    ];
  }

  private _listelected = (list: IList): void => {
    console.log("Before to send: ", list);
    this._selectedlist = list;
    this.context.dynamicDataSourceManager.notifyPropertyChanged('selectedlist');
  }

  public getPropertyValue(propertyId: string): IList {
    if (propertyId === "selectedlist") {
      return this._selectedlist;
    }
  }

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IFirstWebPartProps> = React.createElement(
      FirstWebPart,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        _listelected: this._listelected,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
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
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
