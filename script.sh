#!/bin/bash

i="0"
while [ $i -lt 10 ]
do
eval "npm run co"
i=$[$i+1]
done