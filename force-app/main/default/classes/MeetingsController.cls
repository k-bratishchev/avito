public with sharing class MeetingsController {

    @AuraEnabled(cacheable=true)
    public static List<Meeting__c> getMeetingsList(){
        SObjectAccessDecision securityDecision = Security.stripInaccessible(
            AccessType.READABLE,
            [SELECT Id, Name, Start__c, End__c FROM Meeting__c LIMIT 50000]
        );
        
        return securityDecision.getRecords();
    }

    @AuraEnabled
    public static void sendInvites(Id meetingId){
        List<Meeting_Assignment__c> assignments = (List<Meeting_Assignment__c>) Security.stripInaccessible(
            AccessType.READABLE,
            [
                SELECT Id, Meeting__r.Name, Participant__r.Name, Participant__r.Email__c
                FROM Meeting_Assignment__c
                WHERE Meeting__c = :meetingId
            ]
        ).getRecords();

        system.debug(assignments);
        if ( assignments.size() == 0 ) {
            return;
        }

        String meetingName = assignments[0].Meeting__r.Name;
        Map<String, String> sendTo = new Map<String, String>();
        for(Meeting_Assignment__c assignment: assignments) {
            sendTo.put(assignment.Participant__r.Email__c, assignment.Participant__r.Name);
        }

        MessagingService.sendInvite(meetingName, sendTo);
    }
}
