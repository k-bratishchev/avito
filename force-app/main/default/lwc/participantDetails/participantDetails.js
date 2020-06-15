import { LightningElement, api } from 'lwc';

import FIRST_NAME_FIELD from '@salesforce/schema/Participant__c.First_Name__c';
import LAST_NAME_FIELD from '@salesforce/schema/Participant__c.Last_Name__c';
import PHONE_FIELD from '@salesforce/schema/Participant__c.Phone__c';
import EMAIL_FIELD from '@salesforce/schema/Participant__c.Email__c';

export default class ParticipantDetails extends LightningElement {
    @api participantId;

    fields = [FIRST_NAME_FIELD, LAST_NAME_FIELD, PHONE_FIELD, EMAIL_FIELD];

    get title() {
        return this.participantId ? 'Edit Participant' : 'Create Participant';
    }

    showParticipantList() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}
