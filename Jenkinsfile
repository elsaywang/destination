def uiImage
def tag = "${env.BRANCH_NAME}_${env.BUILD_ID}".replaceAll(/[^a-zA-Z0-9]/, "_").toLowerCase()
def uiImageName = "signal-center-ui:${tag}"
def cypressBaseImage = "cypress/base:10"
def workspace
def gitSshKey = "aam-portal-automation-private-key"
def npmRegistryToken = "npm-registry-token"
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
                sh "cat ${_SECRET} > ${workspace}/git_key"
            }

            withCredentials([
                usernamePassword(credentialsId: artifactory, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'),
                string(credentialsId: npmRegistryToken, variable: 'NPM_TOKEN')
            ]) {
                sh "docker build -t ${uiImageName} --build-arg BUILD_NUMBER=${BUILD_NUMBER} --build-arg BRANCH_NAME=${BRANCH_NAME} --build-arg ARTIFACTORY_USERNAME=${USERNAME} --build-arg ARTIFACTORY_PASS=${PASSWORD} --build-arg NPM_TOKEN=${NPM_TOKEN} ./"
                uiImage = docker.image(uiImageName)
            }
        }

        stage("Set the built packages as artifacts") {
             uiImage.inside("-u root -v ${workspace}/artifacts:/usr/src/artifacts") {
                sh '(cd /usr/src/artifacts && rm -rf ui-build && mkdir ui-build)'
                sh '(cd /usr/src/artifacts && rm -rf Cypress && mkdir Cypress)'
                sh 'cp -R /usr/src/app/* /usr/src/artifacts/ui-build'
                sh 'cp -R /root/.cache/Cypress/* /usr/src/artifacts/Cypress'
            }
        }



        stage("Run Tests") {
            parallel(
                "Check vulnerabilities": {
                    stage("Check vulnerabilities") {
                        uiImage.inside("-u root -v ${workspace}/artifacts:/usr/src/artifacts") {
                            sh '(cd /usr/src/artifacts/ui-build && npm run genvulnerabilitiesreport)'
                        }

                        archiveArtifacts artifacts: "**/vulnerabilities-report.txt", fingerprint: true, allowEmptyArchive: true
                    }
                },
                "Running Unit Test": {
                    stage ('Running Unit Tests') {
                        try {
                            uiImage.inside("-u root -v ${workspace}/artifacts:/usr/src/artifacts") {
                                sh '(cd /usr/src/artifacts/ui-build && CI=true COBERTURA=true npx lerna run test --stream -- -- --coverage --bail --testResultsProcessor=./node_modules/jest-junit-reporter)'
                            }
                        } catch(e) {
                            // fail the build if an exception is thrown
                            echo "Error from Unit Tests"
                            currentBuild.result = "FAILED"
                        } finally {
                            //publish unit test
                            junit '**/test-report.xml'
                            cobertura autoUpdateHealth: false, autoUpdateStability: false, coberturaReportFile: '**/cobertura-coverage.xml', conditionalCoverageTargets: '70, 0, 0', failUnhealthy: false, failUnstable: false, lineCoverageTargets: '80, 0, 0', maxNumberOfBuilds: 0, methodCoverageTargets: '80, 0, 0', onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false

                            // publish coverage
                            publishHTML (target: [
                                allowMissing: false,
                                alwaysLinkToLastBuild: false,
                                keepAll: true,
                                reportDir: "${workspace}/artifacts/ui-build/packages/signals/coverage/lcov-report",
                                reportFiles: 'index.html',
                                reportName: "UI Coverage Report"
                            ])
                        }
                    }
                },
                "Running Behavioral Tests": {
                    sleep 5 // to maintain same sequence in stage view
                    stage('Running Behavioral Tests') {
                        try {
                            docker.image(cypressBaseImage).inside("-u root -v ${workspace}/artifacts:/usr/src/artifacts") {
                                sh 'mkdir -p /root/.cache/Cypress && cp -R /usr/src/artifacts/Cypress/* /root/.cache/Cypress'
                                sh '(cd /usr/src/artifacts/ui-build && npx lerna run cypress:ci --stream)'
                            }
                        } catch (e) {
                            echo "Error from Behavioral Bests"
                            currentBuild.result = "FAILED"
                        } finally {
                            junit '**/cypress-test-report.*.xml'

                            // publish screenshots in a zip file if they are generated.
                            if (fileExists("${workspace}/artifacts/ui-build/packages/signals/cypress/screenshots")) {
                                zip archive: true, fingerprint: true, dir: "${workspace}/artifacts/ui-build/packages/signals/cypress/screenshots", glob: '*.png', zipFile: "cypress_errors_ss.${env.BUILD_ID}.zip"
                            }

                            // publish video if there is videos to publish
                            archiveArtifacts artifacts: "**/*.mp4", fingerprint: true, allowEmptyArchive: true
                        }

                    }
                }
            )
        }


        stage ('Generate Signals Release ZIP File') {
            zip archive: true, fingerprint: true, dir: "${workspace}/artifacts/ui-build/packages/signals/build/", glob: '**/*.*', zipFile: "signals-${env.BRANCH_NAME}-build-${env.BUILD_NUMBER}-bundle.zip"
        }

        stage ('Generate Destinations Release ZIP File') {
            zip archive: true, fingerprint: true, dir: "${workspace}/artifacts/ui-build/packages/destinations/build/", glob: '**/*.*', zipFile: "destinations-${env.BRANCH_NAME}-build-${env.BUILD_NUMBER}-bundle.zip"
        }

    } catch (e) {
        // fail the build if an exception is thrown
        currentBuild.result = "FAILED"
        throw e
    }
}
