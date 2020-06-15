Avito Test

Dev org setup
Clone the project to the local machine from GIT
Select the folder with Salesforce DX project:
Login to your Dev Hub (don't forget to enable Dev Hub in Org Setup)
sfdx force:auth:web:login -d -a avito

Create a scratch org with bash script:
scripts/bash.sh dev1

@TODO
Check availability of Participants
Send notification in 15 minutes before meeting
Write unit tests
Test and bugfix

Important: HTTP POST is working in Salesforce with Standard and Custom objects. You can use Workbench

You can login to Scratch via link https://dream-flow-980-dev-ed.cs22.my.salesforce.com/secur/frontdoor.jsp?sid=00D17000000H50s!ARYAQH2uU4UJL_XRH4LpZ2UeqrvrCcp7F77sq.E5vs3weccOuxtr6GS9pRjC7dq0ZA2fRZV067TVWBNzhcFsWy6bFHgcwj7n
Then click App Launcher and choose Sales - Test Component will be on the Home Page
