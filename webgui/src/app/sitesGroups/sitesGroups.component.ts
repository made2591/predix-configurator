import {
    Component, OnInit, ElementRef, ViewChild,
    AfterViewInit, AfterViewChecked
}                                            from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl }   from '@angular/forms';
import { MachineGroup }                                                 from "../data/predixConfigurationData.model";
import { PredixConfigurationDataService }                               from '../data/predixConfigurationData.service';

@Component ({
    selector:    'mt-wizard-personal',
    templateUrl: 'sitesGroups.component.html',
})

export class SitesGroupsComponent implements OnInit { //AfterViewInit, AfterViewChecked {
    
    title = 'Step 6 - Sites & Groups';
    description = 'To setup your factory you need to define your Sites and Group of machines inside.';
    sitesGroups: {};
    tagMappingSchemas: Array<String>;
    form: any;
    sitesGroupsWrapper: FormGroup;
    
    constructor(private predixConfigurationDataService: PredixConfigurationDataService, private formBuilder: FormBuilder) {
    }
    
    ngOnInit() {
        this.sitesGroups = this.predixConfigurationDataService.getSitesGroups();
        console.log(this.predixConfigurationDataService.getTagMappingSchema());
        this.tagMappingSchemas = [];
        for (let key in this.predixConfigurationDataService.getTagMappingSchema()) {
            // let key = entry[0];
            // let value = myDictionary[key];
            // Use `key` and `value`
            this.tagMappingSchemas.push(key);
        }
        this.sitesGroupsWrapper = this.formBuilder.group({
            sitesGroupsForms: this.formBuilder.array([
                this.initSiteGroupsForm(),
            ])
        });
        if(Object.keys(this.sitesGroups).length > 0) {
            this.load();
        }
        console.log('SitesGroupsComponent feature loaded!');
    }
    
    // ngAfterViewInit() {
    // }
    //
    // ngAfterViewChecked() {
    //     console.log("ora");
    // }
    
    initSiteGroupsForm(sn? : string) {
        
        let snr = [''];
        if(sn) { snr = [sn]; }

        return this.formBuilder.group({
            siteName: snr,
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
    
    initGroupForm(gn? : string, gtms?: string, gp?: string, ges?: boolean) {
    
        let gnr   = [''];
        let gtmsr = [''];
        let gpr   = [''];
        let gesr  = new FormControl(true);
        if(gn)   { gnr = [gn]; }
        if(gtms) { gtmsr = [gtms]; }
        if(gp)   { gpr = [gp]; }
        if(ges)  { gesr = new FormControl(ges); }

        return this.formBuilder.group({
            groupName: gnr,
            globalTagMappingSchema: gtmsr,
            globalPrefix: gpr,
            globalEnableSetup: gesr
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
    
    load() {
        
        // create new forms array
        let sitesGroupsForms = this.formBuilder.array([]);
        
        // for each schema in tagMappingSchema
        for(let nameSitesGroups in this.sitesGroups) {
            
            // create a new site group form
            let siteGroupsForm = this.initSiteGroupsForm(
                nameSitesGroups);
            
            // create a new groups dict
            let groups = this.formBuilder.array([]);
            
            // for each group in groups dict
            for(let groupName in this.sitesGroups[nameSitesGroups]) {
                
                // create a group
                let group = this.initGroupForm(
                    groupName,
                    this.sitesGroups[nameSitesGroups][groupName]['GLOBAL_TAG_MAPPING_SCHEMA'],
                    this.sitesGroups[nameSitesGroups][groupName]['GLOBAL_PREFIX'],
                    this.sitesGroups[nameSitesGroups][groupName]['GLOBAL_ENABLE_SETUP']
                );
                
                // add group to dict
                groups.push(group);
                
            }
            
            // add dict to specific tag mapping schema form
            siteGroupsForm.controls['groups'] = groups;
            
            // add entire wrapper to forms
            sitesGroupsForms.push(siteGroupsForm);
            
        }
        
        // setup up external wrapper
        this.sitesGroupsWrapper.controls['sitesGroupsForms'] = sitesGroupsForms;
        
    }
    
    save(form: any) {
        
        // if (!form.valid)
        //     return;
        
        this.sitesGroups = {};
        
        const sitesGroupsForms = <FormArray>this.sitesGroupsWrapper.controls['sitesGroupsForms'];

        // for each sitesGroupsForms
        for(let i = 0; i < sitesGroupsForms.length; i++) {

            // get siteName
            let siteName =
                (<FormArray>
                    (<FormGroup>this.sitesGroupsWrapper.controls['sitesGroupsForms'])
						.controls[i]).get('siteName').value;

            // if the siteName is not null in any sense
            if (siteName !== null && siteName.length > 0) {
                // handle double names to
                if (siteName in this.sitesGroups) {
                    siteName = siteName + (i.toString());
                }
            }
            // create automatic name
            else {
                siteName = "SITE_NAME_"+(i.toString());
            }

            // create Site Object
            this.sitesGroups[siteName] = {};

            let sitesGroupsForms = <FormArray>this.sitesGroupsWrapper.controls['sitesGroupsForms'];
            let machineGroupForm = <FormGroup>sitesGroupsForms.controls[i];
            let machineGroups = <FormArray>machineGroupForm.controls['groups'];

            // for each machineGroup
            for (let k = 0; k < machineGroups.length; k++) {

                // get groupName
                let groupName = (<FormGroup>(
                    <FormArray>(
                        <FormArray>(
                            <FormGroup>
                                this.sitesGroupsWrapper.controls['sitesGroupsForms']
                        ).controls[i]
                    ).controls['groups']
                ).controls[k].get('groupName')).value;

                // if the groupName is not null in any sense
                if (groupName !== null && groupName.length > 0) {
                    // handle double names to
                    if (groupName in this.sitesGroups[siteName] != null) {
                        groupName = groupName + (k.toString());
                    }
                }
                // create automatic name for the groupName
                else {
                    groupName = "GROUP_NAME_"+(k.toString());
                }
    
                // create MachineGroup Object
                let newMachineGroup = new MachineGroup();

                // create dictionary for machine groups
                let newGlobalTagMappingSchema = (<FormGroup>(
                    <FormArray>(
                        <FormArray>(
                            <FormGroup>
                                this.sitesGroupsWrapper.controls['sitesGroupsForms']
                        ).controls[i]
                    ).controls['groups']
                ).controls[k].get('globalTagMappingSchema')).value;
    
                let newGlobalEnableSetup = (<FormGroup>(
                    <FormArray>(
                        <FormArray>(
                            <FormGroup>
                                this.sitesGroupsWrapper.controls['sitesGroupsForms']
                        ).controls[i]
                    ).controls['groups']
                ).controls[k].get('globalEnableSetup')).value;
    
                let newGlobalPrefix = (<FormGroup>(
                    <FormArray>(
                        <FormArray>(
                            <FormGroup>
                                this.sitesGroupsWrapper.controls['sitesGroupsForms']
                        ).controls[i]
                    ).controls['groups']
                ).controls[k].get('globalPrefix')).value;
    
                newMachineGroup.GLOBAL_TAG_MAPPING_SCHEMA   = newGlobalTagMappingSchema;
                newMachineGroup.GLOBAL_ENABLE_SETUP         = newGlobalEnableSetup;
                newMachineGroup.GLOBAL_PREFIX               = newGlobalPrefix;
                
                this.sitesGroups[siteName][groupName] = newMachineGroup;
                 
            }

        }

        console.log(this.sitesGroups);
        
        this.predixConfigurationDataService.setSitesGroups(this.sitesGroups);
        
    }
    
}
