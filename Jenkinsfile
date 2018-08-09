def uiImage
def tag = "${env.BRANCH_NAME}_${env.BUILD_ID}".replaceAll(/[^a-zA-Z0-9]/, "_").toLowerCase()
def uiImageName = "signal-center-ui:${tag}"
def cypressBaseImage = "cypress/base:8"
def workspace
def gitSshKey = "aam-portal-automation-private-key"
def artifactory = "Artifactory"

node ("docker") {
    properties([
        disableConcurrentBuilds(),
        [$class: 'BuildDiscarderProperty', strategy: [
            $class: 'LogRotator',
            artifactDaysToKeepStr: '',
            artifactNumToKeepStr: '',
            daysToKeepStr: '',
            numToKeepStr: '20'
        ]]
    ])

    try {
        workspace = pwd()
        stage ('Checkout latest repo changes') {
            checkout scm
        }

        stage ('Building Image') {
            withCredentials([file(credentialsId: gitSshKey, variable: '_SECRET')]) {
                sh "cat ${_SECRET} > ${workspace}/client/git_key"
            }

            withCredentials([usernamePassword(credentialsId: artifactory, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                sh "docker build -t ${uiImageName} --build-arg BUILD_NUMBER=${BUILD_NUMBER} --build-arg BRANCH_NAME=${BRANCH_NAME} --build-arg ARTIFACTORY_USERNAME=${USERNAME} --build-arg ARTIFACTORY_PASS=${PASSWORD} ./client"
                uiImage = docker.image(uiImageName)
            }
        }

        stage ('Running Unit Tests') {
            uiImage.inside("-u root -v ${workspace}/artifacts:/usr/src/app/artifacts") {
                sh '(cd /usr/src/app/client && CI=true npm test -- --coverage --bail --testResultsProcessor=./node_modules/jest-junit-reporter)'
                sh '(cd /usr/src/app/artifacts && rm -rf ui-build && mkdir ui-build)'
                sh 'cp -R /usr/src/app/client/* /usr/src/app/artifacts/ui-build'
            }
        }

        stage('Running Behavioral Tests') {
            docker.image(cypressBaseImage).inside("-u root -v ${workspace}/artifacts/ui-build:/usr/src/app/ui-build -v ${workspace}/client:/usr/src/app/client") {
                sh '(cd /usr/src/app/ui-build && mkdir cypress)'
                sh 'cp -R /usr/src/app/client/cypress/* /usr/src/app/ui-build/cypress/'
                sh 'cp -R /usr/src/app/client/cypress.json /usr/src/app/ui-build/cypress.json'
                sh '(cd /usr/src/app/ui-build && npm run cypress:ci)'
            }
        }

        stage ('Generate Release ZIP File') {
            zip archive: true, fingerprint: true, dir: "${workspace}/artifacts/ui-build/build/", glob: '**/*.*', zipFile: "${env.BRANCH_NAME}-build-${env.BUILD_NUMBER}-bundle.zip"
        }

    } catch (e) {
        // fail the build if an exception is thrown
        currentBuild.result = "FAILED"
        throw e
    } finally {
        // Post build steps here
        /* Success or failure, always run post build steps */
        // send email
        // publish test results etc etc

        // publish coverage
        publishHTML (target: [
            allowMissing: false,
            alwaysLinkToLastBuild: false,
            keepAll: true,
            reportDir: "${workspace}/artifacts/ui-build/coverage/lcov-report",
            reportFiles: 'index.html',
            reportName: "UI Coverage Report"
        ])

        //publish unit test
        junit '**/test-report.xml'

        // publish screenshots in a zip file if they are generated.
        if (fileExists("${workspace}/artifacts/ui-build/cypress/screenshots")) {
            zip archive: true, fingerprint: true, dir: "${workspace}/artifacts/ui-build/cypress/screenshots", glob: '*.png', zipFile: "cypress_errors_ss.${env.BUILD_ID}.zip"
        }

        // publish video if there is videos to publish
        archiveArtifacts artifacts: "**/*.mp4", fingerprint: true, allowEmptyArchive: true

    }
}
