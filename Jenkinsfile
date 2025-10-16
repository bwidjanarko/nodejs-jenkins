pipeline {
    environment {
        dockerimagename = "bwidjanarko/back-app:v1"
        dockerImage = ""
    }
    agent any 
    stages {
        stage('Checkout Source') {
            steps {
                git 'https://github.com/bwidjanarko/nodejs-jenkins'
            }
        }
        stage('Build Image') {
            steps {
                echo 'Build Image' 
                script {
                    dockerImage = docker.build dockerimagename
                }
            }
        }
        stage('Push Image') {
            environment {
               registryCredential = 'Dockerhub Credential'
            }
            steps {
                echo 'Push Image' 
                script {
                    docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
                           dockerImage.push("latest")
                    }
                }
            }
        }
        stage('Run Unit Tests') {
            steps {
                echo 'Run unit tests from the source code' 
            }
        }
        stage('Run Integration Tests') {
            steps {
                echo 'Run only crucial integration tests from the source code' 
            }
        }
        stage('Publish Artifacts') {
            steps {
                echo 'Save the assemblies generated from the compilation' 
            }
        }
    }
}
