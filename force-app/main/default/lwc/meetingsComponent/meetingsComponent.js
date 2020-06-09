import { LightningElement, track } from 'lwc';

export default class MeetingsComponent extends LightningElement {
    @track showMeetingsList = true;
    @track showParticipantsList = false;
    @track showMeetingDetails = false;
    @track showParticipantDetails = false;
    @track loading = false;
}