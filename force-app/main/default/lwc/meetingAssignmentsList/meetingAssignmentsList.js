import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getMAList from '@salesforce/apex/MeetingAssignmentsController.getMAList';
import sendInvite from '@salesforce/apex/MeetingAssignmentsController.sendInvite';

const actions = [
    { label: 'Send Invite', name: 'invite' },
    { label: 'Delete', name: 'delete' },
];

const columns = [
    { label: 'Meeting', fieldName: 'Meeting'},
    { label: 'Participant', fieldName: 'Participant'},
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class meetingAssignmentsList extends LightningElement {
    columns = columns;
    meetingAssignments = [];
    meetingAssignmentsData = [];

    @wire(getMAList)
    loadMeetingAssignments(result) {
        this.meetingAssignmentsData = result;
        if (result.data) {
            let meetingAssignments = [];
            result.data.forEach((item) => {
                meetingAssignments.push({
                    Id: item.Id,
                    Meeting: item.Meeting__r.Name,
                    Participant: item.Participant__r.Name
                })
            })
            this.meetingAssignments = meetingAssignments;
        }
    }

    renderedCallback() {
        refreshApex(this.meetingAssignmentsData);
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const id = event.detail.row.Id;
        switch (actionName) {
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
                        refreshApex(this.meetingAssignmentsData);
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
                sendInvite({assignmentId: id})
                    .then(() => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Success',
                                message: 'Invite was succesfully sended',
                                variant: 'success'
                            })
                        );
                    })
                    .catch(error => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Error sending invite',
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
