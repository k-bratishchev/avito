import { LightningElement } from 'lwc';

//import updateMeetings from '@salesforce/apex/DevPlanController.updateMeetings';

const actions = [
    { label: 'Show Assigned Users', name: 'show_users' },
    { label: 'Cancel', name: 'cancel' },
];

const columns = [
    { label: 'Meeting Name', fieldName: 'Name', editable: true },
    { label: 'Start', fieldName: 'Start', type: 'date', editable: true },
    { label: 'End', fieldName: 'End', type: 'date', editable: true },
    { label: 'Status', fieldName: 'Status' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class MeetingsList extends LightningElement {
    data = [];
    columns = columns;
    record = {};

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'show_users':
                this.deleteRow(row);
                break;
            case 'cancel':
                this.updateMeetings(row);
                break;
            default:
        }
    }

    deleteRow(row) {
        const { id } = row;
        const index = this.findRowIndexById(id);
        if (index !== -1) {
            this.data = this.data
                .slice(0, index)
                .concat(this.data.slice(index + 1));
        }
    }

    findRowIndexById(id) {
        let ret = -1;
        this.data.some((row, index) => {
            if (row.id === id) {
                ret = index;
                return true;
            }
            return false;
        });
        return ret;
    }

    showRowDetails(row) {
        this.record = row;
    }
}
