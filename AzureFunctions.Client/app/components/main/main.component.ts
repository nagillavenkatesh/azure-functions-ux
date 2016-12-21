import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {SideNavComponent} from '../sidenav/sidenav.component';
import {ResourceType, Descriptor, SiteDescriptor} from '../../common/resourceDescriptors';
import {TreeViewInfo} from '../treeview/models/tree-view-info';
import {DashboardType} from '../treeview/models/dashboard-type';
import {UserService} from '../../services/user.service';
import {GlobalStateService} from '../../services/global-state.service';
import {FunctionEditComponent} from '../function-edit.component';
import {SiteDashboardComponent} from '../site/dashboard/site-dashboard.component';
import {BusyStateComponent} from '../busy-state.component';

@Component({
    selector: 'main',
    templateUrl: 'app/components/main/main.component.html',
    directives: [
        SideNavComponent,
        FunctionEditComponent,
        SiteDashboardComponent,
        BusyStateComponent
    ]
})
export class MainComponent implements AfterViewInit {
    public viewInfo : TreeViewInfo;
    public descriptor : Descriptor;
    public dashboardType : string;
    public inIFrame : boolean;

    @ViewChild(BusyStateComponent) busyStateComponent: BusyStateComponent;

    constructor(private _userService : UserService, private _globalStateService : GlobalStateService) {
        this.inIFrame = _userService.inIFrame;
    }

    updateViewInfo(viewInfo : TreeViewInfo){
        if(viewInfo.dashboardType === DashboardType.collection){
            return;
        }

        this.viewInfo = viewInfo;
        this.dashboardType = DashboardType[viewInfo.dashboardType];

        if(viewInfo.dashboardType !== DashboardType.createApp){
            this.descriptor = Descriptor.getDescriptor(viewInfo.resourceId);
        }
     }

    ngAfterViewInit() {
        this._globalStateService.GlobalBusyStateComponent  = this.busyStateComponent;
        // this._globalStateService.LocalDevelopmentInstructionsComponent = this.localDevelopment;
    }
}