public with sharing class MeetingAssignmentsController {

    @AuraEnabled(cacheable=true)
    public static List<Meeting__c> getMAList(){
        SObjectAccessDecision securityDecision = Security.stripInaccessible(
            AccessType.READABLE,
            [SELECT Id, Meeting__r.Name, Participant__r.Name FROM Meeting_Assignment__c LIMIT 50000]
        );
        
        return securityDecision.getRecords();
    }

    @AuraEnabled
    public static void sendInvite(Id assignmentId){
        Meeting_Assignment__c assignment = (Meeting_Assignment__c)SecurityService.getFirstSecureRecord(
            [
                SELECT Id, Meeting__r.Name, Participant__r.Name, Participant__r.Email__c
                FROM Meeting_Assignment__c
                WHERE Id = :assignmentId
            ],
            false
        );

        MessagingService.sendInvite(assignment.Meeting__r.Name, new Map<String, String>{assignment.Participant__r.Email__c => assignment.Participant__r.Name});
    }
}
