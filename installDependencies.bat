@echo off
title Installing Dependencies
start cmd /K "cd server && npm i"
start cmd /K "cd client && npm i"