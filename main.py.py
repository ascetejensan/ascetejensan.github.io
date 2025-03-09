import pygame
import textwrap

# Initialize pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 900, 800
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Sorting Hat Quiz")

# Load assets
bg_image = pygame.image.load("potterhouse.png")  # Background image
bg_image = pygame.transform.scale(bg_image, (WIDTH, HEIGHT))
pygame.mixer.music.load("harry_potter_theme.mp3")  # Background music
pygame.mixer.music.play(-1)  # Loop music

# Define fonts
question_font = pygame.font.SysFont("timesnewroman", 42)  # Times New Roman for questions
option_font = pygame.font.SysFont("calibri", 30)  # Calibri for options

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (200, 200, 200)
TRANSPARENT_BLACK = (0, 0, 0, 180)  # Semi-transparent black

# House points system
house_points = {"Gryffindor": 0, "Ravenclaw": 0, "Hufflepuff": 0, "Slytherin": 0}

# Define questions
questions = [
    ("Which trait do you value most?", ["Bravery", "Wisdom", "Loyalty", "Ambition"]),
    ("What would you do in a duel?", ["Attack first", "Analyze opponent", "Defend", "Find a clever trick"]),
    ("Pick a magical creature:", ["Phoenix", "Owl", "Badger", "Snake"]),
    ("Which element do you connect with?", ["Fire", "Air", "Earth", "Water"]),
    ("Which Hogwarts subject excites you the most?",
     ["Defense Against the Dark Arts", "Transfiguration", "Herbology", "Potions"]),
    ("You find a mysterious old book in the Restricted Section. Do you:",
     ["Read it immediately", "Research its origins", "Ask a professor", "Keep it a secret"]),
    ("What kind of friends do you prefer?", ["Adventurous & daring", "Intellectual & curious", "Loyal & kind", "Ambitious & strategic"]),
    ("What is your greatest strength?", ["Courage", "Intelligence", "Patience", "Determination"]),
    ("A friend is caught breaking the rules. Do you:",
     ["Cover for them", "Find a logical solution", "Encourage honesty", "Use it to your advantage"]),
    ("Choose a magical artifact:", ["The Sword of Gryffindor", "Ravenclaw’s Diadem", "Hufflepuff’s Cup", "Slytherin’s Locket"]),
]

# Variables for game loop
question_index = 0
user_input = ""

# Create buttons for keypad
button_width, button_height = 350, 50
button_x, button_y = 270, 450  # Position of first button
buttons = []

for i in range(4):
    button_rect = pygame.Rect(button_x, button_y + (i * 60), button_width, button_height)
    buttons.append((button_rect, str(i+1)))

# Function to draw centered text
def draw_text(text, font, x, y, color=BLACK):
    text_surface = font.render(text, True, color)
    text_rect = text_surface.get_rect(center=(x, y))
    screen.blit(text_surface, text_rect)

# Function to draw rounded rectangle with transparency
def draw_rounded_rect(surface, rect, color, radius=20):
    shape_surf = pygame.Surface(pygame.Rect(rect).size, pygame.SRCALPHA)
    pygame.draw.rect(shape_surf, color, shape_surf.get_rect(), border_radius=radius)
    surface.blit(shape_surf, rect)

# Function to wrap text for long questions
def wrap_text(text, font, max_width):
    words = text.split()
    lines = []
    current_line = ""

    for word in words:
        test_line = current_line + " " + word if current_line else word
        if font.size(test_line)[0] < max_width:
            current_line = test_line
        else:
            lines.append(current_line)
            current_line = word

    if current_line:
        lines.append(current_line)

    return lines

# Main game loop
running = True
while running:
    screen.blit(bg_image, (0, 0))  # Draw background

    if question_index < len(questions):
        # Display question
        question, options = questions[question_index]
        wrapped_text = wrap_text(question, question_font, 600)
        question_height = len(wrapped_text) * 50  # Adjust height based on text lines
        question_rect = pygame.Rect(150, 80, 600, question_height + 20)
        draw_rounded_rect(screen, question_rect, TRANSPARENT_BLACK)  # Draw semi-transparent background

        # Draw wrapped question
        for i, line in enumerate(wrapped_text):
            draw_text(line, question_font, WIDTH // 2, 100 + (i * 50), BLACK)

        # Display options with background that adjusts to text length
        for i, (rect, text) in enumerate(buttons):
            option_text = options[i]
            option_width = max(350, option_font.size(option_text)[0] + 20)
            option_rect = pygame.Rect(rect.x, rect.y, option_width, button_height)
            pygame.draw.rect(screen, GRAY, option_rect, border_radius=10)
            draw_text(f"{text}. {option_text}", option_font, option_rect.centerx, option_rect.centery, BLACK)

        # Display input box
        input_box_rect = pygame.Rect(350, 400, 200, 50)
        pygame.draw.rect(screen, WHITE, input_box_rect, border_radius=10)
        draw_text(user_input, option_font, input_box_rect.centerx, input_box_rect.centery, BLACK)

    else:
        # Display final house result
        sorted_house = max(house_points, key=house_points.get)
        draw_text(f"You belong to {sorted_house}!", question_font, WIDTH // 2, 400, BLACK)

    pygame.display.flip()

    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_BACKSPACE:
                user_input = user_input[:-1]
            elif event.key == pygame.K_RETURN and user_input.isdigit():
                selected_option = int(user_input) - 1
                if 0 <= selected_option < 4:
                    if selected_option == 0:
                        house_points["Gryffindor"] += 1
                    elif selected_option == 1:
                        house_points["Ravenclaw"] += 1
                    elif selected_option == 2:
                        house_points["Hufflepuff"] += 1
                    elif selected_option == 3:
                        house_points["Slytherin"] += 1
                    question_index += 1
                user_input = ""

            elif event.unicode.isdigit():
                user_input += event.unicode  # Capture number input

        elif event.type == pygame.MOUSEBUTTONDOWN:
            for i, (rect, text) in enumerate(buttons):
                if rect.collidepoint(event.pos):
                    selected_option = i
                    if selected_option == 0:
                        house_points["Gryffindor"] += 1
                    elif selected_option == 1:
                        house_points["Ravenclaw"] += 1
                    elif selected_option == 2:
                        house_points["Hufflepuff"] += 1
                    elif selected_option == 3:
                        house_points["Slytherin"] += 1
                    question_index += 1

pygame.quit()
