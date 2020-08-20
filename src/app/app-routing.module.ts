import { CampaignCdrComponent } from './components/campaign-cdr/campaign-cdr.component';
import { LandingComponent } from './landing/landing.component';
import { AudioEditComponent } from './components/audio-edit/audio-edit.component';
import { PhonebookViewComponent } from './components/phonebook-view/phonebook-view.component';
import { PhonebookEditComponent } from './components/phonebook-edit/phonebook-edit.component';
import { CampaignReportComponent } from './components/campaign-report/campaign-report.component';
import { CampaignEditComponent } from './components/campaign-edit/campaign-edit.component';
import { ReportSingleComponent } from './components/report-single/report-single.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { DncAddComponent } from './components/dnc-add/dnc-add.component';
import { DncComponent } from './components/dnc/dnc.component';
import { PhonebookAddComponent } from './components/phonebook-add/phonebook-add.component';
import { PhonebookComponent } from './components/phonebook/phonebook.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AudioAddComponent } from './components/audio-add/audio-add.component';
import { AudioComponent } from './components/audio/audio.component';
import { CampaignsAddComponent } from './components/campaigns-add/campaigns-add.component';
import { StatementsComponent } from './components/statements/statements.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ReportCdrComponent } from './components/report-cdr/report-cdr.component';
import { IvrComponent } from './components/ivr/ivr.component';
import { IvrAddComponent } from './components/ivr-add/ivr-add.component';
import { IvrEditComponent } from './components/ivr-edit/ivr-edit.component';
import { DncViewComponent } from './components/dnc-view/dnc-view.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'user', component: UserComponent, canActivate: [AuthGuardService]
    , children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'analytics/report/:id', component: ReportSingleComponent },
      { path: 'analytics/report/call-detail-record/:id', component: ReportCdrComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'accounts/invoices', component: InvoicesComponent },
      { path: 'accounts/statements', component: StatementsComponent },
      { path: 'accounts/purchase', component: PurchaseComponent },
      { path: 'accounts/settings', component: SettingsComponent },
      { path: 'campaigns', component: CampaignsComponent },
      { path: 'campaigns/add', component: CampaignsAddComponent },
      { path: 'campaigns/edit/:id', component: CampaignEditComponent },
      { path: 'campaigns/active/:id', component: CampaignReportComponent },
      { path: 'campaigns/active/call-record/:id', component: CampaignCdrComponent },
      { path: 'phonebook', component: PhonebookComponent },
      { path: 'phonebook/add', component: PhonebookAddComponent },
      { path: 'phonebook/edit/:id', component: PhonebookEditComponent },
      { path: 'phonebook/view/:id', component: PhonebookViewComponent },
      { path: 'dnc', component: DncComponent },
      { path: 'dnc/add', component: DncAddComponent },
      { path: 'dnc/view/:id', component: DncViewComponent },
      { path: 'audio', component: AudioComponent },
      { path: 'audio/add', component: AudioAddComponent },
      { path: 'audio/edit/:id', component: AudioEditComponent },
      { path: 'ivr', component: IvrComponent },
      { path: 'ivr/add', component: IvrAddComponent },
      { path: 'ivr/edit/:id', component: IvrEditComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
