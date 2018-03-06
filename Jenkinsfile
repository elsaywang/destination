def uiImage
def apiImage
def uiImageName = "signal-center-ui:${env.BUILD_ID}"
def apiImageName = "signal-center-api-aggregator:${env.BUILD_ID}"
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

        stage ('Running Tests') {
            parallel 'run UI tests': {
                uiImage.inside("-u root -v ${workspace}/artifacts:/usr/src/app/artifacts") {\
                    sh 'mkdir -p /usr/src/app/client/coverage'
                    sh '(cd /usr/src/app/client &&  CI=true npm test -- --coverage --bail)'
                    sh 'cp -r /usr/src/app/client/coverage /usr/src/app/artifacts/coverage'
                }
            }, 'run API tests': {
                apiImage.inside {
                    sh '(cd /usr/src/app/server && npm test)'
                }
            }
        }

        stage ('Publish Images') {
            parallel 'Publish UI Image':  {
                docker.withRegistry('https://docker-aam-portal-ui-release.dr.corp.adobe.com', 'Artifactory') {
                    uiImage.push('latest')
                }
            }, 'Publish API aggregator Image': {
                docker.withRegistry('https://docker-aam-portal-ui-release.dr.corp.adobe.com', 'Artifactory') {
                    apiImage.push('latest')
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
            reportDir: "${workspace}/artifacts/coverage/lcov-report",
            reportFiles: 'index.html',
            reportName: "UI Coverage Report"
        ])

    }




}



