public with sharing class SecurityService {
    public static SObject getFirstSecureRecord(List<SObject> sourceRecords, Boolean isNullPossible) {
        SObjectAccessDecision securityDecision = Security.stripInaccessible(
            AccessType.READABLE,
            sourceRecords
        );

        if (securityDecision.getRecords().size() == 0 && !isNullPossible) {
            throw new QueryException('Can not find record');
        }

        return securityDecision.getRecords().size() > 0 ? securityDecision.getRecords()[0] : null;
    }
    
}
