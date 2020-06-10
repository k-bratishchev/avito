import { LightningElement } from 'lwc';

export default class MeetingsComponent extends LightningElement {
    showMeetingsList = true;
    showParticipantsList = true;
    showMeetingDetails = false;
    showParticipantDetails = false;
    loading = false;

    participantId = null;

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

}
