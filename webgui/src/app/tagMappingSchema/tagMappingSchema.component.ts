import { Component, OnInit }                                            from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl }   from '@angular/forms';

import { MappingSchema }                                                from '../data/predixConfigurationData.model';
import { PredixConfigurationDataService }                               from '../data/predixConfigurationData.service';

@Component ({
    selector:    'mt-wizard-personal',
    templateUrl: 'tagMappingSchema.component.html'
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
        if(Object.keys(this.tagMappingSchema).length > 0) {
            this.load();
        }
        console.log('TagMappingSchema feature loaded!');
    }
    
    initTagMappingSchemaForm(msn?: string, cp?: string) {
        
        let msnr = [''];
        let cpr  = [''];
        if(msn) { msnr = [msn]; }
        if(cp)  { cpr  = [cp];  }
        
        return this.formBuilder.group({
            mappingSchemaName: msnr,
            channelPrefix: cpr,
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
    
    initMappingSchemaForm(tf?: string, tt?: string) : FormGroup {
    
        let tfr = [''];
        let ttr  = [''];
        if(tf) { tfr = [tf]; }
        if(tt) { ttr = [tt]; }
        
        return this.formBuilder.group({
            tagFrom: tfr,
            tagTo: ttr,
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
    
    load() {
        
        // create new forms array
        let tagMappingSchemaForms = this.formBuilder.array([]);
    
        // for each schema in tagMappingSchema
        for(let nameTagMappingSchema in this.tagMappingSchema) {
            
            // create a new schema form
            let tagMappingSchemaFrom = this.initTagMappingSchemaForm(
                nameTagMappingSchema,
                this.tagMappingSchema[nameTagMappingSchema]['CHANNEL_PREFIX']);
    
            // create a new tag mapping dict
            let mappingSchemaDict = this.formBuilder.array([]);

            // for each tag couple in tag mapping dict
            for(let tagFrom in this.tagMappingSchema[nameTagMappingSchema]['MAPPING']) {
                
                // create a couple
                let tagCouple = this.initMappingSchemaForm(
                    tagFrom,
                    this.tagMappingSchema[nameTagMappingSchema]['MAPPING'][tagFrom]);
                
                // add couple to dict
                mappingSchemaDict.push(tagCouple);
                
            }

            // add dict to specific tag mapping schema form
            tagMappingSchemaFrom.controls['mappingSchemaDict'] = mappingSchemaDict;

            // add entire wrapper to forms
            tagMappingSchemaForms.push(tagMappingSchemaFrom);

        }

        // setup up external wrapper
        this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms'] = tagMappingSchemaForms;
        
    }
    
    save(form: any) {
        
        // if (!form.valid)
        //     return;
    
        this.tagMappingSchema = {};
        
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
                    mappingSchemaName = mappingSchemaName+"_"+(i.toString());
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

            let tagMappingSchemaForms = <FormArray>this.tagMappingSchemaWrapper.controls['tagMappingSchemaForms'];
            let tagMappingSchemaForm = <FormGroup>tagMappingSchemaForms.controls[i];
            let mappingSchema = <FormArray>tagMappingSchemaForm.controls['mappingSchemaDict'];
            
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
                        tagFrom = tagFrom+"_"+(k.toString());
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
