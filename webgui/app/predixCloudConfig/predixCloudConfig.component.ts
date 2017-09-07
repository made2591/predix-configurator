import { Component, OnInit }                                from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators, FormControl}    from '@angular/forms';

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
            exceptionName: [''],
            exceptionList: this.formBuilder.array([])
        });
        console.log('PredixCloudConfig feature loaded!');
    }
    
    submit(value) {
        console.log(value);
    }
    
    addException() {
        const control = <FormArray>this.exceptionsForm.controls['exceptionList'];
        let newException = this.exceptionsForm.get('exceptionName').value;
        if(newException !== null && newException.length > 0 && this.predixCloudConfig.PROXY_EXCEPTIONS.indexOf(newException) == -1) {
            control.push(new FormControl(newException));
            this.predixCloudConfig.PROXY_EXCEPTIONS = control.getRawValue();
        } else {
            console.log("Already added");
        }
        this.exceptionsForm.get('exceptionName').reset()
        console.log(this.predixCloudConfig.PROXY_EXCEPTIONS);
    }
    
    removeException(i: number) {
        const control = <FormArray>this.exceptionsForm.controls['exceptionList'];
        control.removeAt(i);
        this.predixCloudConfig.PROXY_EXCEPTIONS = control.getRawValue();
        console.log(this.predixCloudConfig.PROXY_EXCEPTIONS);
    }
    
    save(form: any) {
        if (!form.valid)
            return;
        this.predixConfigurationDataService.setPredixCloudConfig(this.predixCloudConfig);
    }

}