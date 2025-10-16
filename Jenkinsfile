pipeline {
    environment {
        dockerimagename = "bwidjanarko/back-app:v1"
        dockerImage = ""
    }
    agent any 
    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', credentialsId: '7b589ec9-630c-4db4-9d9e-7f3a965ec75e', url: 'https://github.com/bwidjanarko/nodejs-jenkins.git'
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
