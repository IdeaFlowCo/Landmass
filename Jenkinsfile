node {
	stage 'Checkout'
	    checkout scm

        stage 'Build Docker Container'
	    sh "docker build -t ideaflow/landmass ."
        stage 'Push docker images'
	    sh "docker push ideaflow/landmass"
}
