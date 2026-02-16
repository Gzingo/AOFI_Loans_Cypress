// Declarative Jenkins Pipeline for running Cypress tests
// Note: Configure environment-specific paths and credentials via Jenkins environment variables.
// Adjust the Cypress run commands in package.json as needed for different versions.

pipeline {
    agent any
    tools {
        nodejs 'NodeJS_20'
    }
    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
        CI = 'true'
        NODE_ENV = 'test'
    }
    stages {
        stage('Install dependencies') {
            steps {
                echo 'Installing npm packages...'
                script {
                    def lockExists = fileExists('package-lock.json')
                    if (lockExists) {
                        echo 'package-lock.json found - using npm ci'
                        if (isUnix()) {
                            sh "npm ci --cache ${env.CYPRESS_CACHE_FOLDER}"
                        } else {
                            bat "npm ci --cache ${env.CYPRESS_CACHE_FOLDER}"
                        }
                    } else {
                        echo 'package-lock.json not found - using npm install'
                        if (isUnix()) {
                            sh "npm install --cache ${env.CYPRESS_CACHE_FOLDER}"
                        } else {
                            bat "npm install --cache ${env.CYPRESS_CACHE_FOLDER}"
                        }
                    }
                }
            }
        }

        stage('Run Cypress tests') {
            steps {
                echo 'Running Cypress tests in Chrome...'
                script {
                    if (isUnix()) {
                        sh 'npm run cy:run:chrome'
                    } else {
                        bat 'npm run cy:run:chrome'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Archiving test results...'
            junit testResults: 'cypress/reports/*.xml', allowEmptyResults: true
            archiveArtifacts artifacts: 'cypress/reports/*.html', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.*', allowEmptyArchive: true
        }
        failure {
            echo 'Tests failed. Please check the logs and results.'
        }
    }
}
