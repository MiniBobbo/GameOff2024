from PIL import Image
import random
import tkinter as tk
from tkinter import filedialog
import os

def LeftWall(baseImage, leftHeight, rightHeight, width, bumpMap, depth = 1):
    # Create a new image
    maxHeight = max(leftHeight, rightHeight)
    minHeight = min(leftHeight, rightHeight)
    sizeRatio = maxHeight / baseImage.height
    diff = (leftHeight - rightHeight)
    bumpHeight = 20
    # The new image needs to be wider than the base image so we can apply the bump map.
    newImage = Image.new("RGBA", (width + bumpHeight * 2, maxHeight), (255, 255, 255, 0))

    # Start at the right side of the image because on the left wall that is going to be the farthest away from the viewer.  
    # This isn't the optimal way to do it but it is a good first attempt, and I'm not sure that efficiency matters for this
    # application anyway.

    for x in range(width, - 1, -1):
        ratiox = x / (width) 
        thisHeight = int(leftHeight - ((leftHeight - rightHeight) * ratiox))
        layerHeight = int(leftHeight - (diff * ratiox))
        top = int((maxHeight - thisHeight)/2)
        # Await a keyboard press
        # input()
        for y in range(thisHeight):
            ratioy = y / layerHeight
            baseX = max(0, min(int(baseImage.width * ratiox), baseImage.width - 1))
            baseY = max(0, min(int(baseImage.height * ratioy), baseImage.height - 1))
            # print(x,y,baseX, baseY)
            # print("Getting {}, Putting {}".format((baseX, baseY), (x, y + top)))
            pixel = baseImage.getpixel((baseX, baseY))
            darken = 1 - .1 * depth - .1 * ratiox
            pixel = tuple(int(p * darken) for p in pixel[:3]) + (pixel[3],)
            bumpPixel = bumpMap.getpixel((baseX, baseY))
            # Calculate the height of this pixel based on the bump map
            pixelHeight = int((bumpPixel / 255) * bumpHeight)
            # Draw this pixel also to the right of this position.
            for r in range(pixelHeight):
                newImage.putpixel((bumpHeight + x + r, y + top), pixel)

    return newImage    


def RightWall(baseImage, leftHeight, rightHeight, width, bumpMap, depth = 1):
    # Create a new image
    maxHeight = max(leftHeight, rightHeight)
    minHeight = min(leftHeight, rightHeight)
    sizeRatio = maxHeight / baseImage.height
    diff = (leftHeight - rightHeight)
    bumpHeight = 20
    # The new image needs to be wider than the base image so we can apply the bump map.
    newImage = Image.new("RGBA", (width + bumpHeight * 2, maxHeight), (255, 255, 255, 0))

    # Start at the right side of the image because on the left wall that is going to be the farthest away from the viewer.  
    # This isn't the optimal way to do it but it is a good first attempt, and I'm not sure that efficiency matters for this
    # application anyway.

    for x in range(width):
        ratiox = x / (width) 
        thisHeight = int(leftHeight - ((leftHeight - rightHeight) * ratiox))
        layerHeight = int(leftHeight - (diff * ratiox))
        top = int((maxHeight - thisHeight)/2)
        # Await a keyboard press
        # input()
        for y in range(thisHeight):
            ratioy = y / layerHeight
            baseX = max(0, min(int(baseImage.width * ratiox), baseImage.width - 1))
            baseY = max(0, min(int(baseImage.height * ratioy), baseImage.height - 1))
            # print(x,y,baseX, baseY)
            # print("Getting {}, Putting {}".format((baseX, baseY), (x, y + top)))
            pixel = baseImage.getpixel((baseX, baseY))
            darken = 1 - .1 * depth + .1 * ratiox
            pixel = tuple(int(p * darken) for p in pixel[:3]) + (pixel[3],)
            bumpPixel = bumpMap.getpixel((baseX, baseY))
            # Calculate the height of this pixel based on the bump map
            pixelHeight = int((bumpPixel / 255) * bumpHeight)
            # Draw this pixel also to the right of this position.
            for r in range(pixelHeight):
                newImage.putpixel((bumpHeight + x - r, y + top), pixel)

    return newImage    

