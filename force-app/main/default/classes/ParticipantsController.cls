public with sharing class ParticipantsController {

    @AuraEnabled(cacheable=true)
    public static List<Participant__c> getParticipantsList(){
        SObjectAccessDecision securityDecision = Security.stripInaccessible(
            AccessType.READABLE,
            [SELECT Id, First_Name__c, Last_Name__c, Phone__c, Email__c FROM Participant__c LIMIT 50000]
        );
        
        return securityDecision.getRecords();
    }

    @AuraEnabled(cacheable=true)
    public static List<Participant__c> getFreeParticipants(Id meetingId){
        SObjectAccessDecision securityDecision = Security.stripInaccessible(
            AccessType.READABLE,
            [
                SELECT Id, Name FROM Participant__c 
                WHERE Id NOT IN (
                            SELECT Participant__c
                            FROM Meeting_Assignment__c
                            WHERE Meeting__c = :meetingId
                        )
                LIMIT 50000
            ]
        );
        
        return securityDecision.getRecords();
    }

    @AuraEnabled
    public static void setAssignedParticipants(Id meetingId, List<Id> participantIds){
        Set<Id> participantSetIds = new Set<Id>(participantIds);
        List<Meeting_Assignment__c> removeAssignments = new List<Meeting_Assignment__c>();
        List<Meeting_Assignment__c> addAssignments = new List<Meeting_Assignment__c>();
        
        for(Meeting_Assignment__c assginment: [SELECT Id, Participant__c FROM Meeting_Assignment__c WHERE Meeting__c = :meetingId]) {
            if (!participantSetIds.contains(assginment.Participant__c)) {
                removeAssignments.add(assginment);
            } else {
                participantSetIds.remove(assginment.Participant__c);
            }
        }

        for (Id id: participantSetIds) {
            addAssignments.add(new Meeting_Assignment__c(
                Meeting__c = meetingId,
                Participant__c = id
            ));
        }

        delete removeAssignments;
        insert addAssignments;
    }
}
