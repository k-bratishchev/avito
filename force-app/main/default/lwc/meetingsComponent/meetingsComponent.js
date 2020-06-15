import { LightningElement } from 'lwc';

export default class MeetingsComponent extends LightningElement {
    showMeetingsList = true;
    showParticipantsList = true;
    showMeetingDetails = false;
    showParticipantDetails = false;
    showMAList = true;
    showMADetails = false;
    loading = false;

    participantId = null;
    meetingId = null;
    meetingAssignmentId = null;

    onCreateParticipant() {
        this.participantId = null;
        this.toggleParticipantDetails();
    }

    toggleParticipantDetails () {
        this.showParticipantsList = !this.showParticipantsList;
        this.showParticipantDetails = !this.showParticipantsList;
    }

    editParticipant(event) {
        this.participantId = event.detail;
        this.toggleParticipantDetails();
    }

    onCreateMeeting() {
        this.meetingId = null;
        this.toggleMeetingDetails();
    }

    toggleMeetingDetails () {
        this.showMeetingsList = !this.showMeetingsList;
        this.showMeetingDetails = !this.showMeetingsList;
    }

    editMeeting(event) {
        this.meetingId = event.detail;
        this.toggleMeetingDetails();
    }

    onCreateMA() {
        this.meetingAssignmentId = null;
        this.toggleMADetails();
    }

    toggleMADetails () {
        this.showMAList = !this.showMAList;
        this.showMADetails = !this.showMAList;
    }

    editMA(event) {
        this.meetingAssignmentId = event.detail;
        this.toggleMADetails();
    }
}
