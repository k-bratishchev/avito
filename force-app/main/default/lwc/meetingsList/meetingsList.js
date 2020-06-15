import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getMeetingsList from '@salesforce/apex/MeetingsController.getMeetingsList';
import sendInvites from '@salesforce/apex/MeetingsController.sendInvites';

const actions = [
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
    { label: 'Invite All', name: 'invite' }
];

const columns = [
    { label: 'Name', fieldName: 'Name'},
    { label: 'Start', fieldName: 'Start__c'},
    { label: 'End', fieldName: 'End__c' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class MeetingsList extends LightningElement {
    columns = columns;

    @wire(getMeetingsList)
    meetingsList

    renderedCallback() {
        refreshApex(this.meetingsList);
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const id = event.detail.row.Id;
        switch (actionName) {
            case 'edit':
                this.dispatchEvent(new CustomEvent('editmeeting', { detail: id }));
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
                case 'invite':
                    sendInvites({meetingId: id})
                        .then(() => {
                            this.dispatchEvent(
                                new ShowToastEvent({
                                    title: 'Success',
                                    message: 'Invites were succesfully sended',
                                    variant: 'success'
                                })
                            );
                        })
                        .catch(error => {
                            this.dispatchEvent(
                                new ShowToastEvent({
                                    title: 'Error sending invites',
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
