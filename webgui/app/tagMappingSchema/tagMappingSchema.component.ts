import { Component, OnInit }                                            from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl }   from '@angular/forms';

import { TagMappingSchema, MappingSchema }                              from '../data/predixConfigurationData.model';
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
        //this.tagMappingSchema.TAG_MAPPING_SCHEMA[]
        
        const numberOfMappingSchema = (<FormArray>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']).length-1;
        const mappingSchemaName = (<FormArray>
            (<FormGroup>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']).controls[numberOfMappingSchema]).get('mappingSchemaName').value;
        this.tagMappingSchema.TAG_MAPPING_SCHEMA[mappingSchemaName] = new MappingSchema();
        this.tagMappingSchema.TAG_MAPPING_SCHEMA[mappingSchemaName].CHANNEL_PREFIX = (<FormArray>
            (<FormGroup>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']).controls[numberOfMappingSchema]).get('channelPrefix').value;
        
        console.log(this.tagMappingSchema.TAG_MAPPING_SCHEMA);
        
        control.push(this.initTagMappingSchemaForm());
    }
    
    removeNewTagMappingSchema(i: number) {
        const control = <FormArray>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms'];
    
        const mappingSchemaName = (<FormArray>
            (<FormGroup>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']).controls[i]).get('mappingSchemaName').value;
    
        delete this.tagMappingSchema.TAG_MAPPING_SCHEMA[mappingSchemaName];
    
        console.log(this.tagMappingSchema.TAG_MAPPING_SCHEMA);
        
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
        const control = <FormArray>(
            <FormArray>(
                <FormGroup>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']).controls[fi]).controls['mappingSchemaDict'];
    
        const mappingSchemaName = (<FormArray>
            (<FormGroup>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']).controls[fi]).get('mappingSchemaName').value;
        const numberOfMappingSchema = control.length-1;
        const tagFrom = <FormGroup>(
                                    <FormArray>(
                                        <FormArray>(
                                            <FormGroup>
                                                this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']
                                        ).controls[fi]
                                    ).controls['mappingSchemaDict']
                                ).controls[numberOfMappingSchema].get('tagFrom').value;
        
        this.tagMappingSchema.TAG_MAPPING_SCHEMA[mappingSchemaName].TAGS_MAPPING['tagFrom'] = <FormGroup>(
            <FormArray>(
                <FormArray>(
                    <FormGroup>
                        this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']
                ).controls[fi]
            ).controls['mappingSchemaDict']
        ).controls[numberOfMappingSchema].get('tagTo').value;

        console.log(this.tagMappingSchema.TAG_MAPPING_SCHEMA);
    
        control.push(this.initMappingSchemaForm());
    }
    
    removeTagCouple(fi: number, ti: number) {
        console.log(<FormArray>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']);
        const control = <FormArray>(
            <FormArray>(
                <FormGroup>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']).controls[fi]).controls['mappingSchemaDict'];

        const mappingSchemaName = (<FormArray>
            (<FormGroup>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']).controls[fi]).get('mappingSchemaName').value;
        const tagFrom = <FormGroup>(
            <FormArray>(
                <FormArray>(
                    <FormGroup>
                        this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']
                ).controls[fi]
            ).controls['mappingSchemaDict']
        ).controls[ti].get('tagFrom').value;
        
        delete this.tagMappingSchema.TAG_MAPPING_SCHEMA[mappingSchemaName].TAGS_MAPPING[tagFrom];
    
        console.log(this.tagMappingSchema.TAG_MAPPING_SCHEMA);

        control.removeAt(ti);
    }
    
    save(form: any) {
        if (!form.valid)
            return;
        this.predixConfigurationDataService.setTagMappingSchema(this.tagMappingSchema);
    }

}