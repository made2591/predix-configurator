import { Component, OnInit }                                            from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl }   from '@angular/forms';

import { MappingSchema }                                                from '../data/predixConfigurationData.model';
import { PredixConfigurationDataService }                               from '../data/predixConfigurationData.service';

@Component ({
    selector:    'mt-wizard-personal',
    templateUrl: 'app/tagMappingSchema/tagMappingSchema.component.html'
})

export class TagMappingSchemaComponent implements OnInit {
    
    title = 'Step 4 - Tag Schema(s)';
    description = 'To setup your factory you need to create mapping between time series instance and tag of IGS instance.';
    tagMappingSchema: {};
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
        let mappingSchemaName = (<FormArray>
            (<FormGroup>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']).controls[i]).get('mappingSchemaName').value;
        console.log(this.tagMappingSchema);
        control.removeAt(i);
    }
    
    initMappingSchemaForm() {
        return this.formBuilder.group({
            tagFrom: [''],
            tagTo: [''],
        })
    }
    
    addNewTagCouple(fi: number) {
        console.log(<FormArray>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']);
        const control = <FormArray>(
            <FormArray>(
                <FormGroup>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']).controls[fi]).controls['mappingSchemaDict'];
        
        control.push(this.initMappingSchemaForm());
    }
    
    removeNewTagCouple(fi: number, ti: number) {
        console.log(<FormArray>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']);
        const control = <FormArray>(
            <FormArray>(
                <FormGroup>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']).controls[fi]).controls['mappingSchemaDict'];
        control.removeAt(ti);
    }
    
    save(form: any) {
        
        if (!form.valid)
            return;
    
        const tagMappingSchemaForms = <FormArray>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms'];
    
        // for each tagMappingSchemaForm
        for(let i = 0; i < tagMappingSchemaForms.length; i++) {

            // get mappgingSchemaName
            let mappingSchemaName =
                (<FormArray>
                    (<FormGroup>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms'])
                        .controls[i]).get('mappingSchemaName').value;

            // if the mappingSchemaName is not null in any sense
            if (mappingSchemaName !== null && mappingSchemaName.length > 0) {
                // handle double names to
                if (mappingSchemaName in this.tagMappingSchema) {
                    mappingSchemaName = mappingSchemaName + (i.toString());
                }
            }
            // create automatic name
            else {
                mappingSchemaName = "TAG_MACHINE_SCHEMA_"+(i.toString());
            }
    
            // create MappingSchema Object
            this.tagMappingSchema[mappingSchemaName] = new MappingSchema();
            // create Key in TAG_MAPPING_SCHEMA var
            this.tagMappingSchema[mappingSchemaName].CHANNEL_PREFIX =
                (<FormArray>
                    (<FormGroup>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms'])
                        .controls[i]).get('channelPrefix').value;
            // create dictionary for tag couples
            this.tagMappingSchema[mappingSchemaName].MAPPING = {};

            let mappingSchema = <FormArray>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms'];
            mappingSchema = mappingSchema[i];
            mappingSchema = <FormArray>mappingSchema.controls['mappingSchemaDict'];
            
            // for each tagCouple
            for (let k = 0; k < mappingSchema.length; k++) {

                // get Head
                let tagFrom = (<FormGroup>(
                    <FormArray>(
                        <FormArray>(
                            <FormGroup>
                                this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']
                        ).controls[i]
                    ).controls['mappingSchemaDict']
                ).controls[k].get('tagFrom')).value;
    
                // if the tagFrom is not null in any sense
                if (tagFrom !== null && tagFrom.length > 0) {
                    // handle double names to
                    if ((<MappingSchema>this.tagMappingSchema[mappingSchemaName]).getElementWithKey(tagFrom) != null) {
                        tagFrom = tagFrom + (k.toString());
                    }
                }
                // create automatic name for the tag
                else {
                    tagFrom = "TAG_FROM"+(k.toString());
                }
                
                this.tagMappingSchema[mappingSchemaName].MAPPING[tagFrom] = <FormGroup>(
                    <FormArray>(
                        <FormArray>(
                            <FormGroup>
                                this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms']
                        ).controls[i]
                    ).controls['mappingSchemaDict']
                ).controls[k].get('tagTo').value;
                
            }
            
        }
    
        console.log(this.tagMappingSchema);
    
        this.predixConfigurationDataService.setTagMappingSchema(this.tagMappingSchema);

    }

}