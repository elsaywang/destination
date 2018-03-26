def uiImage
def apiImage
def uiImageName = "signal-center-ui:${env.BUILD_ID}"
def apiImageName = "signal-center-api-aggregator:${env.BUILD_ID}"
def cypressBaseImage = "cypress/base:8"
def workspace

node ("docker") {
    try {
        workspace = pwd()
        stage ('Checkout latest repo changes') {
            checkout scm
        }

        stage ('Building Images') {
            parallel 'Build UI image': {
                sh "docker build -t ${uiImageName} ./client"
                uiImage = docker.image(uiImageName)
            }, 'Build API aggregator image': {
                sh "docker build -t ${apiImageName} ./server"
                apiImage = docker.image(apiImageName)
            }
        }

        stage ('Running Unit Tests') {
            parallel 'run UI tests': {
                uiImage.inside("-u root -v ${workspace}/artifacts:/usr/src/app/artifacts") {
                    sh '(cd /usr/src/app/client && CI=true npm test -- --coverage --bail --testResultsProcessor=./node_modules/jest-junit-reporter)'
                    sh '(cd /usr/src/app/artifacts && rm -rf ui-build && mkdir ui-build)'
                    sh 'cp -R /usr/src/app/client/* /usr/src/app/artifacts/ui-build'
                }
            }, 'run API tests': {
                apiImage.inside {
                    sh '(cd /usr/src/app/server && npm test)'
                }
            }
        }

        stage('Running Behavioral Tests') {
            docker.image(cypressBaseImage).inside("-u root -v ${workspace}/artifacts/ui-build:/usr/src/app/ui-build -v ${workspace}/client:/usr/src/app/client") {
                sh '(cd /usr/src/app/ui-build && mkdir cypress)'
                sh 'cp -R /usr/src/app/client/cypress/* /usr/src/app/ui-build/cypress/'
                sh 'cp -R /usr/src/app/client/cypress.json /usr/src/app/ui-build/cypress.json'
                sh '(cd /usr/src/app/ui-build && npm run ci)'
            }
        }

        stage ('Publish Images') {
            if (env.BRANCH_NAME == "master") {
              def dockerName = 'latest'
            } else {
              def dockerName = env.BRANCH_NAME
            }
            parallel 'Publish UI Image':  {
                docker.withRegistry('https://docker2-aam-portal-ui-release-local.dr-uw2.adobeitc.com', 'artifactory_usw2') {
                    uiImage.push(dockerName)
                }
            }, 'Publish API aggregator Image': {
                docker.withRegistry('https://docker2-aam-portal-ui-release-local.dr-uw2.adobeitc.com', 'artifactory_usw2') {
                    apiImage.push(dockerName)
                }
            }
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

        archiveArtifacts artifacts: "**/*.mp4", fingerprint: true, allowEmptyArchive: true

    }
}
