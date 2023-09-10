Reciept Processor!

This was made with MERN stack.

You cna run this with or without docker.

If using docker:
1. Make sure you have docker desktop
2. You may need to use linux containers
3. Some extensions you might need: dev containers, docker compose, docker, WSL, docker extension pack, docker explorer
4. Make sure WSL is updated and enabled
5. Can install and update WSL with powershell running on admin

With Docker:
1. Go to the directory of docker-compose.yaml in terminal
2. This should be in folder receipt-processing-software
3. Run docker-compose build in terminal in that directory
4. Then run docker-compose up



Without Docker:
1. Open terminal and go to directory of backend
2. Run node server.js in terminal
3. Then open a new terminal and go to directory of frontend
4. Run npm install --legacy-peer-deps
5. Then run npm start
