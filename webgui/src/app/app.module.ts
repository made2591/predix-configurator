import { NgModule }                                 from '@angular/core';
import { BrowserModule }                            from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { UIRouterModule }                           from "@uirouter/angular";
import { MdSelectModule }                           from '@angular/material';
import { BrowserAnimationsModule }                  from '@angular/platform-browser/animations';
import { NoopAnimationsModule }                     from '@angular/platform-browser/animations';

/* App Root */
import { AppComponent }                             from './app.component';
import { NavbarComponent }                          from './navbar/navbar.component';

/* Feature Components */
import { HomePageComponent }                        from './homePage/homePage.component';
import { IgsConfigComponent }                       from './igsConfig/igsConfig.component';
import { PredixGlobalConfigComponent }              from './predixGlobalConfig/predixGlobalConfig.component';
import { PredixCloudConfigComponent }               from "./predixCloudConfig/predixCloudConfig.component";
import { TagMappingSchemaComponent }                from "./tagMappingSchema/tagMappingSchema.component";
import { SitesGroupsComponent }                     from "./sitesGroups/sitesGroups.component";
import { GroupsMachinesComponent }                  from "./groupsMachines/groupsMachines.component";
import { ResultComponent }                          from './result/result.component';

/* App Router */
import { UIRouterConfigFn }                         from "./app.router";
import { appStates }                                from "./app.states";

/* Shared Service */
import { PredixConfigurationDataService }           from './data/predixConfigurationData.service';
import { WorkflowService }                          from './workflow/workflow.service';

@NgModule({
    
    imports:      [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MdSelectModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        UIRouterModule.forRoot({
          states: appStates,
          useHash: true,
          config: UIRouterConfigFn
        })
    ],
    
    providers:    [
        { provide: PredixConfigurationDataService, useClass: PredixConfigurationDataService },
        { provide: WorkflowService, useClass: WorkflowService }
    ],

    declarations: [
                    AppComponent,
                    NavbarComponent,
                    HomePageComponent,
                    IgsConfigComponent,
                    PredixGlobalConfigComponent,
                    PredixCloudConfigComponent,
                    TagMappingSchemaComponent,
                    SitesGroupsComponent,
                    GroupsMachinesComponent,
                    ResultComponent,
                  ],
    
//    exports: [ MdSelectModule ],
    
    bootstrap:    [ AppComponent ]

})

export class AppModule {}
