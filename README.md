# sharkwire - Final Project for MICS Cyber 210

## Team Members
*I didn't know we could do teams!!*  
Mark Mengelt (mmengelt@ischool.berkeley.edu)

## What is it?
This is a React application that submits .pcap files to a NodeJS server for parsing. The results are returned and displayed in the client.

## How do I use it?
I'm not sure why you'd want to in its current state but the application can be run by cloning the repo, going into the project direct and running...

    npm install

Once it's installed you can run the server by typing

    npm start

This will start up the app on port 3000. 

This will enable you to run the client program which will reach out to port 5000 on localhost. The API endpoint is not locked down by any security but does need to be run from the same server as the client to not get cors errors.