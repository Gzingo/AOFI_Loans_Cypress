// // Declarative Jenkins Pipeline for running Cypress tests on the 'test' branch
// // with environment detection and appropriate command execution based on Cypress version for CI/CD.
// //// Note: Adjust the Cypress run commands in package.json as needed for different versions. 

// // pipeline {
// //     agent any
// //     tools {
// //         nodejs 'NodeJS_20'
// //     }
// //     environment {
// //         CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
// //         CI = 'true'
// //         NODE_ENV = 'test'
// //     }
// //     stages {
// //         stage('Run only on test branch') {
// //             when {
// //                 expression {
// //                     env.BRANCH_NAME == 'test' || env.BRANCH_NAME == 'origin/test'
// //                 }
// //             }
// //             stages {
// //                 stage('Allow Cypress through firewall') {
// //                     when {
// //                         not { expression { isUnix() } }
// //                     }
// //                     steps {
// //                         echo 'Dodavanje Windows firewall pravila za Cypress...'
// //                         powershell '''
// //                         Try {
// //                             $exePath = Get-ChildItem -Path "$env:USERPROFILE\\AppData\\Local\\Cypress\\Cache" -Recurse -Filter Cypress.exe | Select-Object -First 1
// //                             if ($exePath) {
// //                                 New-NetFirewallRule -DisplayName 'Allow Cypress' -Direction Inbound -Program $exePath.FullName -Action Allow -Profile Any -ErrorAction Stop
// //                                 Write-Host '✅ Firewall pravilo dodato za Cypress.'
// //                             } else {
// //                                 Write-Host '⚠️ Cypress.exe nije pronađen — preskačem firewall pravilo.'
// //                             }
// //                         } Catch {
// //                             Write-Host '❌ Greška pri dodavanju firewall pravila: ' + $_.Exception.Message
// //                         }
// //                         '''
// //                     }
// //                 }
// //                 stage('Validate Cypress run script') {
// //                     steps {
// //                         echo 'Provera da li postoji cy:run:chrome skripta u package.json...'
// //                         dir('Cypress-Tests-UI-e2e') {
// //                             script {
// //                                 def scriptExists = fileExists('package.json') && readFile('package.json').contains('"cy:run:chrome"')
// //                                 if (!scriptExists) {
// //                                     error('❌ Skripta "cy:run:chrome" nije definisana u package.json. Build se prekida.')
// //                                 } else {
// //                                     echo '✅ Skripta "cy:run:chrome" pronađena.'
// //                                 }
// //                             }
// //                         }
// //                     }
// //                 }
// //                 stage('Install dependencies') {
// //                     steps {
// //                         echo 'Instalacija npm paketa...'
// //                         dir('Cypress-Tests-UI-e2e') {
// //                             script {
// //                                 def lockExists = fileExists('package-lock.json')
// //                                 if (lockExists) {
// //                                     echo 'package-lock.json pronađen — koristi npm ci'
// //                                     if (isUnix()) {
// //                                         sh "npm ci --cache ${env.CYPRESS_CACHE_FOLDER}"
// //                                     } else {
// //                                         bat "npm ci --cache ${env.CYPRESS_CACHE_FOLDER}"
// //                                     }
// //                                 } else {
// //                                     echo '⚠️ package-lock.json nije pronađen — koristi npm install'
// //                                     if (isUnix()) {
// //                                         sh "npm install --cache ${env.CYPRESS_CACHE_FOLDER}"
// //                                     } else {
// //                                         bat "npm install --cache ${env.CYPRESS_CACHE_FOLDER}"
// //                                     }
// //                                 }
// //                             }
// //                         }
// //                     }
// //                 }
// //                 stage('Run Cypress tests') {
// //                     steps {
// //                         echo 'Pokretanje Cypress testova u Chrome-u...'
// //                         dir('Cypress-Tests-UI-e2e') {
// //                             script {
// //                                 if (isUnix()) {
// //                                     sh 'npm run cy:run:chrome'
// //                                 } else {
// //                                     bat 'npm run cy:run:chrome'
// //                                 }
// //                             }
// //                         }
// //                     }
// //                 }
// //             }
// //         }
// //     }
// //     post {
// //         always {
// //             echo 'Arhiviranje JUnit rezultata...'
// //             junit testResults: 'Cypress-Tests-UI-e2e/cypress/reports/*.xml', allowEmptyResults: true

// //             echo 'Arhiviranje HTML izveštaja...'
// //             archiveArtifacts artifacts: 'Cypress-Tests-UI-e2e/cypress/reports/*.html', allowEmptyArchive: true

// //             echo 'Arhiviranje screenshota...'
// //             archiveArtifacts artifacts: 'Cypress-Tests-UI-e2e/cypress/screenshots/**/*.*', allowEmptyArchive: true

// //             script {
// //                 try {
// //                     publishHTML([
// //                         reportDir: 'cypress/reports',
// //                         reportFiles: 'index.html',
// //                         reportName: 'Cypress HTML Report',
// //                         keepAll: true,
// //                         alwaysLinkToLastBuild: true,
// //                         allowMissing: true
// //                     ])
// //                 } catch (Exception e) {
// //                     echo "HTML Publisher plugin not available — skipping publishHTML. (${e.message})"
// //                 }
// //             }
// //         }
// //         failure {
// //             echo '❌ Tests failed. Please check the logs and results.'
// //         }
// //     }
// // }


