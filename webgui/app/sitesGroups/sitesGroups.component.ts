import { Component, OnInit }                                            from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl }   from '@angular/forms';

import { PredixConfigurationDataService }                               from '../data/predixConfigurationData.service';

@Component ({
    selector:    'mt-wizard-personal',
    templateUrl: 'app/sitesGroups/sitesGroups.component.html'
})

export class SitesGroupsComponent implements OnInit {
    
    title = 'Step 5 - Tag Schema(s)';
    description = 'To setup your factory you need to create mapping between time series instance and tag of IGS instance.';
    sitesGroups: {};
    form: any;
    sitesGroupsWrapper: FormGroup;
    
    constructor(private predixConfigurationDataService: PredixConfigurationDataService, private formBuilder: FormBuilder) {
    }
    
    ngOnInit() {
        this.sitesGroups = this.predixConfigurationDataService.getTagMappingSchema();
        this.sitesGroupsWrapper = this.formBuilder.group({
            sitesGroupsForms: this.formBuilder.array([
                this.initSiteGroupsForm(),
            ])
        });
        console.log('SitesGroupsComponent feature loaded!');
    }
    
    initSiteGroupsForm() {
        return this.formBuilder.group({
            siteName: [''],
            groups: this.formBuilder.array([
                this.initGroupForm()
            ])
        });
    }
    
    addSiteGroupsForm() {
        const control = <FormArray>this.sitesGroupsWrapper.controls['sitesGroupsForms'];
        control.push(this.initSiteGroupsForm());
    }
    
    removeSiteGroupsForm(i: number) {
        const control = <FormArray>this.sitesGroupsWrapper.controls['sitesGroupsForms'];
        let siteName = (<FormArray>
            (<FormGroup>this.sitesGroupsWrapper.controls['sitesGroupsForms']).controls[i]).get('siteName').value;
        console.log(this.sitesGroups);
        control.removeAt(i);
    }
    
    initGroupForm() {
        return this.formBuilder.group({
            groupName: [''],
            globalTagMappingSchema: [''],
            globalEnableSetup: [''],
            globalPrefix: [''],
        })
    }
    
    addGroup(fi: number) {
        console.log(<FormArray>this.sitesGroupsWrapper.controls['sitesGroupsForms']);
        const control = <FormArray>(
            <FormArray>(
                <FormGroup>this.sitesGroupsWrapper.controls['sitesGroupsForms']).controls[fi]).controls['groups'];
        
        control.push(this.initGroupForm());
    }
    
    removeGroup(fi: number, ti: number) {
        console.log(<FormArray>this.sitesGroupsWrapper.controls['sitesGroupsForms']);
        const control = <FormArray>(
            <FormArray>(
                <FormGroup>this.sitesGroupsWrapper.controls['sitesGroupsForms']).controls[fi]).controls['groups'];
        control.removeAt(ti);
    }
    
    save(form: any) {
        
        // if (!form.valid)
        //     return;
        
        // const sitesGroupsForms = <FormArray>this.sitesGroupsWrapper.controls['sitesGroupsForms'];
        //
        // // for each tagMappingSchemaForm
        // for(let i = 0; i < sitesGroupsForms.length; i++) {
        //
        //     // get mappgingSchemaName
        //     let siteName =
        //         (<FormArray>
        //             (<FormGroup>this.sitesGroupsWrapper.controls['sitesGroupsForms'])
			// 			.controls[i]).get('siteName').value;
        //
        //     // if the siteName is not null in any sense
        //     if (siteName !== null && siteName.length > 0) {
        //         // handle double names to
        //         if (siteName in this.sitesGroups) {
        //             siteName = siteName + (i.toString());
        //         }
        //     }
        //     // create automatic name
        //     else {
        //         siteName = "SITE_NAME_"+(i.toString());
        //     }
        //
        //     // create MappingSchema Object
        //     this.sitesGroups[siteName] = new MappingSchema();
        //     // create Key in TAG_MAPPING_SCHEMA var
        //     this.sitesGroups[siteName].CHANNEL_PREFIX =
        //         (<FormArray>
        //             (<FormGroup>this.sitesGroupsWrapper.controls['sitesGroupsForms'])
			// 			.controls[i]).get('channelPrefix').value;
        //     // create dictionary for tag couples
        //     this.sitesGroups[siteName].MAPPING = {};
        //
        //     let sitesGroupsForms = <FormArray>this.sitesGroupsWrapper.controls['sitesGroupsForms'];
        //     let tagMappingSchemaForm = <FormGroup>sitesGroupsForms.controls[i];
        //     let mappingSchema = <FormArray>tagMappingSchemaForm.controls['groups'];
        //
        //     // for each tagCouple
        //     for (let k = 0; k < mappingSchema.length; k++) {
        //
        //         // get Head
        //         let tagFrom = (<FormGroup>(
        //             <FormArray>(
        //                 <FormArray>(
        //                     <FormGroup>
        //                         this.sitesGroupsWrapper.controls['sitesGroupsForms']
        //                 ).controls[i]
        //             ).controls['groups']
        //         ).controls[k].get('tagFrom')).value;
        //
        //         // if the tagFrom is not null in any sense
        //         if (tagFrom !== null && tagFrom.length > 0) {
        //             // handle double names to
        //             if ((<MappingSchema>this.sitesGroups[siteName]).getElementWithKey(tagFrom) != null) {
        //                 tagFrom = tagFrom + (k.toString());
        //             }
        //         }
        //         // create automatic name for the tag
        //         else {
        //             tagFrom = "TAG_FROM"+(k.toString());
        //         }
        //
        //         this.sitesGroups[siteName].MAPPING[tagFrom] = <FormGroup>(
        //             <FormArray>(
        //                 <FormArray>(
        //                     <FormGroup>
        //                         this.sitesGroupsWrapper.controls['sitesGroupsForms']
        //                 ).controls[i]
        //             ).controls['groups']
        //         ).controls[k].get('tagTo').value;
        //
        //     }
        //
        // }
        //
        // console.log(this.sitesGroups);
        
        this.predixConfigurationDataService.setTagMappingSchema(this.sitesGroups);
        
    }
    
}