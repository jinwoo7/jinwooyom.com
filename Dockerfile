FROM richarvey/nginx-php-fpm

MAINTAINER Jinwoo Yom <jinwoo7@vt.edu>

# set up nginx
RUN sed -i 's/root \/usr\/share\/nginx\/html/root \/var\/www\/html/g' /etc/nginx/sites-enabled/default.conf
RUN rm /var/www/html/*

# import web files
COPY web/ /var/www/html
