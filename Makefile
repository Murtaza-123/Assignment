#RUN COMMAND
docker-run: 
   sudo docker-compose up
npm -run:
   npm run start:dev
npm-generate: 
   npm run migration:generate
npm-revert
   npm run migration:revert