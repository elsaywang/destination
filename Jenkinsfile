def uiImage
def apiImage
def uiImageName = "signal-center-ui:${env.BUILD_ID}"
def apiImageName = "signal-center-api-aggregator:${env.BUILD_ID}"

node ("docker") {

    //@aam:registry=https://artifactory.corp.adobe.com/artifactory/api/docker/docker-aam-portal-ui-release/
    //artifactory.corp.adobe.com/artifactory/api/npm/npm-eslint-config-aam-dev-local/:_password=QVBCTXIyNEZBRDFoZ1pTcmRUVUw3VFQ1blNR
    //artifactory.corp.adobe.com/artifactory/api/npm/npm-eslint-config-aam-dev-local/:username=parga
    //artifactory.corp.adobe.com/artifactory/api/npm/npm-eslint-config-aam-dev-local/:email=parga@adobe.com
    //artifactory.corp.adobe.com/artifactory/api/npm/npm-eslint-config-aam-dev-local/:always-auth=true

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
            uiImage.inside {
                sh '(cd /usr/src/app/client &&  CI=true npm test)'
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
}
