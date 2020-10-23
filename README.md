# test sapper

on google cloud run

https://sapper.svelte.dev/

https://linuxhint.com/arch-linux-docker-tutorial/

https://www.mikenikles.com/blog/sapper-google-cloud-run-continuous-deployment-a-boilerplate-template

https://dev.to/ujwaldhakal/deploy-sapper-on-google-cloud-run-5gda

https://cloud.google.com/artifact-registry/docs/docker/quickstart

https://cloud.google.com/sdk/docs/install

https://cloud.google.com/cloud-build/docs/configuring-builds/substitute-variable-values

## commands
```sh
# authenticate with registry
gcloud auth configure-docker europe-north1-docker.pkg.dev

# give cloud build permission to deploy
gcloud projects list

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member "serviceAccount:PROJECT_NUMBER@cloudbuild.gserviceaccount.com" \
  --role roles/run.admin

gcloud iam service-accounts add-iam-policy-binding \
  PROJECT_NUMBER-compute@developer.gserviceaccount.com \
  --member="serviceAccountNUMBER@cloudbuild.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# build locally
docker build -t test-sapper .
# test locally
docker run -d -p 3000:3000 --name test test-sapper

# tag and push to registry
docker tag test-sapper europe-north1-docker.pkg.dev/backslash-project/testing/test-sapper
docker push europe-north1-docker.pkg.dev/backslash-project/testing/test-sapper

# deploy
gcloud run deploy --image europe-north1-docker.pkg.dev/backslash-project/testing/test-sapper --platform managed
```