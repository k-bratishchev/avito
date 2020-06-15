import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getParticipantsList from '@salesforce/apex/ParticipantsController.getParticipantsList';

const actions = [
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];

const columns = [
    { label: 'First Name', fieldName: 'First_Name__c'},
    { label: 'Last Name', fieldName: 'Last_Name__c'},
    { label: 'Phone', fieldName: 'Phone__c' },
    { label: 'Email', fieldName: 'Email__c' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class ParticipantsList extends LightningElement {
    data = [];
    columns = columns;

    @wire(getParticipantsList)
    participantsList

    renderedCallback() {
        refreshApex(this.participantsList);
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const id = event.detail.row.Id;
        switch (actionName) {
            case 'edit':
                this.dispatchEvent(new CustomEvent('editparticipant', { detail: id }));
                break;
            case 'delete':
                deleteRecord(id)
                    .then(() => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Success',
                                message: 'Record deleted',
                                variant: 'success'
                            })
                        );
                        refreshApex(this.meetingsList);
                    })
                    .catch(error => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Error deleting record',
                                message: error.body.message,
                                variant: 'error'
                            })
                        );
                    });
                break;
            default:
        }
    }
}
