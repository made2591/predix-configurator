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
        this.tagMappingSchemaWrapper = this.formBuilder.group({
            tagMappingSchemaForms: this.formBuilder.array([
                this.initTagMappingSchemaForm(),
            ])
        });
        console.log('TagMappingSchema feature loaded!');
    }
    
    initTagMappingSchemaForm() {
        return this.formBuilder.group({
            mappingSchemaName: [''],
            channelPrefix: [''],
            mappingSchemaDict: this.formBuilder.array([
                this.initMappingSchemaForm()
            ])
        });
    }
    
    addNewTagMappingSchema() {
        const control = <FormArray>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms'];
        control.push(this.initTagMappingSchemaForm());
    }
    
    removeNewTagMappingSchema(i: number) {
        const control = <FormArray>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms'];
        control.removeAt(i);
    }
    
    initMappingSchemaForm() {
        return this.formBuilder.group({
            tagFrom: [''],
            tagTo: [''],
        })
    }
    
    addTagCouple(fi: number) {
        console.log(<FormArray>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']);
        const control = <FormArray>(<FormArray>(<FormGroup>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']).controls[fi]).controls['mappingSchemaDict'];
        control.push(this.initMappingSchemaForm());
    }
    
    removeTagCouple(fi: number, ti: number) {
        console.log(<FormArray>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']);
        const control = <FormArray>(<FormArray>(<FormGroup>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']).controls[fi]).controls['mappingSchemaDict'];
        control.removeAt(ti);
    }
    
    save(form: any) {
        if (!form.valid)
            return;
        this.predixConfigurationDataService.setTagMappingSchema(this.tagMappingSchema);
    }

}