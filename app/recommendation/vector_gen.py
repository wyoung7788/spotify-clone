"""
setting up python environment to run ml model
"""

# https://scikit-learn.org/1.5/modules/feature_extraction.html
import sqlite3
import tensorflow as tf
import pandas as pd
import numpy as np
import kagglehub
from sklearn.feature_extraction import DictVectorizer


conn = sqlite3.connect('featurevectors') 
path = kagglehub.dataset_download("maharshipandya/-spotify-tracks-dataset")

#load data


#generate feature vectors and store in a database
vec = DictVectorizer()

#knn algorithm




#clustering algorithm
#have user choose between two songs

#perform feature extraction


#use cosine similarity