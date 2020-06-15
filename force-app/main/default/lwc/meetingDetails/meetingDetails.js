import { LightningElement, api } from 'lwc';

import NAME from '@salesforce/schema/Meeting__c.Name';
import START from '@salesforce/schema/Meeting__c.Start__c';
import END from '@salesforce/schema/Meeting__c.End__c';

export default class MeetingDetails extends LightningElement {
    @api meetingId;

    fields = [NAME, START, END];

    get title() {
        return this.meetingId ? 'Edit Meeting' : 'Create Meeting';
    }

    showMeetingList() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}
