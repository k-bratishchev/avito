import { LightningElement, api } from 'lwc';

import MEETING from '@salesforce/schema/Meeting_Assignment__c.Meeting__c';
import PARTICIPANT from '@salesforce/schema/Meeting_Assignment__c.Participant__c';

export default class MeetingAssignmentDetails extends LightningElement {
    @api meetingAssignmentId;

    fields = [MEETING, PARTICIPANT];

    get title() {
        return 'Create Meeting Assignment';
    }

    showMAList() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}
