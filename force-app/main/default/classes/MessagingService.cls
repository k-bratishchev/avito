public with sharing class MessagingService {
    
    public static void sendInvite(String meetingName, Map<String, String> sendTo ) {
        for(String email: sendTo.keySet()) {
            Messaging.SingleEmailMessage semail = new Messaging.SingleEmailMessage();
            String[] sendingTo = new String[]{email};
            String toName = sendTo.get(email);
            semail.setToAddresses(sendingTo);
            semail.setSubject('You are invited to ' + meetingName);
            semail.setPlainTextBody('Dear, ' + toName + '! You are invited to meeting');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] {semail});
        }
    }
}
