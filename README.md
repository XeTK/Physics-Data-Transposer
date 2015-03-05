# Physics-Data-Transposer

The program has use in Raman spectroscopy in the creation of maps. Each file is a spectrum at a specific XY position.

The program takes the text file which has the wavenumber and intensity of a light source as separates rows in the file. The first row is the wavenumber and the remaining rows are the intensity values. The program reads the first row as the starting row of each file and then the program creates a new file for each additional row. This new file contains the wavenumber row and the intensity row. The program transposes the data set before it is saved. The output being 2 columns of data.
