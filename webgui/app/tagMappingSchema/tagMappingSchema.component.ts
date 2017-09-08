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
            tagMappingSchemaFormArray: this.formBuilder.array([
                this.addTagMappingSchemaForm()
            ])
        });
        console.log('TagMappingSchema feature loaded!');
    }
    
    addTagMappingSchemaForm() {
        return this.formBuilder.group({
            mappingSchemaName: [''],
            channelPrefix: [''],
            mappingSchemaDict: this.formBuilder.array([
                this.addTagMappingSchemaDict()
            ])
        });
    }
    
    addTagMappingSchemaDict() {
        return this.formBuilder.group({
            tagFrom: [''],
            tagTo: [''],
        });
    }
    
    save(form: any) {
        if (!form.valid)
            return;
        this.predixConfigurationDataService.setTagMappingSchema(this.tagMappingSchema);
    }

}