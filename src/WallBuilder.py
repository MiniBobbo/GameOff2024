from PIL import Image
import random
import tkinter as tk
from tkinter import filedialog
import os


def LeftWall(baseImage, leftHeight, rightHeight, width):
    #Create a new image
    maxHeight = max(leftHeight, rightHeight)
    minHeight = min(leftHeight, rightHeight)
    diff = (leftHeight - rightHeight)
    newImage = Image.new("RGBA", (width, maxHeight), (255, 255, 255, 0))
    for x in range(width):
        ratiox = x / width
        thisHeight = int(leftHeight - ((leftHeight - rightHeight) * ratiox))        

        layerHeight = int(leftHeight - (diff * ratiox))
        top = int((maxHeight - thisHeight)/2) 
        # print (x, layerHeight, top)
        for y in range(thisHeight):
            ratioy = y / layerHeight
            baseX = int(baseImage.width * ratiox)
            baseY = int(baseImage.height * ratioy)
            # print(x,y,baseX, baseY)
            # print("Getting {}, Putting {}".format((baseX, baseY), (x, y + top)))
            pixel = baseImage.getpixel((baseX, baseY))
            # Darken the pixel
            # pixel = tuple(int(p * 0.7) for p in pixel[:3]) + (pixel[3],)

            newImage.putpixel((x, y + top), pixel))
    return newImage


# Create a Tkinter root window and hide it
root = tk.Tk()
root.withdraw()

# Open a file dialog to select a .png file
file_path = filedialog.askopenfilename(filetypes=[("PNG files", "*.png")])
# file_path = 'C:/Users/Dagobah/Documents/gamedev/code/Editor/GameOff2024/public/assets/Walls.png'

folder_path = file_path[:file_path.rfind('/')+1]

# Check if a file was selected
if not file_path:
    raise ValueError("No file selected")

# Read in a .png file
BaseImage = Image.open(file_path)

#  Get the image name from the filename
imageName = file_path[file_path.rfind('/')+1:file_path.rfind('.')]
folder_path += "atlas/" + imageName + "/"
# Create a new folder to store the images
os.makedirs(folder_path, exist_ok=True)

# Get BaseImage dimensions
Base7 = BaseImage.resize((109, 109), Image.NEAREST)
Base7.save(folder_path + "Wall7.png")

Base5 = BaseImage.resize((138, 138), Image.NEAREST)
Base5.save(folder_path + "Wall5.png")

Base3 = BaseImage.resize((178, 178), Image.NEAREST)
Base3.save(folder_path + "Wall3.png")

Base1 = BaseImage.resize((264, 264), Image.NEAREST)
Base1.save(folder_path + "Wall1.png")

Left0 = LeftWall(Base1, 500, 264, 118)
newFilePath = folder_path + "Left0.png"
Left0.save(newFilePath)

Left2 = LeftWall(Base1, 264, 178, 45)
newFilePath = folder_path + "Left2.png"
Left2.save(newFilePath)

Left4 = LeftWall(Base1, 178, 138, 21)
newFilePath = folder_path + "Left4.png"
Left4.save(newFilePath)

Left6 = LeftWall(Base1,  138, 109, 15)
newFilePath = folder_path + "Left6.png"
Left6.save(newFilePath)



Right0 = LeftWall(Base1, 264, 500, 118)
newFilePath = folder_path + "Right0.png"
Right0.save(newFilePath)

Right2 = LeftWall(Base1, 178, 264, 45)
newFilePath = folder_path + "Right2.png"
Right2.save(newFilePath)

