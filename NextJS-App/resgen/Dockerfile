# Use an official Ubuntu as a parent image
FROM ubuntu:latest

# Update and install LaTeX
RUN apt-get update && apt-get install -y \
    texlive-xetex \
    texlive-fonts-recommended \
    texlive-plain-generic

# Set the working directory
WORKDIR /workspace
