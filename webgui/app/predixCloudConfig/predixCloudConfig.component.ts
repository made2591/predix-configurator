import { Component, OnInit }                                from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators }    from '@angular/forms';

import { PredixCloudConfig }                                from '../data/predixConfigurationData.model';
import { PredixConfigurationDataService }                   from '../data/predixConfigurationData.service';

@Component ({
    selector:    'mt-wizard-personal',
    templateUrl: 'app/predixCloudConfig/predixCloudConfig.component.html'
})

export class PredixCloudConfigComponent implements OnInit {
    title = 'Step 3 - Predix Cloud Configuration';
    description = 'Predix is under deployment so we create our configuration tool to provide flexible support for futures version of configuration files: here you can setup configuration file name, or go on with default values. Note: you can modify any of the information provided by this tools laters.';
    predixCloudConfig: PredixCloudConfig;
    form: any;
    exceptionsForm: FormGroup; // form group instance
    
    constructor(private predixConfigurationDataService: PredixConfigurationDataService, private formBuilder: FormBuilder) {
        
    }
    
    ngOnInit() {
        this.predixCloudConfig = this.predixConfigurationDataService.getPredixCloudConfig();
        this.exceptionsForm = this.formBuilder.group({
        });
        console.log('PredixCloudConfig feature loaded!');
    }
    
    addGroup(newException: string) {
    
        let data = this.formBuilder.group([]);
        this.exceptionsForm.addControl(newException, data);
        document.getElementById('PROXY_EXCEPTION').value = '';
        
    }
    
    save(form: any) {
        if (!form.valid)
            return;
        this.predixConfigurationDataService.setPredixCloudConfig(this.predixCloudConfig);
    }

}