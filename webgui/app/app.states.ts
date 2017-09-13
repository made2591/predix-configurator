import { HomePageComponent }            from './homePage/homePage.component';
import { IgsConfigComponent }           from './igsConfig/igsConfig.component';
import { PredixGlobalConfigComponent }  from "./predixGlobalConfig/predixGlobalConfig.component";
import { PredixCloudConfigComponent }   from "./predixCloudConfig/predixCloudConfig.component";
import { TagMappingSchemaComponent }    from "./tagMappingSchema/tagMappingSchema.component";
import { ResultComponent }              from './result/result.component';

import { WorkflowService }              from "./workflow/workflow.service";

export const appStates = [
    // Welcome State
    { name: 'homePage', url: '/homePage',  component: HomePageComponent },
    // 1st State
    { name: 'igsConfig', url: '/igsConfig',  component: IgsConfigComponent },
    // 2nd State:
    { name: 'predixGlobalConfig', url: '/predixGlobalConfig',  component: PredixGlobalConfigComponent, onEnter: verifyWorkFlow },
    // 3nd State:
    { name: 'predixCloudConfig', url: '/predixCloudConfig',  component: PredixCloudConfigComponent, onEnter: verifyWorkFlow },
    // 4th State
    { name: 'tagMappingSchema', url: '/tagMappingSchema',  component: TagMappingSchemaComponent, onEnter: verifyWorkFlow },
    // 5th State
    { name: 'result', url: '/result',  component: ResultComponent, onEnter: verifyWorkFlow }
];

function verifyWorkFlow(transition, state) {
    console.log("Entered '" + state.name + "' state.");

    var $stateService = transition.router.stateService;
    var workflowService = transition.injector().get(WorkflowService);
    // If any of the previous steps is invalid, go back to the first invalid step
    let firstState = workflowService.getFirstInvalidStep(state.name);
    if (firstState.length > 0) {
        console.log("Redirected to '" + firstState + "' state which it is the first invalid step.");
        return $stateService.target(firstState);
    };
}