def FlatWall(baseImage, bumpMap, depth = 1):
    # Create a new image
    maxHeight = baseImage.height
    width = baseImage.width
    bumpHeight = 20
    # The new image needs to be wider than the base image so we can apply the bump map.
    newImage = Image.new("RGBA", (width + bumpHeight * 2, maxHeight), (255, 255, 255, 0))

    # Start at the right side of the image because on the left wall that is going to be the farthest away from the viewer.  
    # This isn't the optimal way to do it but it is a good first attempt, and I'm not sure that efficiency matters for this
    # application anyway.

    for x in range(width):
        ratiox = x / (width) 
        for y in range(maxHeight):
            baseX = max(0, min(int(baseImage.width * ratiox), baseImage.width - 1))
            baseY = max(0, min(int(baseImage.height * y / maxHeight), baseImage.height - 1))
            # print(x,y,baseX, baseY)
            # print("Getting {}, Putting {}".format((baseX, baseY), (x, y + top)))
            pixel = baseImage.getpixel((baseX, baseY))
            darken = 1 - .1 * depth + .1 * ratiox
            pixel = tuple(int(p * darken) for p in pixel[:3]) + (pixel[3],)
            bumpPixel = bumpMap.getpixel((baseX, baseY))
            # Calculate the height of this pixel based on the bump map
            pixelHeight = int((bumpPixel / 255) * bumpHeight)
            # Draw this pixel also to the right of this position.
            for r in range(pixelHeight):
                newImage.putpixel((bumpHeight + x - r, y), pixel)

    return newImage




def MakeWall(baseImage, leftHeight, rightHeight, width):
    #Create a new image
    maxHeight = max(leftHeight, rightHeight)
    minHeight = min(leftHeight, rightHeight)
    sizeRatio = maxHeight / baseImage.height
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

            newImage.putpixel((x, y + top), pixel)
    return newImage

def main():
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

    bumpMapPath = folder_path + imageName + "_bump.png"

    #  Find the bump map
    bumpMap = Image.open(bumpMapPath).convert("L") 

    TestWall = LeftWall(BaseImage, 500, 264, 118, bumpMap)
    TestWall.save(folder_path + "TestWall3D.png")
    TestWall = RightWall(BaseImage, 264, 500, 118, bumpMap)
    TestWall.save(folder_path + "TestWall3D_Right.png")
    # return


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

    Left0 = LeftWall(BaseImage, 500, 264, 118, bumpMap)
    newFilePath = folder_path + "Left0.png"
    Left0.save(newFilePath)

    Left2 = LeftWall(BaseImage, 264, 178, 45, bumpMap, 3)
    newFilePath = folder_path + "Left2.png"
    Left2.save(newFilePath)

    Left4 = LeftWall(BaseImage, 178, 138, 21, bumpMap, 5)
    newFilePath = folder_path + "Left4.png"
    Left4.save(newFilePath)

    Left6 = LeftWall(BaseImage,  138, 109, 15, bumpMap, 7)
    newFilePath = folder_path + "Left6.png"
    Left6.save(newFilePath)

    Right0 = RightWall(BaseImage, 264, 500, 118, bumpMap)
    newFilePath = folder_path + "Right0.png"
    Right0.save(newFilePath)

    Right2 = RightWall(BaseImage, 178, 264, 45, bumpMap,3)
    newFilePath = folder_path + "Right2.png"
    Right2.save(newFilePath)

    Right4 = RightWall(BaseImage, 138, 178, 21, bumpMap,5)
    newFilePath = folder_path + "Right4.png"
    Right4.save(newFilePath)

    Right6 = RightWall(BaseImage, 109, 138, 21, bumpMap,7)
    newFilePath = folder_path + "Right6.png"
    Right6.save(newFilePath)

main()