// // Enhanced Jenkins Pipeline with OS detection, Cypress version handling, firewall configuration,
// // and copying project files to workspace for running Cypress tests locally on the Jenkins agent.
// // Note: Adjust the Cypress run commands in package.json as needed for different versions.
// // Ensure the Jenkins agent has necessary permissions and network access for Cypress tests.
// // This example assumes a Windows-based Jenkins agent; modify commands for Linux agents as needed.
// pipeline {
//     agent any

//     environment {
//         CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
//         CI = 'true'
//         NODE_ENV = 'test'
//     }

//     stages {
//         stage('Copy Cypress project') {
//             steps {
//                 echo 'Kopiranje Cypress projekta u workspace...'
//                 bat 'xcopy /E /I /Y "C:\\Projects\\Test Automation Projects\\TubeIQ_QA\\EDS_FUK\\EDS_FUK_UI" "%WORKSPACE%"'
//             }
//         }

//         stage('Allow Cypress through firewall') {
//             steps {
//                 echo 'Dodavanje Windows firewall pravila za Cypress...'
//                 powershell '''
//                 Try {
//                     $exePath = Get-ChildItem -Path "$env:USERPROFILE\\AppData\\Local\\Cypress\\Cache" -Recurse -Filter Cypress.exe | Select-Object -First 1
//                     if ($exePath) {
//                         New-NetFirewallRule -DisplayName 'Allow Cypress' -Direction Inbound -Program $exePath.FullName -Action Allow -Profile Any -ErrorAction Stop
//                         Write-Host '✅ Firewall pravilo dodato za Cypress.'
//                     } else {
//                         Write-Host '⚠️ Cypress.exe nije pronađen — preskačem firewall pravilo.'
//                     }
//                 } Catch {
//                     Write-Host '❌ Greška pri dodavanju firewall pravila: ' + $_.Exception.Message
//                 }
//                 '''
//             }
//         }

//         stage('Validate Cypress run script') {
//             steps {
//                 echo 'Provera da li postoji cy:run:chrome skripta u package.json...'
//                 script {
//                     def scriptExists = fileExists('package.json') && readFile('package.json').contains('"cy:run:chrome"')
//                     if (!scriptExists) {
//                         error('❌ Skripta "cy:run:chrome" nije definisana u package.json. Build se prekida.')
//                     } else {
//                         echo '✅ Skripta "cy:run:chrome" pronađena.'
//                     }
//                 }
//             }
//         }

//         stage('Detect environment') {
//             steps {
//                 script {
//                     def osName = isUnix() ? 'linux' : 'windows'
//                     env.OS_NAME = osName
//                     echo "OS detektovan: ${osName}"

//                     def cypressVersion = isUnix() ?
//                         sh(script: 'npx cypress --version', returnStdout: true).trim() :
//                         bat(script: 'npx cypress --version', returnStdout: true).trim()

//                     echo "Cypress verzija: ${cypressVersion}"

//                     env.CYPRESS_RUN_CMD = 'npm run cy:run:chrome'
//                 }
//             }
//         }

//         stage('Install dependencies') {
//             steps {
//                 echo 'Instalacija npm paketa...'
//                 script {
//                     def lockExists = fileExists('package-lock.json')

//                     if (lockExists) {
//                         echo 'package-lock.json pronađen — koristi npm ci'
//                         if (isUnix()) {
//                             sh "npm ci --cache ${env.CYPRESS_CACHE_FOLDER}"
//                         } else {
//                             bat "npm ci --cache ${env.CYPRESS_CACHE_FOLDER}"
//                         }
//                     } else {
//                         echo '⚠️ package-lock.json nije pronađen — koristi npm install'
//                         if (isUnix()) {
//                             sh "npm install --cache ${env.CYPRESS_CACHE_FOLDER}"
//                         } else {
//                             bat "npm install --cache ${env.CYPRESS_CACHE_FOLDER}"
//                         }
//                     }
//                 }
//             }
//         }

//         stage('Run Cypress tests') {
//             steps {
//                 echo 'Pokretanje Cypress testova...'
//                 script {
//                     if (isUnix()) {
//                         sh "${env.CYPRESS_RUN_CMD}"
//                     } else {
//                         bat "${env.CYPRESS_RUN_CMD}"
//                     }
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             echo 'Arhiviranje JUnit rezultata...'
//             junit testResults: 'cypress/reports/*.xml', allowEmptyResults: true

//             echo 'Arhiviranje HTML izveštaja...'
//             archiveArtifacts artifacts: 'cypress/reports/*.html', allowEmptyArchive: true

//             echo 'Arhiviranje screenshota...'
//             archiveArtifacts artifacts: 'cypress/screenshots/**/*.*', allowEmptyArchive: true

//             publishHTML(target: [
//                 reportDir: 'cypress/reports',
//                 reportFiles: 'EDS-FUK Smoke Test Report.html',
//                 reportName: 'EDS-FUK Smoke Test Report',
//                 alwaysLinkToLastBuild: true,
//                 keepAll: true
//             ])
//         }

//         failure {
//             echo '❌ Tests failed. Please check the logs and results.'
//         }
//     }
// }