public with sharing class MeetingAssignmentTriggerHandler 
{
    
    public void OnBeforeInsert(List<Meeting_Assignment__c> newAssignments)
    {
        checkTime(newAssignments);
    }

    public void OnBeforeUpdate(List<Meeting_Assignment__c> newAssignments, List<Meeting_Assignment__c> oldAssignments, Map<ID, Meeting_Assignment__c> newAssignmentsMap , Map<ID, Meeting_Assignment__c> oldAssignmentsMap )
    {
        checkTime(newAssignments);
    }


    private void checkTime(List<Meeting_Assignment__c> assignments) { //Work in progress

    }
}