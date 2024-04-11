# sbs-frontend

Built with **React.js 18.2.0**

### Project setup
1. Create a `.env` file and add the following:
    ```
    NNODE_ENV=<ENV>
    REACT_APP_BACKEND_URL=<SBS_API_BASE_URL>
    ```
    where:
    - `NODE_ENV` = `development` or `production`
    - `REACT_APP_BACKEND_URL` = `http://localhost:5000/api/v1`

2. Install dependencies: `npm install`

3. Run application: `npm run start`

### Build application
**Command:** `npm run build`

**Docker command:** `docker build -t <IMAGE>:<TAG> .`

***Note:**
Follow [semantic versioning](https://semver.org/) scheme `X.Y.Z` for image `<TAG>`.*

### Run application
**Command:** `npm run start:prod`

**Docker command:** `docker run --name=<CONTAINER_NAME> [-e <ENV_VAR_NAME>=<ENV_VAR_VALUE>] [-v <HOST_PATH>:<CONTAINER_PATH>] -dp <HOST_PORT>:<CONTAINER_PORT> <IMAGE>:<TAG>`

***Note:** Provide environment variables and mount required files using `-e` and `-v` options. Refer: [docker run | Docker Docs](https://docs.docker.com/engine/reference/commandline/container_run/)*

### Requirements
- [React.js 18.2.0](https://expressjs.com/en/changelog/4x.html)
- [Node.js 20.9.0](https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V20.md#20.9.0)
- [MongoDB Atlas](https://mongodb.com/atlas)
- [Docker 24.0.5](https://docs.docker.com/engine/release-notes/24.0/#2405)
- [Ubuntu 20.04.6 LTS](https://wiki.ubuntu.com/FocalFossa/ReleaseNotes)