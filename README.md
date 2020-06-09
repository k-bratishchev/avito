Avito Test

Dev org setup
Clone the project to the local machine from GIT
Select the folder with Salesforce DX project:
Login to your Dev Hub (don't forget to enable Dev Hub in Org Setup)
sfdx force:auth:web:login -d -a avito

Create a scratch org with bash script:
scripts/bash.sh dev1
