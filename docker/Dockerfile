FROM centos:centos6

MAINTAINER Kai ogita

# install epel and packages
RUN rpm -Uvh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm && \
    rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm && \
    yum -y update --enablerepo=epel,remi,remi-php56 && yum clean all
RUN yum -y install --enablerepo=epel,remi,remi-php56 \
    git openssh-server openssh-clients passwd vim \
    php php-devel php-common php-cli php-pear php-xml \
    php-mbstring php-gd php-mcrypt php-pdo php-mysql php-pecl-imagick php-pecl-memcached php-pecl-apc php-pecl-memcache \
    memcached ImageMagick cronie sendmail

RUN ssh-keygen -q -N "" -t dsa -f /etc/ssh/ssh_host_dsa_key && \
    ssh-keygen -q -N "" -t rsa -f /etc/ssh/ssh_host_rsa_key && \
    sed -ri 's/UsePAM yes/UsePAM no/g' /etc/ssh/sshd_config && echo 'root:changeme' | chpasswd

# Create known_hosts
RUN mkdir /root/.ssh/ && \
    touch /root/.ssh/known_hosts && \
    echo -e "Host bitbucket.org\n\
    HostName bitbucket.org\n\
    User git\n\
    IdentityFile ~/.ssh/id_rsa\n\
    IdentitiesOnly yes\n\
    StrictHostKeyChecking no" >> /root/.ssh/config && \
    echo -e "Host github.com\n\
    HostName github.com\n\
    User git\n\
    IdentityFile ~/.ssh/id_rsa\n\
    IdentitiesOnly yes\n\
    StrictHostKeyChecking no" >> /root/.ssh/config

# Default Time Zone
RUN ln -sf /usr/share/zoneinfo/Japan /etc/localtime

# setting japanese http://qiita.com/snaka/items/55fc351ef61c12bc09a5
RUN echo 'LANG="ja_JP.UTF-8"' > /etc/sysconfig/i18n && localedef -f UTF-8 -i ja_JP ja_JP

# ADD files
RUN yum -y install wget java
RUN wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.6.4.tar.gz
RUN sha1sum elasticsearch-5.6.4.tar.gz
RUN tar -xzf elasticsearch-5.6.4.tar.gz
RUN cd elasticsearch-5.6.4/
RUN ls
RUN /elasticsearch-5.6.4/bin/elasticsearch-plugin install analysis-kuromoji
RUN /elasticsearch-5.6.4/bin/elasticsearch-plugin install analysis-icu