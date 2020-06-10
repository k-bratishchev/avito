public with sharing class ParticipantsController {

    @AuraEnabled(cacheable=true)
    public static List<Participant__c> getParticipantsList(){
        return [SELECT Id, First_Name__c, Last_Name__c, Phone__c, Email__c FROM Participant__c];
    }
}
