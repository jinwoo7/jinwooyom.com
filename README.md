# Jinwooyom.com
- Personal website that I have created from scratch!
- Built using CSS, HTML, Javascript, and PHP without any use of framework or bootstrap
- The objective of this project were:
    * to have a strong foundation in working with basic building blocks of front-end development
    * to study and develope a website and a portfolio that follows the modern UI/UX standards

## Webserver setup (ex. AWS)
- Select a hosting platform (ex. AWS)
> AWS Example
> First, spin up an EC2 instance w/ standard security group + HTTP & HTTPS inbound rules
> Second, setup the EC2 instance
>  - Update the instance and install httpd git docker
>  - Start docker daemon "sudo systemctl start docker"

## Webapp Deployment
- Ensure that you have docker and git installed on your machine
```bash
sudo apt install docker git -y
```
- Git clone the repo
- Move the Dockerfile and deploy.sh out of the repo
- Run deploy.sh
```bash
git clone https://github.com/jinwoo7/jinwooyom.com.git
mv jinwooyom.com/Dockerfile Dockerfile
mv jinwooyom.com/deploy.sh deploy.sh
chmod +x deploy.sh
./deploy.sh
```
- Now check the webserver setup using the public IP

## Domain name setup (ex. Route53 w/ namecheap)
- Select a domain provider (ex. namecheap)
-  Purchase the domain name from the domain provider
-  In Route53, create a public hosted zone. Name it your domain name
1. Create an A record
> - In the created hostedzone, create a record
> - leave the default settings (Record type = A & simple routing)
> - Copy over the public IP into the Value and create
2. Create a alias for www subdomain access
> - Create another record in the same hosted zone
> - Put "www" as subdomain, turn on alias
> - Set route traffic to "Alias to another record in this hosted zone"
> - Set to your domain record created in step 1 and create
3. Update nameservers w/ your domain provider
- Go to your domain provider and open up nameserver manager for your domain
- Copy over the four nameservers provided by Route53
- Save it. Now wait until DNS propagates properly!


## Maintenance
- On your host machine, pull the repo
- Make neccessary changes
- Git add, commit and push the changes to master branch
- On your web server, run deploy.sh and the web page will re-deploy the website with the latest change

##  Logo
![alt text][logo]

## Usage
- You are welcome to take this and modify to your own need and deploy your own website (Please give credit)
- You MAY NOT deploy a fake jinwooyom.com website
- Please make an issue if you find any bugs or if some features need improvements

Copoyright &copy; 2017, Jinwoo Yom. All Rights Reserved

[logo]: ./resources/css/img/JinwooYom-LogoDark.png "JinwooYom.com Logo"

