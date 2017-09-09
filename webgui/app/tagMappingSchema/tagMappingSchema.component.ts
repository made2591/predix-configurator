import { Component, OnInit }                                            from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl }   from '@angular/forms';

import { TagMappingSchema }                                             from '../data/predixConfigurationData.model';
import { PredixConfigurationDataService }                               from '../data/predixConfigurationData.service';

@Component ({
    selector:    'mt-wizard-personal',
    templateUrl: 'app/tagMappingSchema/tagMappingSchema.component.html'
})

export class TagMappingSchemaComponent implements OnInit {
    title = 'Step 4 - Tag Schema(s)';
    description = 'To setup your factory you need to create mapping between time series instance and tag of IGS instance.';
    tagMappingSchema: TagMappingSchema;
    form: any;
    tagMappingSchemaWrapper: FormGroup;
    
    constructor(private predixConfigurationDataService: PredixConfigurationDataService, private formBuilder: FormBuilder) {
    }
    
    ngOnInit() {
        this.tagMappingSchema = this.predixConfigurationDataService.getTagMappingSchema();
        // we will initialize our form here
        this.tagMappingSchemaWrapper = this.formBuilder.group({
            tagMappingSchemaForms: this.formBuilder.array([
                this.initTagMappingSchemaForm(),
            ])
        });
        console.log('TagMappingSchema feature loaded!');
    }
    
    initTagMappingSchemaForm() {
        // initialize our address
        return this.formBuilder.group({
            mappingSchemaName: [''],
            channelPrefix: [''],
            mappingSchemaDict: this.formBuilder.array([
                this.initMappingSchemaForm()
            ])
        });
    }
    
    initMappingSchemaForm() {
        return this.formBuilder.group({
            tagFrom: [''],
            tagTo: [''],
        })
    }
    
    addNewTagMappingSchema() {
        // add address to the list
        const control = <FormArray>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms'];
        control.push(this.initTagMappingSchemaForm());
    }
    
    removeNewTagMappingSchema(i: number) {
        // remove address from the list
        const control = <FormArray>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms'];
        control.removeAt(i);
    }
    
    save(form: any) {
        if (!form.valid)
            return;
        this.predixConfigurationDataService.setTagMappingSchema(this.tagMappingSchema);
    }

}