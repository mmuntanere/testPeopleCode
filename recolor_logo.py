from PIL import Image

def recolor_logo():
    try:
        # Load the original logo
        img = Image.open("logo.png").convert("RGBA")
        
        # Create a solid blue image of the same size
        # Blue #3B82F6 -> RGB(59, 130, 246)
        blue_img = Image.new("RGBA", img.size, (59, 130, 246, 255))
        
        # Extract the alpha channel from the original logo
        r, g, b, alpha = img.split()
        
        # Apply the original alpha channel to the blue image
        blue_img.putalpha(alpha)
        
        # Save the result
        blue_img.save("logo_blue.png")
        print("Successfully created logo_blue.png using original shape.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    recolor_logo()
