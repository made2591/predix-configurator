import { Injectable }         from '@angular/core';

import { STEPS }              from './workflow.model';

@Injectable()
export class WorkflowService {
    private workflow = [
        { step: STEPS.igsConfig, valid: false },
        { step: STEPS.predixGlobalConfig, valid: false },
        { step: STEPS.predixCloudConfig, valid: false },
        { step: STEPS.tagMappingSchema, valid: false },
        { step: STEPS.sitesMachines, valid: false },
        { step: STEPS.result, valid: false }
    ];
    
    validateStep(step: string) {
        // If the state is found, set the valid field to true 
        var found = false;
        for (var i = 0; i < this.workflow.length && !found; i++) {
            if (this.workflow[i].step === step) {
                found = this.workflow[i].valid = true;
            }
        }
    }

    resetSteps() {
        // Reset all the steps in the Workflow to be invalid
        this.workflow.forEach(element => {
            element.valid = false;
        });
    }

    getFirstInvalidStep(step: string) : string {
        // If all the previous steps are validated, return blank
        // Otherwise, return the first invalid step
        var found = false;
        var valid = true;
        var redirectToStep = '';
        for (var i = 0; i < this.workflow.length && !found && valid; i++) {
            let item = this.workflow[i];
            if (item.step === step) {
                found = true;
                redirectToStep = '';
            }
            else {
                valid = item.valid;
                redirectToStep = item.step
            }
        }
        return redirectToStep;
    }
}