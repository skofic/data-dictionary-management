#!/bin/sh

###
# Export data dictionary JSONL dumps to default directory.
# $1: Database name.
###

###
# Export terms.
###
sh /home/AramgoDB/scripts/export_key_collection.sh "$1" terms

###
# Export edges.
###
sh /home/AramgoDB/scripts/export_key_collection.sh "$1" edges

###
# Export links.
###
sh /home/AramgoDB/scripts/export_key_collection.sh "$1" links
